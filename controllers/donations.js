const donationRouter = require("express").Router();
const Donation = require("../models/donation");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

donationRouter.get("/", async (req, res, next) => {
  try {
    const all = await Donation.find({}).populate("donor", {
      name: 1,
    });
    res.json(all).status(200);
  } catch (error) {
    next(error);
  }
});

donationRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const don = await Donation.findById(id).populate("donor", {
      name: 1,
    });
    don
      ? res.json(don).status(200)
      : res.status(404).send({ error: "donation was not found!" });
  } catch (error) {
    next(error);
  }
});

donationRouter.delete("/:id", userExtractor, async (req, res, next) => {
  try {
    const { id } = req.params;
    Donation.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

donationRouter.post("/", userExtractor, async (req, res, next) => {
  let { body } = req;
  let { user } = req;
  // const user = await User.findById(req.user });
  console.log(user);

  body = { ...body, donor: user.id };
  const donation = new Donation(body);

  try {
    const savedDonation = await donation.save();

    if (user.role === "donor") {
      user.activity = user.activity.concat(savedDonation.id);
      await user.save();
    }

    res.json(savedDonation).status(200);
  } catch (error) {
    next(error);
  }
});

donationRouter.put("/", userExtractor, async (req, res, next) => {
  const { body } = req;
  const { id } = body;

  try {
    const updatedDonation = await Donation.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json(updatedDonation);
  } catch (error) {
    next(error);
  }
});

module.exports = donationRouter;
