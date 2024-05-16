const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, resp) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    // check validation
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }
    return resp.status(200).json({ message: "User get succesfully", user });
  } catch (error) {
    // catch the error
    resp.status(500).json({ message: "Error while fetching user" });
  }
};

//update the user profile
const updateUserController = async (req, resp) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }
    // update the user
    const { username, address, phone } = req.body;

    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();
    resp.status(200).json({ message: "User update successfully" });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Error in update user" });
  }
};

//update password controller

const updatePasswordController = async (req, resp) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }
    // get the user
    const { oldPassword, newPassword } = req.body;
    if ((!oldPassword, !newPassword)) {
      return resp
        .status(500)
        .json({ message: "Please provide Old and New Password" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return resp.status(500).json({ message: "Invalid oldPassword" });
    }
    //hashing password
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    resp.status(200).json({ message: "Password update Successfully" });
  } catch (error) {
    resp.status(500).json({ message: "Error in update password !!!" });
  }
};

// reset resetPasswordController

const resetPasswordController = async (req, resp) => {
  try {
    const { email, newPassword, answer } = req.body;
    if ((!email || !newPassword, !answer)) {
      return resp.status(404).json({ message: "Please Provide all Fields" });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return resp
        .status(500)
        .json({ message: "User not found or invalid answer" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;
    await user.save();
    resp.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Error while  reset password" });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
};
