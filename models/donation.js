const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  expirationDate: {
    // type: Date,
    type: String,
    required: true,
  },
  isClaimed: {
    type: Boolean,
    default: false,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Donation", schema);
