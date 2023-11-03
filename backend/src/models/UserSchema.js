const mongoose = require("mongoose");
const hashPasswordMiddleware = require("../middleware/bcrypt.middleware");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      maxlength: [100, "Name must be less than 100 characters"],
    },
    contactNumber: {
      countryCode: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
    },
    userType: {
      type: String,
      required: true,
      default: "user",
    },
    role: {
        type: String,
       enum: ['admin', 'super-admin'],
      },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", hashPasswordMiddleware);

module.exports = mongoose.model("UserSchema", UserSchema, "users");
