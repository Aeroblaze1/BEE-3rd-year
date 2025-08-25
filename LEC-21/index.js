const express = require("express");

const { m1, m2 } = require("./middleware/firstmiddleware");
const {m3} = require("./middleware/pathlevel");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //request parsed and obejct created in middleware , if not this done then we cant get the body in the controller obejct
app.use(m1);

// Mount user routes
app.use('/users', userRoutes);

//1) application level middleware : app.use(middleware_name) --> this will run on every client request


//controller function - if its sorta a middleware then next is added here too
app.get("/health",m3, (req, res,next) => {
  console.log("controller function");
  
//   next();

  //this code is run even after next is called since control passes to m2 which has no further middleware , so the control gets back to this middleware and pending code is run , the return then gives back control the m1 , which completes it code after next();
  return res.json({
    status: "ok",
    message: "server running ok",
});

console.log("after response")//if no return written before res.json then this code would have run too;
});


app.get("/home", (req, res,next) => {
  console.log("running home endpoint");

res.json({
    status: "ok",
    message: "server running ok",
});
  
});


app.use(m2); //middleware runs in order its called


const PORT = process.env.PORT || 5775;
//middleware is a function which runs on client request before controller function

// controller function -> req,-->res object

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
