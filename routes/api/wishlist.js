// Introducing libraries to the current file.
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// router.get("/users/:id/wishlist", (req, res) => res.json({ msg: "Users endpoint Works" }));
router.post("/:id/wishlist/:product_id", (req, res) => {
  const id = req.params.id;                         // Saving user id 
  const product_id = req.params.product_id;        // Saving product id

  // Saving user and product databases
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );

  let user = users.find(user => user.id === id);                  // Finding user id in the database
  const product = products.find(prod => prod.id === product_id); // Finding product id in the database

  if (!user) {
    return res.status(404).json({
      msg: "User on this id not found"
    });
  }
  
  let inwishlist = false; //Checker boolean

  // Fliping Checker boolean
  user.wishlist.forEach(prod => {
    if (prod.id === product.id) {
      inwishlist = true;
    }
  });

  // Adding item to the wishlist 
  if (inwishlist) {
    return res.status(400).json({ msg: "Product already added" }); // If already in wishlist
  } else {
    user.wishlist.push(product);
    users = JSON.stringify(users); 
    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users); // Updating database
  }

  return res.json(user.wishlist); 
});

router.delete("/:id/wishlist/:product_id", (req, res) => {
  const id = req.params.id;    // Saving user id 
  const product_id = req.params.product_id; // Saving product id 

  let users = JSON.parse(  // Saving users database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  let user = users.find(user => user.id === id); // Finding user id in the database

  if (!user) {
    return res.status(404).json({
      msg: "User on this id not found"
    });
  }

  // Finding index of a item in a wishlist 
  const index = user.wishlist.findIndex(prod => prod.id === product_id);
  
  // Deleting item from a wishlist
  user.wishlist.splice(index, 1);

  users = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users); // Updating database
  return res.json(user.wishlist);
});

module.exports = router;
