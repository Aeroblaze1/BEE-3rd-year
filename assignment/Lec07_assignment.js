const fs = require("fs");

const input = process.argv.slice(2); // skip `node` and `Lec07_assignment

if (input.length === 0) {
  console.log(" Please provide a task ");
  process.exit(1);
}

const newTask = input.join(" ").trim();

fs.readFile("todo.txt", "utf-8", (err, data) => {
  let tasks = [];

  if (!err && data) {
    try {
      tasks = JSON.parse(data);
    } catch (e) {
      console.log("eror");
    }
  }

  tasks.push({ task: newTask });

  fs.writeFile("todo.txt", JSON.stringify(tasks, null, 2), (err) => {
    if (err) return console.log("Error writing file:", err);
    console.log(`Task added: "${newTask}"`);
  });
});
