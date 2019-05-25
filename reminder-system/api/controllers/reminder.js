const reminderDataModel = require('../models/reminder.js')
const {error, success} = require('../helpers/messages')

exports.addEntry = function (req, res) {
    const req_data = req.body;
    const nxt_installment = parseInt(req_data.date_sell) + 2592000000
    const reminder_object = {
        _id: req_data._id,
        cus_name: req_data.cus_name,
        date_sell: req_data.date_sell,
        num_installment: req_data.num_installment,
        num_installment_remain: req_data.num_installment,
        total_amount: req_data.total_amount,
        nxt_installment: nxt_installment
    };
    const newReminder = new reminderDataModel(reminder_object)
    reminderDataModel.createReminder(newReminder, (err, reminder_info)=>{
        if (err) {
            if (err.code == 11000) {
                res.status(200).send(error.ERROR_ID_PRESENT_ERROR+req_data._id);
                console.log(err)
            } else {
                res.send(error.ERROR_ADDING_REMINDER);
                console.log(err)
            }
        } else {
            res.send(success.SUCCESS_REMINDER_ADDED);
        }        
    });  
};


exports.showEntry = function (req, res) {
    reminderDataModel.showUsers(function (err, userList) {
        if (err) {
            res.status(400).send(error.ERROR_UNABLE_GET_REMINDERS);
            console.log(err)
        } else {
            res.send(userList)
        }
    });
}

exports.todayReminders = function (req, res) {
    let reminder_res_msg = ""
    reminderDataModel.showUsers(function (err, reminderList) {
        if (err) {
            res.status(404).send(error.ERROR_UNABLE_GET_REMINDERS);
            console.log(err)
        } else if(reminderList.length == 0){
            res.status(200).send(success.SUCCESS_REMINDER_EMPTY);
        } 
        else {
            for(let i = 0; i < reminderList.length; i++) {
                let currentRemainder = reminderList[i]
                let nxtInstallmentDate = new Date(currentRemainder.nxt_installment)
                if(true || new Date().toISOString().split('T')[0] == nxtInstallmentDate.toISOString().split('T')[0]) {
                    if(currentRemainder.num_installment_remain != 0) {
                        let updatedInfo = {
                            nxt_installment: new Date(nxtInstallmentDate).getTime() + 2592000000,
                            num_installment_remain: currentRemainder.num_installment_remain - 1
                        }
                        if(currentRemainder.num_installment_remain == 1){
                            updatedInfo.nxt_installment = 0
                        }
                        reminderDataModel.updateNextInstallment(reminderList[i]._id,updatedInfo, function(err,data) {
                            if (err) {
                                res.status(304).send(error.ERROR_UPDATE_REMINDER);
                                console.log(err)
                            } else {
                                console.log("---------------email send")
                                res.status(200).send(success.SUCCESS_REMINDER_UPDATE)
                            }
                        })                        
                    } else {
                        res.status(200).send(success.SUCCESS_NO_PENDING_REMINDER)
                    }
                } else {
                    res.status(200).send(success.SUCCESS_NO_PENDING_REMINDER)
                }
            }
        }
    });
}




