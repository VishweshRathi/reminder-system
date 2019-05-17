const express = require('express');

const app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
mongoose.connect("mongodb://localhost:27017/reminderSystem");

app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({limit: '50mb', extended: true })); // support encoded bodies


var routes = require('./routers/routes.js');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', routes);

const port =  3001
app.listen(port,()=>{
    console.log("Sever Started on port: "+port);
})

module.exports = app;
