const express =  require("express")
const body_parser = require("body-parser")
const morgan  = require("morgan")
const cookieParser = require('cookie-parser');
const cors = require("cors")

const auth_router = require("./router/auth_router")

const winston = require("./bin/config/logger")
const loggercategories = require("./bin/config/loggercategories")

const app = express()

//Combinig morgan and winston for logging purpose
app.use(morgan('combined', { stream: winston.stream }))
loggercategories.configLoggerCategories()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: true }))
  // parse requests of content-type - application/json
app.use(body_parser.json())
app.use(cookieParser()); 
app.use(cors())

app.use("/", auth_router)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send("Error"+err)
  });

module.exports  = app