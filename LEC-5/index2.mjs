// let p = new Promise((resolve,reject)=>{
//     resolve("done");

// })

// p.then((data)=>{
// console.log(data);
// })
// .catch((err)=>{
//     console.log(err)
// })


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

let availableAmount = 20000;

function buyProduct(product_Name) {
    return new Promise((resolve, reject) => {
        
        let isProduct = product.filter((p) => p.name === product_Name)[0];
        if (!isProduct) {
            reject("product not available");
        } else {
            resolve(isProduct.amount);
        }
    });
}


function deductBankAmount(amount) {
    return new Promise((resolve, reject) => {
        if (amount > availableAmount) {
            return reject("bank balance is low");
        } else {
            availableAmount -= amount;
            console.log(availableAmount);
            resolve("amount deducted");
            // Any further resolve/reject calls are ignored by the Promise spec
            resolve("amount deducted"); // This will have no effect
        }
    });
}

// buyProduct("samsung")
//     .then((amount) => {
//         console.log("Amount:", amount);
//         // Now call deductBankAmount with the product amount
//         return deductBankAmount(amount);
//     })
//     .then((msg) => {
//         // This runs only if both buyProduct and deductBankAmount succeed
//         console.log(msg+" (this ran after amount deducted)");
//     })
//     .catch((error) => {
//         // Handles errors from either buyProduct or deductBankAmount
//         console.error("Error:", error);
//     });


    /*now we can write the above code to analyze upon the promise in synchroous way too and without .then .catch , how wuld we do that (we use async, await ) */
    console.log("start")
    let a=10;
    let b=15;
    let c=a+b;
    function sum(a,b){
        return a+b;
    }
    let result = sum(5,4);
    console.log(result);

    //await is only valid in async functions and top level bodies of modules
    // let amount = buyProduct("samsung");//but return value is promise so how do i continue
    async function domytask(){

    
    try{
        let amount = await buyProduct("samsung");

    let mes = await deductBankAmount(amount);
    console.log(mes);}
    catch(error){
        console.log(error);
    }
    }
    console.log(domytask());
    console.log("start");