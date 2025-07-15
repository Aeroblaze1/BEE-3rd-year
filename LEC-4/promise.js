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

buyProduct("samsung")
    .then((amount) => {
        console.log("Amount:", amount);
        // Now call deductBankAmount with the product amount
        return deductBankAmount(amount);
    })
    .then((msg) => {
        // This runs only if both buyProduct and deductBankAmount succeed
        console.log(msg+" (this ran after amount deducted)");
    })
    .catch((error) => {
        // Handles errors from either buyProduct or deductBankAmount
        console.error("Error:", error);
    });


    