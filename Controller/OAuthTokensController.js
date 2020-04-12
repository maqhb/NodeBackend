const UserTokens = require("../Schema/UserTokens")

const winston = require("winston").loggers

module.exports = {

    //Setting Tokens
    setFb_Token : function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const {userId, fbToken} = req.body
        if(fbToken){
            try{
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during setting token "+err)         
                    }else{
                        if(userTokens){
                            userTokens.fb_token = fbToken
                            UserTokens.updateOne({userId : userId},userTokens, (err, resp)=>{
                                if(err){
                                    res.statusCode = 500
                                    res.send("Setting Instagram token failed  "+err)
                                }else{
                                    if(resp.nModified===0){
                                        res.statusCode = 200
                                        res.send("Same Token")
                                    }else{
                                        res.statusCode = 200
                                        res.send("Token Setted")
                                    }
                                }                                                        
                            })                        
                        }else{
                            let userTokens = new UserTokens({userId : userId, fb_token : fbToken})
                            userTokens.save(function(error){
                                if(error){
                                    logger.error(error.message)
                                    res.statusCode = 505;
                                    res.send(error.message)
                                }else{
                                    res.statusCode = 200;
                                    res.send("Token Setted")
                                }
                            })
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            }
        }else{
            res.statusCode = 500
            res.send("Facebook Token must not be null")
        }
    },
    setTw_Token : function(req, res){  
        const logger = winston.get('OAuthTokenController.js')
        const {userId, twToken} = req.body
        if(twToken){
            try{
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during setting token "+err)         
                    }else{
                        if(userTokens){
                            userTokens.tw_token = twToken
                            UserTokens.updateOne({userId : userId},userTokens, (err, resp)=>{
                                if(err){
                                    res.statusCode = 500
                                    res.send("Setting Instagram token failed  "+err)
                                }else{
                                    if(resp.nModified===0){
                                        res.statusCode = 200
                                        res.send("Same Token")
                                    }else{
                                        res.statusCode = 200
                                        res.send("Token Setted")
                                    }
                                }                                                        
                            })                        
                        }else{
                            let userTokens = new UserTokens({userId : userId, tw_token : twToken})
                            userTokens.save(function(error){
                                if(error){
                                    logger.error(error.message)
                                    res.statusCode = 505;
                                    res.send(error.message)
                                }else{
                                    res.statusCode = 200;
                                    res.send("Token Setted")
                                }
                            })
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            } 
        }else{
            res.statusCode = 500
            res.send("Twitter Token must not be null")
        }     
    },
    setInst_Token : function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const {userId, instToken} = req.body
        if(instToken){
            try{
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during setting token "+err)         
                    }else{                        
                        if(userTokens){                        
                            userTokens.inst_token = instToken
                            UserTokens.updateOne({userId : userId},userTokens, (err, resp)=>{
                                if(err){
                                    res.statusCode = 500
                                    res.send("Setting Instagram token failed  "+err)
                                }else{
                                    if(resp.nModified===0){
                                        res.statusCode = 200
                                        res.send("Same Token")
                                    }else{
                                        res.statusCode = 200
                                        res.send("Token Setted")
                                    }
                                }                                              
                            })                                       
                        }else{
                            let userTokens = new UserTokens({userId : userId, inst_token : instToken})
                            userTokens.save(function(error){
                                if(error){
                                    logger.error(error.message)
                                    res.statusCode = 505;
                                    res.send(error.message)
                                }else{
                                    res.statusCode = 200;
                                    res.send("Token Setted")
                                }
                            })
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            }
        }
        else{
            res.statusCode = 500
            res.send("Instagram Token must not be null")
        }               
    },
    setPin_Token : function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const {userId, pinToken} = req.body
        if(pinToken){
            try{
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during setting token "+err)         
                    }else{
                        if(userTokens){
                            userTokens.pin_token = pinToken
                            UserTokens.updateOne({userId : userId},userTokens, (err, resp)=>{
                                if(err){
                                    res.statusCode = 500
                                    res.send("Setting Instagram token failed  "+err)
                                }else{
                                    if(resp.nModified===0){
                                        res.statusCode = 200
                                        res.send("Same Token")
                                    }else{
                                        res.statusCode = 200
                                        res.send("Token Setted")
                                    }
                                }                                                        
                            })                        
                        }else{
                            let userTokens = new UserTokens({userId : userId, pin_token : pinToken})
                            userTokens.save(function(error){
                                if(error){
                                    logger.error(error.message)
                                    res.statusCode = 505;
                                    res.send(error.message)
                                }else{
                                    res.statusCode = 200;
                                    res.send("Token Setted")
                                }
                            })
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            }
        }else{
            res.statusCode = 500
            res.send("Pinterest Token must not be null")
        }
    },

    //Getting Tokens
    getFb_Token : function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const userId = req.params.userId
        if(userId){
            try{
                console.log(userId)
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during getting token "+err)         
                    }else{
                        if(userTokens){
                            res.statusCode = 200
                            res.send(userTokens.fb_token)
                        }else{
                            res.statusCode = 404;
                            res.send("Tokens not founded")
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            }
        }else{
            res.statusCode = 500
            res.send("User Id must be provided of user, to whom token belongs")
        }
    },
    getTw_Token : function(req, res){  
        const logger = winston.get('OAuthTokenController.js')
        const userId = req.params.userId
        if(userId){
            try{
                console.log(userId)
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during getting token "+err)         
                    }else{
                        if(userTokens){
                            res.statusCode = 200
                            res.send(userTokens.tw_token)
                        }else{
                            res.statusCode = 404;
                            res.send("Tokens not founded")
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            }
        }else{
            res.statusCode = 500
            res.send("User Id must be provided of user, to whom token belongs")
        }    
    },
    getInst_Token : function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const userId = req.params.userId
        if(userId){
            try{
                console.log(userId)
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during getting token "+err)         
                    }else{
                        if(userTokens){
                            res.statusCode = 200
                            res.send(userTokens.inst_token)
                        }else{
                            res.statusCode = 404;
                            res.send("Tokens not founded")
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            }
        }else{
            res.statusCode = 500
            res.send("User Id must be provided of user, to whom token belongs")
        }       
    },
    getPin_Token : function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const userId = req.params.userId
        if(userId){
            try{
                console.log(userId)
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 500;                        
                        res.send("Error occur during getting token "+err)         
                    }else{
                        if(userTokens){
                            res.statusCode = 200
                            res.send(userTokens.pin_token)
                        }else{
                            res.statusCode = 404;
                            res.send("Tokens not founded")
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
            }
        }else{
            res.statusCode = 500
            res.send("User Id must be provided of user, to whom token belongs")
        }
    }
}