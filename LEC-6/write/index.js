//file system - built in modules provide
const fs = require("fs");

fs.writeFile("../demo.txt","g26 hello",function(err,data){
    if(err) return console.log(err);
    console.log("successfully written g26 hello in the file demo.txt");
})
fs.appendFile("../demo.txt"," this is the word",function(err){
    if(err) return console.log(err);
    console.log("successfully appended ");
})//this doesnt run teh first time 