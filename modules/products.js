module.exports = class Product {
    constructor(body, images, id) {
      this.id = id;
      this.gender = body.gender;
      this.images = images; // images comes from multer
      this.url1 = body.url1;
      this.url2 = body.url2;
      this.category = body.category;
      this.subCategory = body.subCategory;
      this.brand = body.brand;
      this.size = body.size;
      this.color = body.color;
      this.price = body.price;
      this.priceSale = body.priceSale;
      this.desc = body.desc;
      this.condition = body.condition;
    }
  };
  