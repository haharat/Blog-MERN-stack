const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema);
//this "User" parameter will create a new collection named "user" in the database

module.exports = User;
