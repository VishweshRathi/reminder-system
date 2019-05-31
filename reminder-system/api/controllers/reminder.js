const reminderDataModel = require('../models/reminder.js')
const {error, success} = require('../helpers/messages')
var nodemailer = require('nodemailer');
const config = require(`../config/config`);

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
            res.status(200).send({
                isError: true,
                msg: error.ERROR_UNABLE_GET_REMINDERS
            });
            console.log(err)
        }else if(userList.length == 0)  {
            res.status(200).send({
                isError: true,
                data: error.ERROR_NO_REMINDER_FOUND
            });
        } 
        else {
            res.status(200).send({
                isError: false,
                data: userList
            });            
        }
    });
}

exports.todayReminders = function (req, res) {
    reminderDataModel.showUsers(function (err, reminderList) {
        if (err) {
            res.status(200).send({
                isError: true,
                data: error.ERROR_UNABLE_GET_REMINDERS
            });
        } else if(reminderList.length == 0){
            res.status(200).send({
                isError: true,
                data: success.SUCCESS_REMINDER_EMPTY
            });
        } 
        else {
            let email_content = []
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
                        if(currentRemainder.num_installment_remain == 1) {
                            updatedInfo.nxt_installment = 0
                        }
                        prom_arr.push(new Promise(function (resolve, reject) {
                            reminderDataModel.updateNextInstallment(reminder._id,updatedInfo, function(err,data) {
                                if (err) {
                                    console.log(err)
                                    reject({
                                        isError: true,
                                        data: error.ERROR_UPDATE_REMINDER
                                    })
                                } else {
                                    email_content.push(currentRemainder)
                                    resolve({
                                        isError: false,
                                        data: success.SUCCESS_REMINDER_UPDATE
                                    })
                                }
                            })   
                        }))                  
                    }
                } 
            })
            if(prom_arr.length > 0) {
                Promise.all(prom_arr).then(promiseData => {
                    sendMailAPI(email_content, function(info) {
                        if(info.isError) {
                            res.status(200).send({
                                isError: true,
                                data: info.data
                            });  
                        } else if(promiseData.isError){
                            res.status(200).send({
                                isError: true,
                                data: promiseData[0].data
                            });  
                        } else {
                            res.status(200).send({
                                isError: false,
                                data: promiseData[0].data + " && " + info.data
                            });                             
                        }
                    })
                }).catch(err => {
                    res.status(200).send({
                        isError: true,
                        data: err
                    });
                })
            } else {
                res.status(200).send({
                    isError: true,
                    data: "No reminder available or problem in sending Email"
                });
            }
        }
    });
}

exports.deleteEntry = function (req, res) {
    let _id = req.body._id
    reminderDataModel.findByIdAndRemove(req.body._id, function(err, data) {
        if (err || !data) {
            res.status(200).send({
                isError: true,
                msg: error.ERROR_UNABLE_TO_DELETE
            });
            console.log(err)
        } else {
            res.status(200).send({
                isError: false,
                msg: success.SUCCESS_DELETE
            });            
        }
    })
}


sendMailAPI = (informationArray, callback) => {
    var operation_status
    getHtmlEmail = (information) => {
        let date_sold = new Date(information.date_sell);
        let std_date_sold = date_sold.getDate() + '/' + (date_sold.getMonth()+1) + '/' + date_sold.getFullYear()
        return (
            `<div>
                <p>Bill Id: ${information._id}</p> 
                <p>Name: ${information.cus_name}</p> 
                <p>Sold date: ${std_date_sold}</p>
                <p>Total Installment: ${information.num_installment}</p>
                <p>Amount: ${information.total_amount}</p> 
                <p>Current Installment Id: ${information.num_installment_remain}</p> 
                <p>--------------------------------------------------------</p>
            </div> `
        )
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: config.sendMailServer.user_id,
        pass: config.sendMailServer.password
        }
    });

    var mailOptions = {
        from: config.sendMailServer.user_id,
        to: config.receiveMailServer.user_id,
        subject: "Reminder Information",
        html: 
        `<div> 
            <h1>Hi there,</h1> 
            <h3>Please find the details below of today's reminder</h3> 
            <div>
                ${informationArray.map(information => {
                  return getHtmlEmail(information)
                })}
                <p>Note: Kindly do not replay to this email :)</p> 
                <p style="font-weight:bold; font-size:1.3em">- Team Diagnocare </p> 
            </div> 
        </div>`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            callback({
                isError: true,
                data: "Problem in sending Email."
            })
        } else {
            callback({
                isError: false,
                data: "Email send successfully."
            })
        }
    });
}