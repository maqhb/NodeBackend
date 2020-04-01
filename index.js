const express =  require("express")
const body_parser = require("body-parser")

const auth_router = require("./router/auth_router")

const app = express()

app.use(body_parser)
app.use("/auth", auth_router)

module.exports  = app