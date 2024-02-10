// Modules in nodejs
/* There are three types of modules in Nodejs  
1)Core Modules
2)Local Modules
3)Third party Modules
*/

// fs module used to handle file system (reading and writing to a file);
const fs = require("fs");

// Reading and writing the file in the Synchronous way(Blocking Way).
// Reading the data present in the file
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(
//   "This is the input data file before writing the content to the file",
//   textIn
// );

// const textOut = `This is what we know about the avocado: ${textIn}`;

// Writing the content to the output file.
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("This is the data to  be written to the file", textOut);

// fs.writeFileSync("./txt/input.txt", textOut);
// const newData = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log("This is the data after writing to the input file", newData);

// Reading and writing the file in Asynchronous way(Non-blocking way).

fs.readFile("./txt/start.txt", "utf-8", function (err, data1) {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", function (err, data2) {
    console.log(data2);

    fs.readFile("./txt/append.txt", "utf-8", function (err, data3) {
      console.log(data3);

      // writing to the final file in asynchronous way.
      fs.writeFile(
        "./txt/final.txt",
        `${data2}\n${data3}`,
        "utf-8",
        function (err) {
          console.log("Your file has been written ☺");
        }
      );
    });
  });
});

console.log("Will read File");
