const express=require("express");
const app= express();

// app.get("/", (req, res)=>{
//     res.sendFile(__dirname+"/index.html");
// })
// app.get("/about", (req, res)=>{
//     res.sendFile(__dirname+"/about.html");
// })


app.use(express.static(__dirname+"/public"))
app.listen(3333, ()=>{
    console.log("server started");
})