const { info } = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function unknownEndpoint(req, res) {
  res.status(404).send({ error: "unknwon endpoint" });
}

function errorHandler(error, req, res, next) {
  info(error.message);

  if (error.name === "CastError") {
    return res.status(400).sent({ error: "malformed id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "jsonWebTokenError") {
    res.status(401).send({ error: "invalid token" });
  } else if (error.name === "jsonWebExpiredError") {
    res.status(401).send({ error: "token expired" });
  }
  next(error);
}

function requestLogger(req, res, next) {
  info("Method:", req.method);
  info("Path:", req.path);
  info("Body:", req.body);
  info("---");
  next();
}

async function tokenExtractor(req, res, next) {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  next();
}

async function userExtractor(req, res, next) {
  let actualUser = null;
  try {
    actualUser = jwt.verify(req.token, process.env.SECRET);
  } catch (error) {
    return next(error);
  }
  req.user = await User.findById(actualUser.id);
  next();
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  requestLogger,
  tokenExtractor,
  userExtractor,
};
