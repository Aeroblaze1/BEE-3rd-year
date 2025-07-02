const fs=require("fs")
console.log("start")

setTimeout(()=>{
    console.log("timer callbacl")
},0)// runs at timer phase


setImmediate(()=>{
    console.log("set immediate callback")
})
//runs after polling phase



fs.readFile("demo.txt",(data)=>{ 
    console.log("poll phase callback");
    setTimeout(()=>{
        console.log("timer 2");
    },0)

    setImmediate(()=>{
        console.log("immd 2");
    })
})

console.log("end")

//top level code is run first then event loop , then setTImeout , then setImmediate

// if setTimeout and setImmediate are used without any other code , then order cannot be determined of which weill be run first, for trying out comment out start and end

/**
 * start
end
timer callbacl
set immediate callback
poll phase callback
immd 2
timer 2
PS C:\Users\user\Desktop\BEE-3rd year\LEC-1>
timer 2

this output when file is not read first(which it should since polling comes before immediate, but file is difficlut to read) after timer phase end , as then immediate run , after then callback phase, no callbacks so event loop runs again and polling phase comes , which then ends and after that imemdiate phase comes so immd2 runs , then loop ends then timer2
 * 
 if file is easy to read then polling phase runs after timer and
 start
 end
 timer callback
 poll phase
 immd2
 set immediate callback
 timer2
 * 
 process.nextTick priority >
 promise priority during shifting of phases , not that it starts first , it only has priority when shifting through phases and encountered
 microtaskqueue has priority so if in any phase a microtaskqueue encountered it is run
 * 
 */