require("dotenv").config();

const winston = require("winston").loggers
var request = require('request');
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
            var options = {
              'method': 'POST',
              'url': 'https://api.instagram.com/oauth/access_token',
              formData: {
                'client_id': process.env.insta_client_id,
                'client_secret': process.env.insta_client_secret,
                'grant_type': 'authorization_code',
                'redirect_uri': 'https://localhost:3000/instagaram-redirect/',
                'code': tw_token
              }
            };
            request(options, function (error, response) {                 
              if (error) {
                  logger.error(error);
                  res.statusCode = 200;
                  res.json({"error":error.code})
              }
              else {
                let obj = JSON.parse(response.body)
                  res.statusCode = 200;
                  if(obj.access_token !== undefined){
                      res.json({"token":response.body})
                  }else{
                      console.log("errors")
                      res.json({"error":JSON.parse(response.body)})
                  }
              }
            });            
        }else{
            res.statusCode =200
            res.send("Instagram token not available")
        }
    },
    validatePin_Token : function(req, res){
        const logger = winston.get('Store_OAuthToken.js')
        logger.info("Soon will be implemented")         
    }
}