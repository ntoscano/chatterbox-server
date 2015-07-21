exports = module.exports = {};

var serverStorage = {
  results: [],
  urls: ['http://127.0.0.1:3000/', '/log', '/classes/messages', '/?order=-createdAt', '/classes/room1', '/classes/room']
};
var objCount = 0;

var requestHandler = function(request, response) {
  var statusCode = 200;
  if(request.method === "POST"){
    if(serverStorage.urls.indexOf(request.url) === -1){
      serverStorage.urls.push(request.url);
    }
    statusCode = 201;
    request.on('data', function(funk){
      var stringyData = funk.toString();
      var item = JSON.parse(stringyData);
      item.date = new Date();
      item.objectId = objCount;
      console.log(JSON.stringify(item));
      objCount++;
      serverStorage.results.push(item);
    })

  }

  console.log(request.url + " <----- this is the request URL")

  if(request.method === "GET"){
    if(serverStorage.urls.indexOf(request.url) === -1){
      statusCode = 404;
    }
  }

  console.log("Serving request type " + request.method + " for url " + request.url);



  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);

  console.log(statusCode);
  response.end(JSON.stringify(serverStorage));
};

exports.requestHandler = requestHandler;

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

