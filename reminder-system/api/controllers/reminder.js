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
                res.status(200).send({
                    isError: true,
                    msg: error.ERROR_ID_PRESENT_ERROR+req_data._id
                });
                console.log(err)
            } else {
                res.status(200).send({
                    isError: true,
                    msg: error.ERROR_ADDING_REMINDER
                });
                console.log(err)
            }
        } else {
            res.status(200).send({
                isError: false,
                msg: success.SUCCESS_REMINDER_ADDED
            }); 
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
            var prom_arr = [];
            reminderList.map(function(reminder) {
                let currentRemainder = reminder
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
                        
                        prom_arr.push(new Promise(function (resolve, reject) {
                            reminderDataModel.updateNextInstallment(reminder._id,updatedInfo, function(err,data) {
                                if (err) {
                                    console.log(err)
                                    reject(error.ERROR_UPDATE_REMINDER)
                                } else {
                                    console.log("---------------email send")
                                    resolve(success.SUCCESS_REMINDER_UPDATE)
                                }
                            })   
                        }))                  
                    }
                } 
            })
            if(prom_arr.length > 0) {
                Promise.all(prom_arr).then(data => {
                    console.log("Success-------------------------------",data);
                    res.send()
                }).catch(err => {
                    console.log("err-------------------------------",err);
                })
            } else {
                res.send("ERRORR");
            }
        }
        
    });
}




