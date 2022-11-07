const mongoose = require("mongoose");
const validator = require("validator");

const RepairSchema = new mongoose.Schema({
  repairImg: {
    img: { type: String },
    public_id: { type: String },
  },
  first_name: {
    type: String,
    required: [true, "please enter the first_name"],
  },
  last_name: {
    type: String,
    required: [true, "please enter the last_name"],
  },
  mobile_number: {
    type: Number,
    required: [true, "Please Enter Your Mobile Number"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  address: {
    type: String,
    required: [true, "please enter the address"],
  },
  device: {
    type: String,
    required: [true, "please select the device"],
  },
  menufacturer: {
    type: String,
    required: [true, "please enter the manufacturer"],
  },
  model: {
    type: String,
    required: [true, "please select the model name or number"],
  },
  description: {
    type: String,
    required: [true, "please select the description"],
  },
  repair_type: {
    type: String,
    required: [true, "please select the type of repair"],
  },
});

module.exports = mongoose.model("repair", RepairSchema);
