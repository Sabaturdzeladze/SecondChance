module.exports = class User {
  constructor(body, id) {
    this.id = id;
    this.cart = [];
    this.name = body.name;
    this.lastname = body.lastname;
    this.email = body.email;
    this.password = body.password;
    this.country = body.country;
    this.address = body.address;
  }
};
