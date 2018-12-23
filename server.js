// Introducing libraries to the current file.  
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();


// Initialazing required routes for the server.
const users = require("./routes/api/users"); // user
const admin = require("./routes/api/admin"); // admin
const cart = require("./routes/api/cart");  // cart
const wishlist = require("./routes/api/wishlist"); // wishlist
const products = require("./routes/api/products"); // products

app.use(cors("*"));
// to use post methods         (req.body to work)
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));

// Use Routes
app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/products", products);
app.use("/api/users", cart);
app.use("/api/users", wishlist);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folter
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port - ${port}`));
