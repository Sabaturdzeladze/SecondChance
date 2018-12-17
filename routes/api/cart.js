const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// router.get("/users/:id/cart", (req, res) => res.json({ msg: "Users endpoint Works" }));
router.post("/:id/cart/:product_id", (req, res) => {
  const id = req.params.id;
  const product_id = req.params.product_id;
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  let user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({
      msg: "User on this id not found"
    });
  }
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );
  const product = products.find(prod => prod.id === product_id);
  let inCart = false;
  user.cart.forEach(prod => {
    if (prod.id === product.id) {
      inCart = true;
    }
  });
  if (inCart) {
    return res.status(400).json({ msg: "Product already added" });
  } else {
    user.cart.push(product);
    users = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
  }

  return res.json(user.cart);
});

router.delete("/:id/cart/:product_id", (req, res) => {
  const id = req.params.id;
  const product_id = req.params.product_id;
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  let user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({
      msg: "User on this id not found"
    });
  }
  const index = user.cart.findIndex(prod => prod.id === product_id);
  user.cart.splice(index, 1);
  users = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
  return res.json(user.cart);
});

router.post("/:id/dashboard/checkout", (req, res) => {
  const id = req.params.id;
  let products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  let user = users.find(user => user.id === id);
  products.forEach((prod, index) => {
    for (let i = 0; i < user.cart.length; i++) {
      if (prod.id == user.cart[i].id) {
        products.splice(index, 1);
      }
    }
  });
  user.boughtItems = [...user.cart, ...user.boughtItems];
  user.cart = [];
  user.balance = req.body.balance;
  users = JSON.stringify(users);
  fs.writeFileSync(
    path.join(__dirname, "../../db") + "/products.json",
    JSON.stringify(products)
  );
  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
  return res.json({user, products});
});

module.exports = router;
