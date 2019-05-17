var mongoose = require("mongoose");
var _ = require("lodash");

var reminderDataSchema = new mongoose.Schema({
    cus_name: {
        type: String,
        required: true
    },
    date_sell: {
        type: String,
        required: true
    },
    next_installment:{
        type:{
            date: String,
            amount: String
        },
        required: true
    },
    total_amount: {
        type: String,
        required: true
    },
    installments: {
        type: Array,
        default: [],
        required: true
    },

})

var reminderDataModel = mongoose.model('Reminder', reminderDataSchema)

reminderDataModel.createReminder = function (newReminder, callback) {
    newReminder.save(callback);
};

reminderDataModel.showUsers = function (callback) {
    reminderDataModel.find({}, callback);
};


module.exports = reminderDataModel;
