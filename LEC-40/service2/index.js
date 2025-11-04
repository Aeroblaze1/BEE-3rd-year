//connecting code for redis
let {createClient} = require("redis");
let client = createClient();

//function to run after event, we always run callback 
async function notify_me(){
    client.SUBSCRIBE("notify_me",(message)=>{
        console.log(message)
    })
}
setTimeout(() => {
   notify_me() 
}, 2000);


client.connect()
.then(()=>console.log("redis connected"))