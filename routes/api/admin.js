// Introducing libraries to the current file.
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Creating CRUD on a given endpoints
// PATH @/api/users/:id

router.delete("/users/:id", (req, res) => {
  let id = req.params.id; // Saving id
  let users = JSON.parse(
    // Saving users database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );
  const user = users.find(user => user.id === id); // Finding id in the database

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  // finding user index and deleting it from an array
  const index = users.indexOf(user);
  users.splice(index, 1);

  fs.writeFileSync(
    // Updating database
    path.join(__dirname, "../../db") + "/users.json",
    JSON.stringify(users)
  );

  res.json(users);
});

// PATH @/api/users/:id
router.put("/:id", (req, res) => {
  let id = req.params.id; // Saving id
  let users = JSON.parse(
    // Saving users database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  let user = users.find(user => user.id === id); // Finding user id in the database

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  //Creating a USER with following properties: Username Birthday Balance Email

  if (req.body.username) user.username = req.body.username; //Username
  if (req.body.birthday) user.birthday = req.body.birthday; //Birthday
  if (req.body.balance) user.balance = req.body.balance; //Balance
  if (req.body.email) user.email = req.body.email; //Email

  fs.writeFileSync(
    path.join(__dirname, "../../db") + "/users.json",
    JSON.stringify(users)
  ); // Writes new users array to a database

  const { username, email, balance, birthday } = user; // Destructing user

  res.json({ username, email, balance, birthday, id }); // Responding destructed user
});

// updating user details by id
router.post("/review/:id", (req, res) => {
  const errors = {};
  const id = req.params.id; // Saving id

  let users = JSON.parse(
    // Saving users database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  let user = users.find(user => user.id === id); // Finding id in the database
  const admin = users[0]; // saving our admin from a first object of a database

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  let review = { ...req.body, username: user.username, userId: user.id }; // Spreading properties

  // Review Validation
  // If falsy BadRequests
  if (!review.star) {
    errors.star = "Star must be selected";
    return res.status(400).json(errors);
  } else if (!review.reviewText) {
    errors.reviewText = "Review text must be Provided";
    return res.status(400).json(errors);
  }

  // If Truthy deleting existing review and creating new one. (Update)
  if (user.reviewText) {
    let index = admin.reviews.findIndex(review => review.userId === user.id);
    admin.reviews.splice(index, 1);
    admin.reviews = [review, ...admin.reviews];
  } else {
    admin.reviews = [review, ...admin.reviews];
  }

  user.reviewText = req.body.reviewText;

  fs.writeFileSync(
    // Updating database
    path.join(__dirname, "../../db") + "/users.json",
    JSON.stringify(users)
  );
});

// Path @ /api/admin/reviews
router.get("/reviews", (req, res) => {
  let users = JSON.parse(
    // Saving users database
    fs.readFileSync(path.join(__dirname, "../../db") + "/users.json")
  );

  const admin = users[0]; // Saving our admin from a first object of a database

  if (admin.reviews) {
    return res.json(admin.reviews);
  } else {
    return res.status(404).json({ msg: "No reviews to display" });
  }
});

module.exports = router;
