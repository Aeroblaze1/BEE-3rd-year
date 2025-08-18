const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRoute = require("./routes/blogsRoutes");
const userRoute = require("./routes/usersRoutes");

//blogsRoutes - redirect request
app.use("/api/blogs", blogRoute);

app.use("/api/users", userRoute);

app.listen(4455, () => {
  console.log("server started");
});
mongoose
  .connect("mongodb://127.0.0.1:27017/g26db")
  .then(() => console.log("Connected!"));
