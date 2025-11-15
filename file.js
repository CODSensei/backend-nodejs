const fs = require("fs");

//Synchronous
// fs.writeFileSync("./test.txt", "Hey there");

//Asynchronous
fs.writeFile("./testAsync.txt", "Hey there async", (err) => {
  console.error(err);
});
