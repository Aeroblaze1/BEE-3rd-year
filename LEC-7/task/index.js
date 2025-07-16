const fs = require("fs");

let users = [
  { name: "Nitesh", age: 24, address: "delhi" },
  { name: "ritik", age: 25, address: "faridabad" }
];
let users2 = [
  { name: "Rtesh", age: 19, address: "bengal" },
  { name: "Karan", age: 12, address: "mohali" }
];



// Write both files:
fs.writeFile("./1.txt", JSON.stringify(users), function(err) {
  if (err) console.log(err);
  console.log("users written!!");
});
fs.writeFile("./2.txt", JSON.stringify(users2), function(err) {
  if (err) console.log(err);
  console.log("users written in 2nd file!!");
});




//read both files and write in another file the combined data of both files.
fs.readFile("./1.txt", "utf-8", function(err, data1) {
  if (err) return console.log(err);
  let users1 = JSON.parse(data1);

  fs.readFile("./2.txt", "utf-8", function(err, data2) {
    if (err) return console.log(err);
    let users2 = JSON.parse(data2);

 
    // let users3 = [...users1, ...users2]; //the ... is spread operator

    //let combined = users1.concat(users2); //the concat method

    //brute force
    let mergedUsers = [];

for (let i = 0; i < users1.length; i++) {
  mergedUsers.push(users1[i]);
}
for (let i = 0; i < users2.length; i++) {
  mergedUsers.push(users2[i]);
}


    fs.writeFile("./users.txt", JSON.stringify(mergedUsers), function(err) {
      if (err) console.log(err);
        console.log("written successfuky");
      });
    });
  });

