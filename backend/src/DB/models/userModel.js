const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Please Enter Your Full Name"],
      maxLength: [30, "Full Name cannot exceed 30 characters"],
    },
    genders: {
      type: String,
      required: [true, "Please Enter Your Gender"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: [true, "You are already registered"],
      validate: [validator.isEmail, "Please enter a valid email address"],
      lowercase: true,
    },
    mobile_number: {
      type: Number,
      required: [true, "Please Enter Your Mobile Number"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "You have to enter atleast 8 characters"],
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: "4d",
  });

  return token;
};
module.exports = mongoose.model("User", userSchema);
