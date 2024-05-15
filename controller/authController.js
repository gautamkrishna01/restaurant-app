const userModel = require("../models/userModel");

// register controller methods
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

//login controller methods

const loginController = async (req, resp) => {
  const { email, password } = req.body;
  try {
    // Validation
    if (!email || !password) {
      return resp
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await userModel.findOne({ email: email });

    // Check user and password
    if (!user || user.password !== password) {
      return resp
        .status(404)
        .json({ message: "User not found or password mismatch" });
    }

    // If user found and password matches
    resp.status(200).json({ message: "Login successful", user });
  } catch (error) {
    resp.status(500).json({ message: "Error in login" });
  }
};

module.exports = {
  registerController,
  loginController,
};
