function info(...args) {
  console.log(...args);
}

function errorMsg(...args) {
  error.log(...args);
}

module.exports = { info, errorMsg };
