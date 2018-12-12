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
const Message = require("../../modules/message");

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

router.post("/contact/:id", (req, res) => {
  let id = req.params.id;
  const text = req.body.text;
  let messages = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/messages.json")
  )
  const message = new Message(req.body, id);
  // attach new message 
  messages.push(message);
  messages = JSON.stringify(messages);
    fs.writeFileSync(path.join(__dirname, "../../db") + "/messages.json", messages);
    // writing new messages with user Id in message database
    return res.json(message);
});

router.get("/contact/:id", (req, res) => {
  let id = req.params.id;
  let messages = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/messages.json")
  )
  const message = messages.find(message => message.id === id);
  if (!message.answer) {
    return res.status(404).json({ msg: "Message Answer with this Id not found" });
  }
// checking if user got any answers for his/her previous questions
    return res.json(message.answer);
});


// PATH @/api/users/all
router.get("/all", (req, res) => {
  // taking the array of users from our json file
  const users = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  res.json({ users }); 
  // getting all the members of users array
});

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
  const admin = users.find( // find Admin member in users array
    user => user.isAdmin === true
  );

  if (!user) {
    errors.password = "Password or Email Incorrect";
    return res.status(400).json(errors);
  } else {
    if (user.username === admin.username) { 
      // if Admin has logged in
      const { username, email, cart, balance, boughtItems, messages, id } = admin;
      return res.json({ username, id, email, messages })
      // seeing different properties if user is admin
    }
    else {
      const { username, email, cart, balance, boughtItems, messages, id } = user;
      res.json({ username, email, cart, balance, boughtItems, messages, id });

      return res.json({ username, email, cart, balance, boughtItems, messages });
      // ordinary user
    }

  }
});

module.exports = router;
