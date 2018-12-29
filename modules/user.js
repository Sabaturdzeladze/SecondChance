module.exports = class User {
  constructor(body, id) {
    this.id = id;
    this.cart = [];
    this.conversation = [];
    this.boughtItems = [];
    this.birthday = body.birthday;
    this.username = body.username;
    this.email = body.email;
    this.password = body.password;
    this.balance = body.balance;
    this.reviewText = '';
    this.wishlist = [];
  }
};