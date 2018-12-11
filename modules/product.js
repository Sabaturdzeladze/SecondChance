module.exports = class Product {
    constructor(body, id) {
      this.id = id;
      this.gender = body.gender;
      this.images = body.images; // ეს გასარკვევია multer-ზე როგორ მუშაობს
      this.category = body.category;
      this.subCategory = this.subCategory;
      this.brand = body.brand;
      this.size = body.size;
      this.color = body.color;
      this.price = body.price;
      this.priceSale = body.priceSale;
      this.desc = body.desc;
      this.condition = body.condition;
    }
  };
  