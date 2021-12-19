const UserModel = require("../models/user");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      res.status(400).send({ message: "User already exists" });
    }

    const user = await UserModel.create({
      name: name,
      email: email,
      password: password,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("User registration error", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
};

module.exports = { registerUser, login };
