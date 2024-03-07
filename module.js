// Modules in nodejs
/* There are three types of modules in Nodejs  
1)Core Modules
2)Local Modules
3)Third party Modules
*/

// fs module used to handle file system (reading and writing to a file);
const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = require("./modules/replaceTemplate");

///// Reading and writing the file in the Synchronous way(Blocking Way).
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

/*/////Reading and writing the file in Asynchronous way(Non-blocking way).

// In this the callback function is executed when the reading or writing the file operation is completed asynchronously.

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
          console.log("Your file has been written 😇");
        }
      );
    });
  });
});

console.log("Will read File");
*/

///// Creating a Simple webserver
// The callfunction is executed every time we request a request to the server.
// const server = http.createServer(function (request, response) {
//   response.end("Hello from the server");
// });

/////Starting the server
// server.listen(8000, "127.0.0.1", function () {
//   console.log("Listening to requests on port 8000 ");
// });

///// Routing
// In routing in nodejs the server sends the specific response for the specific type of url request.
// Its kind of same as Routing in React. Like in React we render a specific component for the specific type of url.
// In nodejs the sever sends the specific type of response for the specific type of url request.
// const server = http.createServer(function (req, res) {
//   const { url } = req;
//   if (url === "/") {
//     res.end("Welcome to the home page of nodejs course");
//   } else if (url === "/products") {
//     res.end("Smart phones, Cars,bikes");
//   } else {
//     res.end("There is no data to show");
//   }
// });

// server.listen(8000, "127.0.0.1", function () {
//   console.log("Listening to requests on port 8000 ");
// });

///// Creating a simple Api

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);

const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer(function (req, res) {
  const { query, pathname } = url.parse(req.url, true);
  //  overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", function () {
  console.log("The server is listening at port 8000");
});
