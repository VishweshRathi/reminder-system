var express = require('express');
var Router = express.Router();

var controller = require('../controllers/reminder');

Router.post('/addEntry', controller.addEntry);

Router.get('/showEntry', controller.showEntry);

Router.get('/todayReminders', controller.todayReminders);

Router.delete('/deleteEntry', controller.deleteEntry);

module.exports = Router;