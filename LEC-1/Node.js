const fs = require("fs")
console.log(fs)
console.log("hi")

function add(a,b){
    return a+b
}

function sub(a,b){
    return a-b
}
function multiply(a,b){
    return a*b
}

fs.readFile("demo.txt", "utf-8",(data)=>{
    console.log(data)
})
//file cannot be run onto main thread so this work is delegated to thread pool

add(2,3);
sub(2,3);
multiply(1,3);

//thread run tasks ,processor runs the whole program

/*
Non- blocking I/O operation despite Node being single thread  , 
TWo components in NodeJS -:
1) V8 engine - c++, JS 
2) Lib-UV library - c++ library, Event loop and threadpool

|----------------------|
|     main thread:     |
|   Project intizalize |
|   module require     |
|   top level code     |
|   call back register |
|          |           |
|     event loop start | event loop delegats the data to thread pool where eaxecution is done parallely
|----------------------|

event loop , and thread pool are made for Lib-U library . Thread pool has many units , each unit having 4 threads . we use thread pool for CPU intensive tasks -
- fs
- crypto
- DNS

in which order callback will be executed 

callback will be executed , will be decide by event loop-
1) exposed timer - setTimeout
2) i/o polling - fs, request
3) setImmediate
4) close callback - server off , socket
pending? callback?

---> yes then event loop run again
---->no then exit



*/