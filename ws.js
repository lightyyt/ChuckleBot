const http = require('http');
require("dotenv").config();
var port = process.env.PORT;

http.createServer((request, response) => { 
  response.writeHead(200, { 
    'Content-Type': 'text/json' 
  }); 
  response.write('{"data":"activity","value":true}'); 
  response.end(); 
}).listen(port);