const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const Product = require("../../modules/products");
const User = require("../../modules/user");


// router.get("/users/:id/cart", (req, res) => res.json({ msg: "Users endpoint Works" }));

router.post("/:id/cart", (req, res) => {
    let id = req.params.id;
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db") + "/users.json"))
    let user = users.find(user => user.id === id)
    if (!user) {
        return res.status(404).json({
            msg: "User on this id not found"
        });
    };
    let products = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db") + "/products.json"))
    let product = products[0]
    user.cart.push(product)
    users = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
    return res.json(user.cart);
})

router.delete("/:id/cart", (req, res) => {
    let id = req.params.id;
    let users = JSON.parse(fs.readFileSync(path.join(__dirname, "../../db") + "/users.json"))
    let user = users.find(user => user.id == id)

    // const productId = req.body.id 
    // users.cart.forEach(product => {
    //     if (product.id === productId) {
    //        saba shentvis momindia
    //     }
    // });

    user.cart.pop()
    users = JSON.stringify(users);

    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
    return res.json(user.cart)
})


module.exports = router;