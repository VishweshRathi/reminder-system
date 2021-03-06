const express = require('express');
const config = require(`./config/config`);
const app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
mongoose.connect(config.dbURL);

app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); // support encoded bodies


var routes = require('./routers/routes.js');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");    
    next();
});

app.use('/', routes);

const port = config.dev.port
app.listen(port,()=>{
    console.log("Sever Started on port: "+port);
})

module.exports = app;
