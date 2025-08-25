function m5(req, res, next) {
  console.log("running router-level middleware m5");
  next();
}

module.exports = { m5 };