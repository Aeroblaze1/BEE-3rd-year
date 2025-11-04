//connecting code for redis
let {createClient} = require("redis");
let client = createClient();

async function notify(){
    client.PUBLISH("notify_me",JSON.stringify({
        event_id:1,
        message:"iphone back in stock"}))
}

setTimeout(() => {
   notify()
}, 2000);


//async function too
client.connect()
.then(()=>console.log("redis connected"))