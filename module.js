// Modules in nodejs
/* There are three types of modules in Nodejs  
1)Core Modules
2)Local Modules
3)Third party Modules
*/

// fs module used to handle file system (reading and writing to a file);
const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
