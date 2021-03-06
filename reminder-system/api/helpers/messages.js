const success = {
    SUCCESS_REMINDER_ADDED: "Reminder added succesfully",
    SUCCESS_REMINDER_EMPTY: "Reminder List is empty",
    SUCCESS_REMINDER_UPDATE: "Reminder updated successfully",
    SUCCESS_DELETE: "Reminder deleted successfully",
    SUCCESS_NO_PENDING_REMINDER: "No pending reminder for today",
}
const error = {
    ERROR_REMINDER_ADDED: "Error in adding Reminder.",
    ERROR_ID_PRESENT_ERROR: "Reminder already exist for id: ",
    ERROR_ADDING_REMINDER: "Error while adding reminder",
    ERROR_UNABLE_GET_REMINDERS: "Unable to get Reminder list",
    ERROR_UNABLE_TO_DELETE: "Unable to delete Reminder",
    ERROR_UPDATE_REMINDER: "Error in updating the reminderList",
    ERROR_NO_REMINDER_FOUND: "Sorry! No reminder(s) found"
}

module.exports.error = error
module.exports.success = success