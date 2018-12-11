const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// PATH @/api/users/:id
router.delete("/users/:id", (req, res) => {
    let id = req.params.id;
    let users = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
    );
  
    const user = users.find(user => user.id === id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
  
    // finding user index and deleting from array
    const index = users.indexOf(user);
    users.splice(index, 1);
    users = JSON.stringify(users);
  
    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
  
    const { username, email } = user;
  
    res.json({ username, email, id });
  });