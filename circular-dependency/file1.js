const file2= require("./file2")
console.log(file2)

//we cant access file2 object since it is empty at first
function sum(a,b){
    return a+b
}

function sub(a,b){
    return a-b
}

module.exports = {
    sum,
    sub
}
