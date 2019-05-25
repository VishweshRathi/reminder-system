var express = require('express');
var Router = express.Router();

var controller = require('../controllers/reminder');

Router.post('/addentry', controller.addEntry);

Router.get('/showentry', controller.showEntry);

Router.get('/todayreminders', controller.todayReminders);

module.exports = Router;