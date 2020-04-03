const express =  require("express")
const body_parser = require("body-parser")

const auth_router = require("./router/auth_router")


const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: true }))
  // parse requests of content-type - application/json
app.use(body_parser.json())

app.use("/", auth_router)

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send("Error"+err)
  });

module.exports  = app