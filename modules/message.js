module.exports = class Message {
    constructor(body,id) {
      this.id = id;
      this.text = body.text;
      this.answer = body.answer;
    }
  };