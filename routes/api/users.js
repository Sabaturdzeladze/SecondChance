const express = require("express");
const router = express.Router();
const path = require("path");
const crypto = require("crypto");
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

  const { email, username } = req.body;
  // console.log(process.cwd());

  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  req.body.password = encrypt(req.body.password);
  // Checking if the user with the provided email exists
  if (
    users.filter(user => user.email === email).length > 0 ||
    users.filter(user => user.username === username).length > 0
  ) {
    errors.email = "User with this email or Username already exists";
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
  const { username, email, cart, balance, boughtItems, messages } = user;

  res.json({ username, email, cart, balance, boughtItems, messages, id });
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

  if (req.body.username) user.username = req.body.username;
  if (req.body.birthday) user.birthday = req.body.birthday;
  if (req.body.balance) user.balance = req.body.balance;
  if (req.body.email) user.email = req.body.email;

  users = JSON.stringify(users);

  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);

  const { username, email, balance, birthday } = user;

  res.json({ username, email, balance, birthday, id });
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
    errors.password = "Password or Email Incorrect";
    return res.status(400).json(errors);
  } else {
    const { username, email, cart, balance, boughtItems, messages, id } = user;
    res.json({ username, email, cart, balance, boughtItems, messages, id });

    return res.json({ username, email, cart, balance, boughtItems, messages });
  }
});

module.exports = router;
