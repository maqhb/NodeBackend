var axios = require('axios');
require("dotenv").config();

const winston = require("winston").loggers

module.exports ={
    //Setting Tokens
    validateFb_Token : function(req, res){
        const logger = winston.get('Store_OAuthToken.js')
        logger.info("Soon will be implemented")        
    },
    validateTw_Token : function(req, res){  
        const logger = winston.get('Store_OAuthToken.js')
        logger.info("Soon will be implemented")         
    },
    validateInst_Token : function(req, res){
        const logger = winston.get('Store_OAuthToken.js')
        const {tw_token} = req.body
        if(tw_token){            
            let config = {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                }
              }
            axios.post("https://api.instagram.com/oauth/access_token",JSON.stringify({
                client_id:process.env.INSTAGRAM_CLIENTID ,
                client_secret:process.env.INSTAGRAM_CLIENT_SECRET,
                grant_type:'authorization_code',
                redirect_uri:"https://localhost:3000/instagaram-redirect/",
                code:tw_token
            }), config).then((result) => {
                logger.info(result)
                res.send(result)
            }).catch((err) => {
                console.log(err)
                logger.error(err)
                res.send(err)
            });
        }else{
            res.statusCode =500
            res.send("Twitter token not available")
        }
    },
    validatePin_Token : function(req, res){
        const logger = winston.get('Store_OAuthToken.js')
        logger.info("Soon will be implemented")         
    }
}