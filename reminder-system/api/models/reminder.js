var mongoose = require("mongoose");
var _ = require("lodash");

var reminderDataSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true, 
        unique: true    
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
    num_installment_remain: {
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

reminderDataModel.updateNextInstallment = function(id, updatedInfo, callback) {
    reminderDataModel.findByIdAndUpdate(id, updatedInfo, callback)
}


module.exports = reminderDataModel;
