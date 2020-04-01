const User = require("../Schema/User")

module.exports = {

    authenticateUser : (req, res)=>{
        const {email, password} = req.body;
        console.log(email, password)
        if(email == "" && password == ""){
            res.send("Email and password must not be empty")
        }else{
            try{
                let user = User.findOne({email : email}).then((user)=>{
                        if(user.doPasswordValidation(password)){
                            res.statusCode = 200;
                            res.send({session : user.toAuthJSON()})
                        }else{
                            res.statusCode = 505;
                            res.send("Email or Password is wrong")
                        }
                })
            }catch(error){
                    console.log("Error"+error)
            }
       }
    },

    registerUser : function(req , res){
        const {firstName, lastName, email, password} = req.body;
        let user;
        user = new User({firstName : firstName, lastName : lastName, email : email, password : password});
        
        const error = user.validateSync()
        if(error != null){
            console.log(error)
            res.send(error)
        }else{
            user.doPasswordEncrytion(password)
            user.save(function(error){
                    if(error){
                        console.log(error.message)
                        res.statusCode = 505;
                        res.send(error.message)
                    }else{
                        res.statusCode = 200;
                        res.send({session : user.toAuthJSON()})
                    }
                }) 
       }
    }
}