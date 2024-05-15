const userModel = require("../models/userModel");

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

module.exports = {
  getUserController,
  updateUserController,
};
