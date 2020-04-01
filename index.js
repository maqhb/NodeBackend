const express =  require("express")

const app = express()

app.use("/home", (req, res)=>{
    console.log("hello")
    res.send("hello")
})

module.exports  = app