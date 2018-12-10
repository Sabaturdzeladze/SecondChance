const express = require("express");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const fs = require("fs");
const uuidv4 = require("uuid/v4"); // creating random id

const secret = "secret__second";

const encrypt = data => {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");

  return hash;
};

const User = require("../../modules/user");

// requiring validation
const validateRegisterInput = require("../../validation/register.js");
const validateLoginInput = require("../../validation/login.js");

router.get("/test", (req, res) => res.json({ msg: "Users endpoint Works" }));

// PATH @/api/users/register
router.post("/register", (req, res) => {
  // destructing validation
  // the method returns {errors, isValid}
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;
  // console.log(process.cwd());

  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  req.body.password = encrypt(req.body.password);
  // Checking if the user with the provided email exists
  if (users.filter(user => user.email === email).length > 0) {
    errors.email = "User with this email already exists";
    return res.status(400).json(errors);
  } else {
    // didn't find the user with provided email
    const user = new User(req.body, uuidv4());
    // modifying users array and writing it to users.json file
    users.push(user);
    users = JSON.stringify(users);
    fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);
    return res.json(user);
  }
});

// PATH @/api/users/:id
router.get("/:id", (req, res) => {
  // taking the id provided in url  (ex: /api/users/aojsnecpjn102enq2389hqnd)
  let id = req.params.id;
  // taking the array of users from our json file
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  // searching the user in users array
  const user = users.find(user => user.id === id);
  // if NOT found
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  // destructing the user to get the needed data to return as a json object
  const { name, lastname, email, country, address, cart } = user;

  res.json({ name, lastname, email, country, address, cart, id });
});

// PATH @/api/users/:id
router.delete("/:id", (req, res) => {
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

  const { name, lastname, email, country, address, cart } = user;
  res.json({ name, lastname, email, country, address, cart, id });
});

// PATH @/api/users/:id
router.put("/:id", (req, res) => {
  let id = req.params.id;
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  let user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.lastname) user.lastname = req.body.lastname;
  if (req.body.email) user.email = req.body.email;
  if (req.body.country) user.country = req.body.country;
  if (req.body.address) user.address = req.body.address;
  users = JSON.stringify(users);

  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);

  const { name, lastname, email, country, address } = user;
  res.json({ name, lastname, email, country, address, id });
});

// PATH @/api/users/login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let { email, password } = req.body;
  password = encrypt(password);

  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  const user = users.find(
    user => user.email === email && user.password === password
  );

  if (!user) {
    errors.password = "Password Incorrect";
    return res.status(400).json(errors);
  } else {
    let userData = {
      id: user.id,
      name: user.name,
      country: user.country,
      address: user.address,
      cart: user.cart,
      lastname: user.lastname
    };

    return res.json(userData)
  }
});

module.exports = router;
