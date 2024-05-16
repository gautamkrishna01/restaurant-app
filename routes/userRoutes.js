const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
} = require("../controller/getUserController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getUser", authMiddleware, getUserController);

//update profile
router.post("/updateUser", authMiddleware, updateUserController);

// update password

router.post("/updatePassword", authMiddleware, updatePasswordController);

module.exports = router;
