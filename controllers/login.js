const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: "invalid name or password" });
  }

  const userToken = {
    name: user.name,
    id: user.id,
  };

  const token = jwt.sign(userToken, process.env.SECRET);

  try {
    res.status(200).send({
      token,
      name,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
