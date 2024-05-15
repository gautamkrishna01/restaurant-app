const express = require("express");
const {
  getUserController,
  updateUserController,
} = require("../controller/getUserController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getUser", authMiddleware, getUserController);

//update profile
router.post("/updateUser", authMiddleware, updateUserController);

module.exports = router;
