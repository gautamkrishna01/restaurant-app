const express = require("express");
const { restaurantController } = require("../controller/restaurantController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, restaurantController);

module.exports = router;
