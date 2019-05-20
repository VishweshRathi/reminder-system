var mongoose = require("mongoose");
var _ = require("lodash");

var reminderDataSchema = new mongoose.Schema({
    invoice_id: {
        type: Number,
        required: true        
    },
    cus_name: {
        type: String,
        required: true
    },
    date_sell: {
        type: Number,
        required: true
    },
    num_installment: {
        type: Number,
        required: true
    },
    total_amount: {
        type: String,
        required: true
    },
    nxt_installment: {
        type:{
            date: Number,
            amount: String
        },
        required: true
    }
})

var reminderDataModel = mongoose.model('Reminder', reminderDataSchema)

reminderDataModel.createReminder = function (newReminder, callback) {
    newReminder.save(callback);
};

reminderDataModel.showUsers = function (callback) {
    reminderDataModel.find({}, callback);
};


module.exports = reminderDataModel;
