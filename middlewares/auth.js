const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGVmMzI0ZWI5Y2FkMjVmYjdmMGNlOCIsImlhdCI6MTYzNjc1OTY0MywiZXhwIjoxNjM2ODQ2MDQzfQ.xXP5GTwOetcMtdSVNY7FsFuqvTE-Siuw4vmi9uODc7M

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, "randomstringtypekey");
      req.user = await UserModel.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: "Not authorized user!" });
    }
  }

  if (!token) {
    res.status(401).send({ message: "Not authorized, no token found!" });
  }
};

module.exports = protect