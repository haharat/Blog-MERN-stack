const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "randomstringtypekey", {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
