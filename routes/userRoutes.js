const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controller/getUserController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getUser", authMiddleware, getUserController);

//update profile
router.post("/updateUser", authMiddleware, updateUserController);

// update password

router.post("/updatePassword", authMiddleware, updatePasswordController);

// reset password
router.post("/resetPassword", authMiddleware, resetPasswordController);

// delete user

router.post("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
