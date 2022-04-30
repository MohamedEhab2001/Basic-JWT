const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");

const Authorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const returnJson = {};
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Unauthorized web token");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    returnJson["decoded"] = decoded;
    req.returnJson = returnJson;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid web token");
  }
};

module.exports = Authorization;
