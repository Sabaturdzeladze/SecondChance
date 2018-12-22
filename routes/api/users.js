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

  if (users[0].id === id) {
    return res.json({ isAdmin: true });
  }

  // searching the user in users array
  const user = users.find(user => user.id === id);
  // if NOT found
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  // destructing the user to get the needed data to return as a json object
  const {
    username,
    email,
    cart,
    balance,
    boughtItems,
    messages,
    isAdmin
  } = user;

  res.json({
    username,
    email,
    cart,
    balance,
    boughtItems,
    messages,
    id,
    isAdmin
  });
});

router.get("/:id/conversation", (req, res) => {
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
  const { conversation } = user;

  res.json(conversation);
});

// editing users conversation, seenBy: true
router.put("/:id/conversation", (req, res) => {
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
  if (req.body.user === "user") {
    user.conversation.forEach(message => {
      // Checking if messages seenBy property has user and its false
      // Doesn't work if it hasn't got property of user
      if (message.seenBy.user === false) message.seenBy.user = true;
    });
  } else {
    // Checking if messages seenBy property has admin and its false
    // Doesn't work if it hasn't got property of admin
    user.conversation.forEach(message => {
      if (message.seenBy.admin === false) message.seenBy.admin = true;
    });
  }
  // destructing the user to get the needed data to return as a json object
  const { conversation } = user;

  fs.writeFileSync(
    path.join(__dirname, "../../db") + "/users.json",
    JSON.stringify(users)
  );

  res.json(conversation);
});

// PATH @/api/users/all
router.get("/all/list", (req, res) => {
  // taking the array of users from our json file
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  res.json(users);
  // getting all the members of users array
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

  if (req.body.username) {
    let admin = users[0];
    admin.reviews.forEach(review => {
      if (review.username === user.username) {
        review.username = req.body.username;
      }
    });
    user.conversation.forEach(message => {
      if (message.username === user.username) {
        message.username = req.body.username;
      }
    });
    user.username = req.body.username;
  }
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
    const {
      username,
      email,
      cart,
      balance,
      boughtItems,
      messages,
      id,
      isAdmin,
      reviewText,
      wishlist
    } = user;
    return res.json({
      username,
      email,
      cart,
      balance,
      boughtItems,
      messages,
      id,
      isAdmin,
      reviewText,
      wishlist
    });

    // return res.json({ username, email, cart, balance, boughtItems, messages });
  }
});

// PATH @/api/users/contact/all
router.get("/contact/all", (req, res) => {
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  users = users.filter(user => user.conversation.length !== 0);

  res.json(users);
});

// PATH @/api/users/contact/:id/message
router.post("/contact/:id/message", (req, res) => {
  const id = req.params.id;
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  const user = users.find(user => user.id === id);

  let message = {
    text: req.body.message,
    username: req.body.username,
    id: uuidv4(),
    seenBy: req.body.seenBy
  };

  user.conversation.push(message);
  users = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);

  res.json(message);
});

// PATH @/api/users/contact/:id/message
router.delete("/contact/:id/:message_id", (req, res) => {
  const id = req.params.id;
  const message_id = req.params.message_id;
  let users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  const user = users.find(user => user.id === id);
  const index = user.conversation.findIndex(
    message => message.id === message_id
  );

  user.conversation.splice(index, 1);
  users = JSON.stringify(users);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/users.json", users);

  res.json({ success: true });
});

module.exports = router;
