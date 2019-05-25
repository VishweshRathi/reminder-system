var express = require('express');
var app = express();
var mongoose = require("mongoose");
var reminderDataModel = require('../models/reminder.js')

exports.addEntry = function (req, res) {
    var data = req.body;
    var nxt_installment = parseInt(data.date_sell) + 2592000000
    var itemObj = {
        _id: data._id,
        cus_name: data.cus_name,
        date_sell: data.date_sell,
        num_installment: data.num_installment,
        num_installment_remain: data.num_installment,
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
        if (err) {
            res.status(404).send("Error in fetching the reminderList :", err);
        } else if(reminderList.length == 0){
            res.status(200).send("Reminder List is empty.");
        } 
        else {
            for(let i = 0; i < reminderList.length; i++) {
                let currentRemainder = reminderList[i]
                let nxtInstallmentDate = new Date(currentRemainder.nxt_installment)
                if(new Date().toISOString().split('T')[0] == nxtInstallmentDate.toISOString().split('T')[0]) {
                    if(currentRemainder.num_installment_remain != 0) {
                        let updatedInfo = {
                            nxt_installment: new Date(nxtInstallmentDate).getTime() + 2592000000,
                            num_installment_remain: currentRemainder.num_installment_remain - 1
                        }
                        reminderDataModel.updateNextInstallment(reminderList[i]._id,updatedInfo, function(err,data) {
                            if (err) {
                                res.status(400)("Error in updating the reminderList :", err);
                            } else {
                                res.status(200)("Reminder Updated.")
                            }
                        })                        
                    } else {
                        res.status(200)("No pending reminder in today's list.")
                    }
                } else {
                    res.status(200)("No reminder for today.")
                }
            }
        }
    });
}




