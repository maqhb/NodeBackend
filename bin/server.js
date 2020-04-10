const dotenv = require("dotenv")
dotenv.config()
const winston_logger = require("winston").loggers

const database = require("./database")
const app = require("../index")
const https = require('https');
const fs = require('fs');

const logger = winston_logger.get("server.js")
//Create connection with mongodb and make that connection globally accessible and also handle failure of
//connection at first try
let intialRetry = 0
configServer()

async function configServer(){
    if( await database.createConnection()){
        startServer()
    }else{
        intialRetry = intialRetry+1
        handleReconnection()
    }
}

function startServer(){
    const port = (process.env.PORT || 3000)

    /**
    https.createServer({
        key: process.env.PRIVATEKEY,
        cert: process.env.CERTIFICATE
    }, app)
    .listen(port,
        ()=>{
            logger.info("Server is listening on >"+port)
        }
        );
    */
    app.listen(port, ()=>{
    logger.info("Server is listening on >"+port)
        })
}

//Try three times to connect after every 30sec, in case of failure exit with 1
async function handleReconnection(){
    if(intialRetry <= 3){
        logger.info("Trying connection again with in 30s\n")
        setTimeout(()=>{
            configServer()
        },30000)
    }else{
        logger.error("Failed to connect database, 3 tries completed")
        process.exit(1)
    }
}