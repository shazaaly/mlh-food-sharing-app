const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const donationRouter = require("./controllers/donations");
const recipientRoute = require("./controllers/recipients");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

require("dotenv").config();

const app = express();
app.use(express.static("dist"));

const middleware = require("./utils/middleware");
const { info, errorMsg } = require("./utils/logger");

const { MONGODB_URI, PORT } = process.env;

mongoose.set("strictQuery", false);
console.log("connecting to mongodb");

mongoose
  .connect(MONGODB_URI)
  .then((res) => info("connected to mongodb"))
  .catch((err) => errorMsg(err.message));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.get("/info", (req, res) => {
  res.send("<h1>hello world!!!<h2>");
});
app.use("/api/donation", donationRouter);
app.use("/api/recipient", recipientRoute);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(PORT, () => {
  info("server connected on port", PORT);
});
