var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var request = require('request');
http.createServer(function(req,res) {

    if(req.url == '/register') {
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.createReadStream("./public/register.html","UTF-8").pipe(res);
    }

    if(req.url == '/login') {
        res.writeHead(200, {"Content-Type":"text/html"});
        fs.createReadStream("./public/login.html","UTF-8").pipe(res);
    }

    if(req.url == "/userAdded") {
        var data = "";
        req.on("data", function(chunk) {
            data += chunk;
        });
       
        req.on("end", function (chunk) {
            var q = querystring.parse(data);
            
            var j = { 'user' : { 'first_name' : q.first_name,
                                               'last_name' : q.last_name,
                                               'username' : q.username,
                                                'password' : q.password,
                                                'userType' : q.usertype      

        }}    
        console.log(j); 
        
        request.post ({ 
            url : "http://localhost:5000/login/add",
           
            json : j
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body)
            }
            else {
    
                console.log("error: " + response)
                console.log("response.statusCode: " + response.statusCode)
                console.log("response.statusText: " + response.statusText)
            }
        }
        )

          })

          res.writeHead(200, {"Content-Type":"text/html"});
          fs.createReadStream("./public/userAdded.html","UTF-8").pipe(res);
             
                }
}).listen(3000);