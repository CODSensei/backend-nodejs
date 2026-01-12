const fs = require("fs");

//Synchronous
// fs.writeFileSync("./test.txt", "Hey there");

//Asynchronous
// fs.writeFile("./testAsync.txt", "Hey there async", (err) => {
//   console.error(err);
// });

//Synchronous
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);

//Asynchronous
// fs.readFile("./contact.txt", "utf-8", (error, result) => {
//   if (error) console.error(error);
//   else console.log(result);
// });

//Synchronous
fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
