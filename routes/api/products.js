const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const uuidv4 = require("uuid/v4"); // creating random id
const multer = require('multer')

const storage = multer.diskStorage({  // setting storage engine with multer
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../db/uploads')); // destination
  },
  filename: function (req, file, cb) { // setting filename
    cb(null, `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()} - ${file.originalname}`);
  }
})

const fileFilter = (req, file, cb) => { // filter file by mimetype
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else { // reject a file
    cb(null, false)
  }
}

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 } // limit filesize to 2MB
}).array('images')

const Product = require("../../modules/products");

// adding new products
// PATH @/api/admin/products/addnew
router.post("/addnew", upload, (req, res) => {
  // console.log(req.files)
  let products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );

  const product = new Product(req.body, req.files, uuidv4());
  // modifying products array and writing it to products.json file
  products.unshift(product);
  products = JSON.stringify(products);
  fs.writeFileSync(path.join(__dirname, "../../db") + "/products.json", products);
  return res.json(product);
});

// searching products by id
// PATH @/api/admin/products/:id
router.get("/:id", (req, res) => {
  // taking the id provided in url  (ex: /api/products/aojsnecpjn102enq2389hqnd)
  let id = req.params.id;
  // taking the array of products from our json file
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );
  // searching the product in products array
  const product = products.find(product => product.id === id);
  // if NOT found
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }
  // destructing the product to get the needed data to return as a json object
  const { gender, images, category, subCategory, brand, size, color, price, priceSale, desc, condition } = product;

  res.json({ gender, images, category, subCategory, brand, size, color, price, priceSale, desc, condition, id });
});

// deleting products by id
// PATH @/api/admin/products/:id
router.delete("/:id", (req, res) => {
  // getting id from url and saving in variable
  let id = req.params.id;
  let products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  );
  // finding product in array with id
  const product = products.find(product => product.id === id);
  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  // finding product index and deleting from array
  const index = products.indexOf(product);
  products.splice(index, 1);
  products = JSON.stringify(products);

  fs.writeFileSync(path.join(__dirname, "../../db") + "/products.json", products);

  const { gender, images, category, subCategory, brand, size, color, price, priceSale, desc, condition } = product;
  res.json({ gender, images, category, subCategory, brand, size, color, price, priceSale, desc, condition, id });
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
  if (req.files) product.images = req.files;
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
  console.log(upload)
  fs.writeFileSync(path.join(__dirname, "../../db") + "/products.json", products);

  const { gender, images, category, subCategory, brand, size, color, price, priceSale, desc, condition } = product;
  res.json({ gender, images, category, subCategory, brand, size, color, price, priceSale, desc, condition, id });
});

// Searching products by parameters
// PATH @/api/admin/products/search/all
router.get("/search/all", (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../db") + "/products.json")
  )

  let foundProducts = products;
  // check if query is in url
  if (req.query.gender) {
    // filter array with query
    foundProducts = foundProducts.filter(product => product.gender === req.query.gender);

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.subCategory) {
    foundProducts = foundProducts.filter(product => product.subCategory === req.query.subCategory);

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.category) {
    foundProducts = foundProducts.filter(product => product.category === req.query.category);

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.size) {
    foundProducts = foundProducts.filter(product => product.size === req.query.size);

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.color) {
    foundProducts = foundProducts.filter(product => product.color === req.query.color);

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (req.query.condition) {
    foundProducts = foundProducts.filter(product => product.condition === req.query.condition);

    if (foundProducts.lenght === 0) {
      return res.status(404).json({ msg: "Product not found" });
    }
  }

  if (foundProducts.length === 0) {
    return res.status(404).json({ msg: "Product not found" });
  } else {
    return res.json(foundProducts);
  }

})

module.exports = router;
