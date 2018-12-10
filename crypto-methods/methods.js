const crypto = require("crypto");

const secret = "secret__second";

module.exports = encrypt = data => {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");

  return hash;
};

module.exports = encode = data => {
  const key = crypto.createCipher("aes-128-cbc", "userdata");
  let encoded = key.update(data, "utf8", "hex");
  encoded += mykey.final("hex");

  return encoded;
};

module.exports = decode = data => {
  const key = crypto.createCipher("aes-128-cbc", "userdata");
  let decoded = key.update(data, "utf8", "hex");
  decoded += mykey.final("hex");

  return decoded;
};
