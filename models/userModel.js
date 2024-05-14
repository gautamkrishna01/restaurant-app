const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    userType: {
      type: String,
      required: [true, "userType is required"],
      default: "clinet",
      enum: ["clinet", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3D%2522user%2Bicon%2522&psig=AOvVaw1agbsI6hVVf090fctUViXi&ust=1715787395692000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDDz6O8jYYDFQAAAAAdAAAAABAE",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
