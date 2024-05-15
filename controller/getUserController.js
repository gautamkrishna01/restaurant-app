const getUserController = (req, resp) => {
  resp.status(201).json({ message: "User has been created" });
};
module.exports = {
  getUserController,
};
