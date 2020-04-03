const mongoose = require("mongoose");

const winston = require("winston").loggers

let logger;
async function createConnection (){
    logger = winston.get("database.js");
    // Connecting to the database
    return mongoose.connect(process.env.DBURL ,{
        useNewUrlParser: true,
        reconnectInterval:5000,
        bufferMaxEntries:0,
        poolSize:10,
        reconnectTries:3,
    }).then(() => {
        logger.info("Successfully connected to the database\n");
        registerListener()
        return true
    }).catch(err => {
        logger.error('Could not connect to the database.\n', err);
        return false
    })
}

function registerListener(){
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        logger.error("Database conection dropped, Trying again\n"+err)
    });

    mongoose.connection.on("reconnect", ()=>{
        logger.info("Reconnected.\n")
    })

    mongoose.connection.on("reconnectFailed", ()=>{
        logger.error("Mongoose has run out of reconnectTries.\n")
        process.exit(2)
    })
}

module.exports = {createConnection}