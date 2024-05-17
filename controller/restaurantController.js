const restaurantModel = require("../models/resturantModel");
// create restaurant Controller
const restaurantController = async (req, resp) => {
  const {
    title,
    imageUrl,
    foods,
    time,
    pickup,
    delivery,
    isOpen,
    logUrl,
    rating,
    ratingCount,
    code,
    coords,
  } = req.body;

  try {
    if (!title || !coords) {
      return resp
        .status(500)
        .json({ message: "Please provide title and address " });
    }

    const newRestaurant = await restaurantModel.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    resp
      .status(200)
      .json({ message: "New Restaurant Created successfully", newRestaurant });
  } catch (error) {
    console.error(error);
    resp
      .status(500)
      .json({ message: "Error in creating new Restaurant", error });
  }
};

module.exports = {
  restaurantController,
};
