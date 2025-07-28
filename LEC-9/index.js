const express=require("express");
const fs=require("fs");
const app=express();

app.use(express.json())
// app.get("/", (req, res)=>{
//     res.send("Hello World");
// })


app.post("/pic", (req, res)=>{
    let {userId, userName}=req.body;
    res.json({userId, userName});
     const student={
            userId,
            userName
        }
    // let student={
    //     studentId:userId,
    //     studentName:userName
    // }
    // let stuarr=[];
    // stuarr.push(student)
    // fs.writeFile("studentData.txt", JSON.stringify(stuarr), (err)=>{
    //     if(err) return console.log(err);
    //     console.log("Done");
    // })
    let existStudent=[];
    fs.readFile("studentData.txt","utf-8", (err, data)=>{
        if(err) return res.send(err);
        if(data && data.length>0){
        existStudent=JSON.parse(data);
        }
        existStudent.push(student);
        fs.writeFile("studentData.txt", JSON.stringify(existStudent), (err)=>{
            if(err) return res.send(err);
            console.log("done");
        })
    })


})
app.listen(4444, ()=>{
    console.log("server started");
})