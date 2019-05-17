var express = require('express');
var Router = express.Router();

var controller = require('../controllers/reminder');

Router.post('/addentry', controller.addEntry);

Router.post('/showentry', controller.showEntry);

Router.post('/todayreminders', controller.todayReminders);

module.exports = Router;