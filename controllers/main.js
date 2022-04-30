const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Not valid data");
  }

  //just for demo, normally provided by DB!!!!
  const id = parseInt(Math.random() * 100000);
  const token = jwt.sign(
    {
      username,
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10d",
    }
  );

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const randomNumber = parseInt(Math.random() * 1000);
  const { returnJson } = req;
  res.json({
    ...returnJson,
    msg: `Your number is ${randomNumber}`,
    secret: `hello ${returnJson.decoded.username}`,
  });
};
module.exports = {
  login,
  dashboard,
};
