const JWT = require("jsonwebtoken");
const JWT_SECRET = "mysecretvalue";

module.exports = async (req, resp, next) => {
  try {
    //get token
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, JWT_SECRET, (err, decode) => {
      if (err) {
        return resp.status(401).json({ message: "Unauthorized User" });
      } else {
        req.body.id = decode.id;
        next();
      }
    });
  } catch (error) {
    resp.status(500).json({ message: "Error in Auth Api" });
  }
};
