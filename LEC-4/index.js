// function buyProduct(product_Name, cb) {
//   //do some aysnc code
//   setTimeout(() => {
//     //all the operation completed
//     console.log("all the i/o is completed and order details are");
//     cb();
//   });
// }

// buyProduct("iphone 6", function () {
//   console.log("product purchased");
// });

let product=[{
    name:"samsung",
    amount:700,
    quantity : 3
},
{
    name:"appke",
    amount:120,
    quantity : 0
},
]
function buyProduct(product_Name, cb) {
  //do some aysnc code
 let  isProduct = product.filter((p)=>p.name==product_Name)[0] //forms an array with filtered products
    if(!isProduct){
       return cb("product not available",null)
    }
    cb(null,isProduct.amount)
}

let availableAmount = 20000;
function deductbankamount(amount,cb){
    if(amount>availableAmount){
        return cb("bank balance is low",null);
    }else{
        availableAmount-=amount;
        console.log(availableAmount);
        cb(null,"amount deducted");
        cb(null,"amount deducted");//if by mistake extra callback added then we needa resolve this using promises.

    }
   
}


buyProduct("appke", function (err,amount){
    if(err)return console.log(err);
  console.log(amount);
  deductbankamount(amount,function(err,message){
    if(err) return console.log(err)
        console.log(message);
  })
});


const fs = require("fs")
fs.readFile("filepath","utf-8",function(err,data){

})




