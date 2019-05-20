var express = require('express');
var app = express();
var mongoose = require("mongoose");
var reminderDataModel = require('../models/reminder.js')

exports.addEntry = function (req, res) {
    var data = req.body;
    var nxt_installment = data.date_sell + 2592000000
    var itemObj = {
        invoice_id: data.invoice_id,
        cus_name: data.cus_name,
        date_sell: data.date_sell,
        num_installment: data.num_installment,
        total_amount: data.total_amount,
        nxt_installment: nxt_installment
    };
    var newReminder = new reminderDataModel(itemObj)
    reminderDataModel.createReminder(newReminder, function(err, dbrem){
        if (err) {
            if (err.code == 11000) {
                res.status(200).send("User already exist");
            } else {
                res.send(err);
            }
        } else {
            res.status(200).send("SignUp successfully");
        }        
    });  
};


exports.showEntry = function (req, res) {
    reminderDataModel.showUsers(function (err, userList) {
        if (err) {
            console.log("err :", err);
        } else {
            console.log("Device list", userList);
            res.send(userList)
        }
    });
}

exports.todayReminders = function (req, res) {
    reminderDataModel.showUsers(function (err, reminderList) {
        let todayRemindersList = []
        if (err) {
            console.log("err :", err);
        } else {
            for(let i = 0; i < reminderList.length; i++){
               let nxtInstallmentDate = new Date(reminderList[i].nxt_installment)
               if(new Date().toISOString().split('T')[0] == nxtInstallmentDate.toISOString().split('T')[0]){
                   console.log("----------------------log",reminderList[i])
                   res.send(reminderList[i])
               }
            }
        }
    });
}
