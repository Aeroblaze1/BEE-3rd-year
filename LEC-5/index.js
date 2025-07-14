let users=[
    {
        id:1,
        name:"Siddhnt",
        age:20
    }, 
    {
        id:2,
        name:"Aryan",
        age:17
    },
]

//async code as promise involved
function isAllowed(id) {
    return new Promise((resolve,reject)=>{

    let user = users.filter((u)=>{
        return u.id==id
    })[0]

       //match user
    //const user = users.find(u => u.id === id);

    console.log(user);
    if(!user) return reject("no user");

  
    // If user exists and age > 18, return name
    if (user && user.age > 18) {
        return resolve(user.name+" is eligible to vote");
    }
    

    })
 
    
    
}

//without promise
// console.log(isAllowed(1)); // "Siddhnt"
// console.log(isAllowed(2)); // null
// console.log(isAllowed(3)); // null

isAllowed(1).then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
})

console.log("start");
console.log("sum 2 number");