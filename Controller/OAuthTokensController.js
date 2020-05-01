const UserTokens = require("../Schema/UserTokens")
const Tokens = require("./Tokens")

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
    //get short term token and convert it into long term token and store it in db
    set_Basic_Inst_Token : async function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const {userId, instShortToken,clientId} = req.body 
        if(instShortToken){
            let instToken = await Tokens.getInstLongToken(instShortToken) //Get long term token with the help of short term token
            if(instToken.access_token === undefined){
                logger.error(instToken.message)
                res.statusCode = 200;                        
                res.json({"error":"Error occur during setting token "+instToken.message}) 
            }        
            try{
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 200;                        
                        res.json({"error":"Error occur during setting token "+err})         
                    }else{                        
                        if(userTokens){                        
                            userTokens.inst_token.basic_token = instToken
                            userTokens.inst_token.basic_token.userId = clientId//Instagram user account id
                            UserTokens.updateOne({userId : userId},userTokens, (err, resp)=>{
                                if(err){
                                    res.statusCode = 200
                                    res.json({"error":"Setting Instagram token failed  "+err})
                                }else{
                                    if(resp.nModified===0){
                                        res.statusCode = 200
                                        res.json({"token":instToken.access_token})
                                    }else{
                                        res.statusCode = 200
                                        res.json({"token":instToken.access_token})
                                    }
                                }                                              
                            })                                       
                        }else{
                            instToken.userId = clientId
                            let userTokens = new UserTokens({userId : userId, inst_token :{basic_token: instToken}})
                            userTokens.save(function(error){
                                if(error){
                                    logger.error(error.message)
                                    res.statusCode = 505;
                                    res.send(error.message)
                                }else{
                                    res.statusCode = 200;
                                    res.json({"token":instToken})
                                }
                            })
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
                res.statusCode = 200
                 res.json({"error":"Setting Instagram token failed  "+err})
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
    get_Basic_Inst_Token : function(req, res){
        const logger = winston.get('OAuthTokenController.js')
        const userId = req.params.userId
        if(userId){
            try{
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 200;                        
                        res.json({"error":"Error occur during getting token "+err})         
                    }else{
                        if(userTokens){
                            res.statusCode = 200
                            res.json({"token":userTokens.inst_token.basic_token})
                        }else{
                            res.statusCode = 404;
                            res.json({"error":"Tokens not founded"})
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
                res.statusCode = 200
                res.json({"error":"Error occur during getting token "+err})
            }
        }else{
            res.statusCode = 200
            res.json({"error":"User Id must be provided of user, to whom token belongs"})
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
    },
    getOAuthTokens : function(req, res){
        res.header({Content_Type:"application/json"})
        const logger = winston.get('OAuthTokenController.js')
        const userId = req.params.userId
        if(userId){
            try{
                console.log(userId)
                UserTokens.findOne({userId : userId},(err,userTokens)=>{
                    if(err){           
                        logger.error(err)
                        res.statusCode = 200;                        
                        res.json({"error":"Error occur during getting token "+err})         
                    }else{
                        if(userTokens){
                            res.statusCode = 200
                            res.json({"token":userTokens})
                        }else{
                            res.statusCode = 404;
                            res.json({"error":"Tokens not founded"})
                        }                    
                    }
                })
            }catch(err){
                logger.error(err)
                res.statusCode = 200;                        
                res.json({"error":"Error occur during getting token "+err})  
            }
        }else{
            res.statusCode = 200
            res.json({"error":"User Id must be provided of user, to whom token belongs"})
        }       
    }
}