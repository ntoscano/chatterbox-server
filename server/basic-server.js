/* Import node's http module: */

var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.Server(app)

var requestHandlerObj = require("./request-handler.js");

var port = 3000;

var ip = "127.0.0.1";


var handleRequest = requestHandlerObj.requestHandler;
var server = http.createServer(handleRequest);


console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

