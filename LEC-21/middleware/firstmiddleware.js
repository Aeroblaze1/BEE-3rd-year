function m1(req, res, next) {
  console.log("running middleware 1...");
  req.userId = "4";
  next();//goes to next middleware i.e the function get /health then its next calls the next middleware that is m2 , then m2's next returns but after completing
  //  its whole code since no next middleware then goes to get /heatlh and completes it pending code then goes to the m1 and completes it pending code

  console.log("this runs after next 2");
}

function m2(req, res, next) {
  console.log("running middleware 2...");
  console.log(req.userId);
  req.isAdmin = true;
  next();
  console.log("runs after the next in the get /health middleware ");
}

module.exports.m1 = m1;
module.exports.m2 = m2;




