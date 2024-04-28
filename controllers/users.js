const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

userRouter.post("/", async (req, res, next) => {
  const { name, password, role, email } = req.body;
  const passwordHashed = await bcrypt.hash(password, 10);
  const finalUser = new User({
    name,
    email,
    password: passwordHashed,
    role,
    activityModel: role === "donor" ? "Donation" : "Recipient",
  });

  console.log(finalUser);

  try {
    const result = await finalUser.save();
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const result = await User.find({}).populate("activity");
    res.json(result).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
