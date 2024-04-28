const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) =>
        /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["donor", "receiver"],
    required: false,
  },
  activity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "activityModel",
    },
  ],
  activityModel: {
    type: String,
    enum: ["Donation", "Recipient"],
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", schema);
