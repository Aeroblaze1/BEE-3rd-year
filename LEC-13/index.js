const express=require('express');
const app=express();
const fs=require('fs');
app.listen(8000,()=>{
    console.log("server started");
})
app.get("/users",(req,res)=>{
    fs.readFile("./users.json","utf-8",function(err,data){
        if(err)res.send(err);
        let alluser=JSON.parse(data);
        res.json(alluser);
    })
})