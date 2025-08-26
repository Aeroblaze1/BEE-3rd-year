const express = require("express");
const mongoose= require("mongoose")
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const Blogs= require("./model/blog");
const user = require("./model/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "meww";




/**
 * Auth middleware to verify JWT and attach req.userId
 */
const isLogin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    // Support both: "Bearer <token>" and raw "<token>"
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "no token provided , please login"
      });
    }

    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "invalid or expired token"
    });
  }
};


//adding a blog to database

app.post("/blogs", isLogin, async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.userId;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "title and body are required"
      });
    }

    const userExist = await user.findById(userId);
    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const newBlog = new Blogs({
      title: title,
      body: body,
      date: Date.now(),
      userId: userId
    });

    await newBlog.save();
    userExist.blogs.push(newBlog._id);
    await userExist.save();

    return res.json({
      success: true,
      data: newBlog,
      message: "blog added successfully"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
})


//getting all blog
app.get("/blogs",async(req,res)=>{
   let allblog= await Blogs.find();
   res.json({
        success:true,
        data:allblog
   }) 
})


// getting single blog
app.get("/blogs/:id",async(req,res)=>{
    let {id}= req.params
    let blog= await Blogs.findOne({_id:id});
    res.json({
        success:true,
        data:blog
    })
})




//user
app.post("/users",async(req,res)=>{
  let {username,email,password}  = req.body;
   let newUser=new user({
    username,
    email,
    password
   })
  await newUser.save()
  res.json({
    success:true,
    data:newUser,
    message:"blog added successfully"
  })
})
app.get("/users",async(req,res)=>{
   let allusers= await user.find();
   res.json({
        success:true,
        data:allusers
   })
})



// login route - generate JWT with payload { userId: user._id }
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let userExist = await user.findOne({ email: email });
  if (!userExist) {
    return res.json({
      success: false,
      message: "please signup first because user doesnt exist"
    });
  }
  if (userExist.password != password) {
    return res.json({
      success: false,
      message: "incoorect password"
    });
  }

  // generate token
  let token = jwt.sign({ userId: userExist._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({
    success: true,
    message: "login successfully",
    token: token,
    payload: { userId: userExist._id }
  });
})


//delete a blog user id
app.get("/users/:id",async(req,res)=>{
    let {id}= req.params
    let userExist= await user.findOne({_id:id}).populate("blogs")
    if(userExist){
    res.json({
        success:true,
        data:userExist
    })
  }
})


//delete blog
app.delete("/blogs/:blogId",isLogin,async(req,res)=>{
  let {blogId}= req.params;
  let  userId = req.userId;
  let blogExist = await Blogs.findById(blogId);
  if(!blogExist) return res.json({
    success:false,
    message:"Blog doest not exist"
  })
  if(blogExist.userId!=userId) return res.json({
    success:false,
    message:"You are not allowed to delete this blog"
  })
  await Blogs.findByIdAndDelete(blogId);
  console.log("aaaaaaaaaaaaaaaaaaaaaa")
  let userExist = await user.findById(userId);
  let blog= userExist.blogs.filter((id)=> id!=blogId)
  userExist.blogs=blog
  await userExist.save();
  console.log("bbbbbbbbbbbbbbb")
  res.json({
    success:true,
    message:"blog deleted successfully",
    data:userExist
  })
})



app.listen(4455,()=>{
    console.log("server started")
})
mongoose.connect('mongodb://127.0.0.1:27017/g26db')
  .then(() => console.log('Connected!'));