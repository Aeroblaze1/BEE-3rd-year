let p = new Promise((resolve,reject)=>{
    resolve("done")

})

p.then((data)=>{
console.log(data);
})
.catch((err)=>{
    console.log(err)
})


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
buyProduct("samsung")
    .then((amount) => {
        console.log("Amount:", amount);
    })
    .catch((error) => {
        console.error("Error:", error);
    });