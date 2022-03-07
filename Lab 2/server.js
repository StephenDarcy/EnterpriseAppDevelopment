/**
 *  Author: Stephen Darcy - C18490924
 *  Description: Server file for nodejs that serves the index.html file
 *  on localhost:8080. It also listens for the client’s queries and
 *  responds to each of them through the file system reading operations.
 */

var fs = require("fs"),
  http = require("http");

// create http server
http
  .createServer(function (req, res) {
    // use fs module to send the requested file
    fs.readFile(__dirname + req.url, function (err, data) {
      if (err) {
        // if error send 404
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      // else send 200 and the data
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(8080);
console.log("View homepage at: http://localhost:8080/index.html");
