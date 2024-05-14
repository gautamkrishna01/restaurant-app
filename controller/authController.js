const userModel = require("../models/userModel");

const registerController = async (req, resp) => {
  const { username, email, password, phone, address } = req.body;
  try {
    //validation
    if (!username || !email || !password || !phone || !address) {
      return resp.status(500).json({ message: "Please Provide all fields" });
    }
    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return resp
        .status(500)
        .json({ message: "email already register  please login" });
    }
    // creating new user

    const newUser = await userModel.create({
      username,
      email,
      password,
      phone,
      address,
    });
    resp.status(200).json({ message: "user created successfully", newUser });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "error creating user" });
  }
};
module.exports = {
  registerController,
};
