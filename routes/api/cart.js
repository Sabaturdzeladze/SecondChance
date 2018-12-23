// Introducing libraries to the current file.
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");


router.post("/:id/cart/:product_id", (req, res) => {
  const id = req.params.id;               // Saving user id 
  const product_id = req.params.product_id;           // Saving product id

  let users = JSON.parse(                                          // Saving users database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  let user = users.find(user => user.id === id);      // Finding user id in the database
  if (!user) {
    return res.status(404).json({
      msg: "User on this id not found"
    });
  }
  const products = JSON.parse(                                        // Saving users database                  
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );
  const product = products.find(prod => prod.id === product_id);    // Saving users database


  let inCart = false;   // Checker boolean 

  //  flip our Checker boolean, so we know that item is already in a cart
  user.cart.forEach(prod => {
    if (prod.id === product.id) {
      inCart = true;
    }
  });


  if (inCart) { // if item is in cart
    return res.status(400).json({ msg: "Product already added" });
  }
   else {      // if its not we push that item into the cart
    user.cart.push(product);
    user.wishlist = user.wishlist.filter(prod => prod.id !== product_id);  // Updating wishlist 
    users = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
  }

  return res.json({ cart: user.cart, wishlist: user.wishlist });
});



router.delete("/:id/cart/:product_id", (req, res) => {
  const id = req.params.id;                     // Saving user id 
  const product_id = req.params.product_id;    // Saving product id

  let users = JSON.parse(                   // Saving users database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  let user = users.find(user => user.id === id);   // Finding id in the database

  if (!user) { // Not found
    return res.status(404).json({
      msg: "User on this id not found"
    });
  }

  const index = user.cart.findIndex(prod => prod.id === product_id); //Finding index of an item in the cart
  user.cart.splice(index, 1);   // Removing item from the cart

  users = JSON.stringify(users);

  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);

  return res.json(user.cart); // returining updated cart
});


router.post("/:id/dashboard/checkout", (req, res) => {
  const id = req.params.id;          // Saving user id 
  let products = JSON.parse(         // Saving product database
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );
  let users = JSON.parse(           // Saving user database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );


  let user = users.find(user => user.id === id);  // Finding id in the database

  // If the user buys the product we remove it from a product database
  products.forEach((prod, index) => {
    for (let i = 0; i < user.cart.length; i++) {
      if (prod.id == user.cart[i].id) {
        products.splice(index, 1);
      }
    }
  });

  
  user.boughtItems = [...user.cart, ...user.boughtItems]; // Ordered History


  users.forEach(person => {
    if (person !== user && !person.isAdmin) { 
      person.cart = person.cart.filter(           // Removing bought item from every users cart
        product => !user.cart.map(item => item.id).includes(product.id)
      );
      person.wishlist = person.wishlist.filter(  // Removing bought item from every users wishlist
        product => !user.cart.map(item => item.id).includes(product.id)
      );
    }
  });


  user.cart = []; // Clearing cart 
  user.balance = req.body.balance;  // Updating balance

  // stringifying users bedore updating
  users = JSON.stringify(users);
  products = JSON.stringify(products)

  // Updating products and users databases.
  fs.writeFileSync(path.join(__dirname, "../../db") + "/products.json", products);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);

  return res.json({ user, products });
});

module.exports = router;
