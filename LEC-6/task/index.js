const fs = require('fs');

//since asynchornous code , so we have to do nested way since if we make individual functions , they will take time
//we are avoiding using individual functions since
/*
 code would have a race condition because fs.readFile is asynchronous, and you try to use 1.txt and 2.txt in fs.writeFile before both read operations have finished.
This can result in a or b being undefined or an empty string.
*/
fs.readFile("./1.txt", "utf-8", function(err, data1) {
    if (err) return console.log(err);
    fs.readFile("./2.txt", "utf-8", function(err, data2) {
        if (err) return console.log(err);
        fs.writeFile("./task.txt", data1 +" "+ data2, function(err) {
            if (err) return console.log(err);
            console.log("Successfully written in task file");
        });
    });
});

//assignment - write data in file using fs module , input data should be taken using terminal
const userInput = process.argv.slice(2).join(' ');

// Write user input into a file, e.g., 'output.txt'
fs.writeFile('output.txt', userInput,(err) => {
    if (err) return console.error('Error writing to file:', err);
    console.log('Data written successfully to output.txt');
});