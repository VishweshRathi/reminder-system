// All the app configuration values should be added here.
const dbHost = `localhost`,
    dbPort = `27017`,
    dbName = `reminderSystem`


module.exports = {
    apiVersion: `v1`,
    host: `https://localhost`, //Add the domain name or domain ip once this code will be on server.
    dev: {
        host: `http://localhost`,
        port: 3001
    },

    dbURL: `mongodb://${dbHost}:${dbPort}/${dbName}`,

    sendMailServer: {
        user_id: `noreplydiagno@gmail.com`,
        password: `vishwesh!@#`
    },

    receiveMailServer: {
        user_id: `diagnocare5200@gmail.com`
    },
};