var express = require('express');
var app = express();
var mongoose = require("mongoose");
var reminderDataModel = require('../models/reminder.js')

exports.addEntry = function (req, res) {
    var data = req.body;
    var installment_arr = []
    for(var a = 0 ; a < data.installments.length ; a++){
        installment_arr.push(data.installments[a])
    }
    var itemObj = {
        cus_name: data.cus_name,
        date_sell: data.date_sell,
        next_installment: data.next_installment,
        total_amount: data.total_amount,
        installments: installment_arr
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
        if (err) {
            console.log("err :", err);
        } else {
            for(let i = 0; i < reminderList.length; i++){
                let reminderObj = reminderList[i]
                let installmentOfObject = reminderObj["installments"]
                // consol/
            }
            // res.send(userList)
        }
    });
}
