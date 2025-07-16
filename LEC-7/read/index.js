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
// fs.readFile("../users.txt","utf-8",function(err,data){
//     if(err)console.log(err);
//     console.log(JSON.parse(data)[0]);
//     console.log(JSON.parse(data)[1].address);
    
// })


//json format to work on object - object to readable and vice

const myread = require("../IOoperation/util")

async function readFile(filepath){
    let data = await read(filepath);
    console.log(data);
}
async function writeFile(filepath){
    let data = await write(filepath);
    console.log(data);
}

readFile("../task/users.txt");