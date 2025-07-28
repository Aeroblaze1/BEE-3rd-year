const express=require("express");
const fs =require("fs");
const app= express();
app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded({extended:true}));

app.post("/addUser", (req, res)=>{
    let{username, password}=req.body;
    let user={
                username,
                password
            }
    // res.send({
    //     username,
    //     password
    // });
    
    let existStudent=[];
        fs.readFile("userData.txt","utf-8", (err, data)=>{
            if(err) return res.send(err);
            if(data && data.length>0){
            existStudent=JSON.parse(data);
            }
            
            existStudent.push(user);
            fs.writeFile("userData.txt", JSON.stringify(existStudent), (err)=>{
                if(err) return res.send(err);
                console.log("done");
            })
        })
        res.json(user);
})



app.listen(3333, ()=>{
    console.log("server started");
})