const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const withAuth = require("../lib/Auth")

router.post("/authenticateUser/",userController.authenticateUser)

router.post("/createUser/", userController.registerUser)

router.post("/testToken/",withAuth ,(req, res)=>{
    res.send("Authorization with token is done"+req.email)
})

module.exports = router