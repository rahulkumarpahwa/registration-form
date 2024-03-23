const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 200,
  },
  mobile: {
    type: Number,
    required: true,
    max: 10000000000,
  },
  gender: {
    type: String,
    required: true,
  },
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
