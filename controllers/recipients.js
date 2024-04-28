const recipientRoute = require("express").Router();
const Recipient = require("../models/recipient");
const { userExtractor } = require("../utils/middleware");

recipientRoute.get("/", async (req, res, next) => {
  try {
    const all = await Recipient.find({}).populate("receiver", {
      name: 1,
    });
    res.json(all).status(200);
  } catch (error) {
    next(error);
  }
});

recipientRoute.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const don = await Recipient.findById(id).populate("receiver", {
      name: 1,
    });
    don
      ? res.json(don).status(200)
      : res.status(404).send({ error: "donation was not found!" });
  } catch (error) {
    next(error);
  }
});

recipientRoute.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const { id } = req.params;
    Recipient.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

recipientRoute.post("/", userExtractor, async (req, res, next) => {
  let { body } = req;
  let { user } = req;
  // console.log(req.user);
  body = { ...body, receiver: user };

  const recipient = new Recipient(body);
  try {
    const savedRecipient = await recipient.save();
    // console.log(user);
    user.activity = user.activity.concat(savedRecipient._id);
    console.log(user.activity);
    await user.save();

    res.json(savedRecipient).status(200);
  } catch (error) {
    next(error);
  }
});

recipientRoute.put("/", userExtractor, async (req, res, next) => {
  const { body } = req;
  const { id } = body;

  try {
    const updatedRecipient = await Recipient.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json(updatedRecipient);
  } catch (error) {
    next(error);
  }
});

module.exports = recipientRoute;
