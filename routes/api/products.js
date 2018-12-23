// Introducing libraries to the current file.
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const uuidv4 = require("uuid/v4"); // creating random id
const multer = require("multer");

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //uploaded files destination
    cb(null, "./client/public/images");
  },
  filename: (req, file, cb) => {
    //upload files name
    const newFilename = `${new Date().getDate()}-${new Date().getMonth() +
      1}-${new Date().getFullYear()}-${file.originalname}`;
    cb(null, newFilename);
  }
});

const upload = multer({ storage }).single("files");

const Product = require("../../modules/products");

// adding new products
// PATH @/api/admin/products/addnew
router.post("/addnew", upload, (req, res) => {
  
  let products = JSON.parse( // Saving products database
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );

  const product = new Product(req.body, req.file, uuidv4());   //Creating new Product

  // Adding new product to products array
  products.unshift(product);
  // Updating products database
  products = JSON.stringify(products);
  fs.writeFileSync(
    path.join(__dirname, "../../db") + "/products.json",
    products
  );
  return res.json(product);
});

// searching products by id
// PATH @/api/admin/products/:id
router.get("/:id", (req, res) => {
  // taking the id provided in url  (ex: /api/products/aojsnecpjn102enq2389hqnd)
  let id = req.params.id;
  // Saving products database
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );

  const product = products.find(product => product.id === id); // Finding product id in products database
  // if NOT found
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  // destructing the product to get the needed data to return as a json object
  const {
    gender,
    images,
    category,
    subCategory,
    brand,
    size,
    color,
    price,
    priceSale,
    desc,
    condition,
    url1,
    url2
  } = product;

  res.json({
    gender,
    images,
    category,
    subCategory,
    brand,
    size,
    color,
    price,
    priceSale,
    desc,
    condition,
    id,
    url1,
    url2
  });
});

// deleting products by id
// PATH @/api/admin/products/:id
router.delete("/:id", (req, res) => {
  // taking the id provided in url  (ex: /api/products/aojsnecpjn102enq2389hqnd)
  let id = req.params.id;

  let products = JSON.parse(  // Saving products database
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );
  
  const product = products.find(product => product.id === id);  // Finding product id in products database
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  // finding product index and deleting from array
  const index = products.indexOf(product);
  products.splice(index, 1);

  // Updating database
  products = JSON.stringify(products);
  fs.writeFileSync(
    path.join(__dirname, "../../db") + "/products.json",
    products
  );

  // destructing the product to get the needed data to return as a json object
  const {
    gender,
    images,
    category,
    subCategory,
    brand,
    size,
    color,
    price,
    priceSale,
    desc,
    condition
  } = product;
  res.json({
    gender,
    images,
    category,
    subCategory,
    brand,
    size,
    color,
    price,
    priceSale,
    desc,
    condition,
    id
  });
});

// editing products by id
// PATH @/api/admin/products/:id
router.put("/:id", upload, (req, res) => {
  let id = req.params.id;
  let products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );

  let product = products.find(product => product.id === id);
  // console.log(product)
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  if (req.body.gender) product.gender = req.body.gender;
  if (req.file) product.images = req.file;
  if (req.body.category) product.category = req.body.category;
  if (req.body.category) product.subCategory = req.body.subCategory;
  if (req.body.brand) product.brand = req.body.brand;
  if (req.body.size) product.size = req.body.size;
  if (req.body.color) product.color = req.body.color;
  if (req.body.price) product.price = req.body.price;
  if (req.body.price) product.salePrice = req.body.salePrice;
  if (req.body.desc) product.desc = req.body.desc;
  if (req.body.condition) product.condition = req.body.condition;

  products = JSON.stringify(products);
  fs.writeFileSync(
    path.join(__dirname, "../../db") + "/products.json",
    products
  );

  const {
    gender,
    images,
    category,
    subCategory,
    brand,
    size,
    color,
    price,
    priceSale,
    desc,
    condition
  } = product;
  res.json({
    gender,
    images,
    category,
    subCategory,
    brand,
    size,
    color,
    price,
    priceSale,
    desc,
    condition,
    id
  });
});

// Searching products by parameters
// PATH @/api/admin/products/search/all
router.get("/search/all", (req, res) => {
  
  const products = JSON.parse(    // Saving products database
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );

  let foundProducts = products;   // ???


  // check if query is in url
  if (req.query.gender) {
    // filter array with query
    foundProducts = foundProducts.filter(
      product => product.gender === req.query.gender
    );

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  // check if query is in url
  if (req.query.brand) {
    // filter array with query
    foundProducts = foundProducts.filter(
      product => product.brand === req.query.brand
    );

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.subCategory) {
    foundProducts = foundProducts.filter(product =>
      product.subCategory.includes(req.query.subCategory)
    );

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.category) {
    foundProducts = foundProducts.filter(
      product => product.category === req.query.category
    );

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.size) {
    foundProducts = foundProducts.filter(
      product => product.size === req.query.size
    );

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.color) {
    foundProducts = foundProducts.filter(
      product => product.color === req.query.color
    );

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.condition) {
    foundProducts = foundProducts.filter(
      product => product.condition === req.query.condition
    );

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (foundProducts.length === 0 || req.query.notFound) {
    return res.status(404).json({ msg: "Product not found" });
  } else {
    return res.json(foundProducts);
  }
});

module.exports = router;
