const User = require("../Schema/User")

const winston = require("winston").loggers

module.exports = {

    authenticateUser : (req, res)=>{
        const logger = winston.get('userController.js')
        const {email, password} = req.body;
        if(email == "" && password == ""){
            res.send("Email and password must not be empty")
        }else{
            try{
            User.findOne({email : email},(err,user)=>{
                if(err === null && user !== null){
                    if(user.doPasswordValidation(password)){
                        res.statusCode = 200;
                        res.send({session : user.toAuthJSON()})
                    }else{
                        res.statusCode = 505;
                        res.send("Email or Password is wrong")
                    }
                }else{
                    res.statusCode = 505;                        
                    res.send("Email or Password is wrong")
                }
            })
        }catch(err){
            logger.error(err)
        }
        }
    },

    registerUser : function(req , res){
        const logger = winston.get('userController.js')
        const {firstName, lastName, email, password} = req.body;
        let user;
        user = new User({firstName : firstName, lastName : lastName, email : email, password : password});
        
        const error = user.validateSync()
        if(error){
            logger.error(error)
            res.statusCode = 505
            res.send("User account creation failed")
        }else{
            try{
                user.doPasswordEncrytion(password)
                user.save(function(error){
                    if(error){
                        logger.error(error.message)
                        res.statusCode = 505;
                        res.send(error.message)
                    }else{
                        res.statusCode = 200;
                        res.send({session : user.toAuthJSON()})
                    }
                })
            }catch(err){
                res.statusCode = 505
                res.send("Account creation failed")
                logger.error(err)
            }
       }
    }
}