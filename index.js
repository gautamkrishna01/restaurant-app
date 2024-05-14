const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoute = require("./routes/authRoutes");
const app = express();

const PORT = 5000;

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);

//connecting the db

mongoose
  .connect("mongodb://127.0.0.1:27017/resturant")
  .then(() => {
    console.log("connecting the database successfully");
    app.listen(PORT, () => {
      console.log("listening on port");
    });
  })
  .catch((error) => {
    console.log("error coming while connecting database");
  });
