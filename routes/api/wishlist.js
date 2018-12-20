const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// router.get("/users/:id/wishlist", (req, res) => res.json({ msg: "Users endpoint Works" }));
router.post("/:id/wishlist/:product_id", (req, res) => {
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
  let inwishlist = false;
  user.wishlist.forEach(prod => {
    if (prod.id === product.id) {
      inwishlist = true;
    }
  });
  if (inwishlist) {
    return res.status(400).json({ msg: "Product already added" });
  } else {
    user.wishlist.push(product);
    users = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
  }

  return res.json(user.wishlist);
});

router.delete("/:id/wishlist/:product_id", (req, res) => {
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
  const index = user.wishlist.findIndex(prod => prod.id === product_id);
  user.wishlist.splice(index, 1);
  users = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
  return res.json(user.wishlist);
});

module.exports = router;
