let users=[
    {
        name:"Nitesh",
        age:24,
        address:"delhi"
    },
    {
        name:"ritik",
        age:25,
        address:"faridabad"
    }
]

const fs = require("fs"); //by default callback API is received when we call fs , 

//if we wanna use promise API , then we needa use 
fs.writeFile("../users.txt",JSON.stringify(users),function(err){
    if(err)console.log(err);
    console.log("users written!!");
})

//json format to work on object - object to readable and vice

