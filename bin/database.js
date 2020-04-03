const mongoose = require("mongoose");

const winston = require("winston").loggers

function createConnection (){
    const logger = winston.get("database.js");
    // Connecting to the database
    mongoose.connect(process.env.DBURL ,{
        useNewUrlParser: true
    }).then(() => {
        logger.info("Successfully connected to the database\n");    
    }).catch(err => {
        logger.error('Could not connect to the database.\n', err);
        logger.info("Trying connection again with in 30s\n")
    })
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', err => {
        logger.error("Database conection dropped, Trying again\n"+err)
    });

    mongoose.connection.on("reconnectFailed", ()=>{
        logger.error("Mongoose has run out of reconnectTries.\n")
        process.exit(1)
    })
}

module.exports = {createConnection}