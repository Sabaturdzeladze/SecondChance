const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/new", (req, res) => res.json({ msg: "Admin endpoint Works" })); 
// testing admin endpoint

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
// updating user details by id

router.get("/contact/:id", (req, res) => {
  let id = req.params.id;
  let messages = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/messages.json")
  );
  myMessages = []; 
  // all the messages from the user with given id
  messages.forEach(message => {
    if (message.id.includes(id)) {
      myMessages.push(message.text);
    }
  });
  if (!myMessages) {
    return res.status(404).json({ msg: "Message with this Id not found" });
  }
  res.json({ myMessages }); 
});

router.post("/contact/:id", (req, res) => { 
  let id = req.params.id;
  let messages = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/messages.json")
  );
  const message = messages.find(message => message.id === id); 
  // will choose first question and give an answer to it
  message.answer = req.body.answer; 
  // giving unswers to the user with given id
  messages = JSON.stringify(messages);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/messages.json", messages);
  return res.json(message);
});

module.exports = router;