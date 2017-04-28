//process.on('uncaughtException', function (err) {
//  console.log("Execption : Node Exit Prevented", err);
//});
var express = require('express');
var http = require('http');
var path = require('path');
var sql = require('mssql');
var loader = new (require('./lib/loader'))();

var routes = require('./config/routes');
var config = require('./config/config');

var auth = function (req, res, next) {
    var header = req.headers['authorization'] || '', // get the header
            token = header.split(/\s+/).pop() || '', // and the encoded auth token
            auth = new Buffer(token, 'base64').toString(), // convert from base64
            parts = auth.split(/:/), // split on colon
            username = parts[0],
            password = parts[1];

    if (username == 'admin' && password == '1234') {
        return next();
    }
    else {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm="Sastasundar"')
        res.end('Invalid credentials');
    }
}

var setheader = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('X-Powered-By', 'sastasundar.com');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('Content-Type', 'application/json; charset=UTF-8');
    
    next();
}
var dbcon = function (req, res, next) {
    var connection = new sql.Connection(config.db, function (err) {
        if (err)
            console.log("DB connection error.", err);
        req.db = connection;
        next();
    });

}

var app = express();

// Port
app.set('port', config.port);
app.set('view engine', 'hbs');
app.set('env', 'production');

// Routes
for (var controllerName in routes) {
    app.use('/' + routes[controllerName], dbcon, setheader, loader.loadController(controllerName));
}


http.createServer(app).listen(app.get('port'), function () {
    console.log('Listening Port : ' + app.get('port'));
});