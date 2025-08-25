const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/users");
console.log(User);
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path level middleware for  home route - in Headers section under the request api for http://localhost:4000/home , add Authorozation and value of the token of the person logged in
function isLogin(req, res, next) {
    if(!req.headers.authorization){
        return res.json({
            success:false,
            message:"no authorization key provided"
        })
    }

  let token = req.headers.authorization;//small letters all
  console.log(token);
  if(!token){
    return res.json({
        success:false,
        message:"please login first to access this home route"
    })
  }

  //verify token - jwtwebtoken docs
  let decode = jwt.verify(token,"okk");
  console.log(decode);
  if(!decode){
    return res.json({
        success:false,
        message:"invalid token"
    })
  }

  req.user = decode.user //modify req object


  next();
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server running ok ",
  });
});

//needa add middleware to let this route be only availaible to those woho have login
app.get("/home", isLogin, (req, res) => {
    console.log("user--->",req.user)
    let username = req.user.name;
  res.json({
    success: true,
    message: "welcome " + username,
  });
});

// END POINT FOR SIGUP ==MEANS ADDING NEW  USERS INTO DATABASE

app.post("/api/users/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let userexist = await User.findOne({ email: email });
    if (userexist) {
      return res.json({
        success: false,
        message: "user already exist with this email please login",
      });
    }
    let newuser = new User({
      name: name,
      email: email,
      password: password,
    });
    await newuser.save();
    res.json({
      success: true,
      message: " user registred sucessfully  please login  to continue ",
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
});
/// after registered login process starts
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let userexist = await User.findOne({ email: email });

    if (!userexist) {
      return res.json({
        success: false,
        message: "you are not registered",
      });
    }
    if (password != userexist.password) {
      return res.json({
        success: false,
        message: "invalid user",
      });
    }

    //access jwt.io and paste your token - green part of the token is alg , white part is payload , purple part is signature
    if (userexist.password == password) {
      let token = jwt.sign({ user: userexist }, "okk");

      return res.json({
        success: true,
        message: "login sucessfulllty",
        token: token,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      message: "error.message",
    });
  }
});

app.listen(4000, () => {
  console.log("server started ");
});
mongoose
  .connect("mongodb://127.0.0.1:27017/blogapp")
  .then(() => {
    console.log("db connected ");
  })
  .catch((err) => {
    console.log(err);
  });
