var axios = require('axios');
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
              'headers': {
                // 'Cookie': 'ig_did=A84700C1-3F60-40B1-9CEA-359756734FEB; csrftoken=IaeKIYzzYxjqsRcazHAP8aJFHVfG8a2u; mid=Xpdr7AAEAAGx2C9U0uSFk7pxiv0V'
              },
              formData: {
                'client_id': '1425289957645624',
                'client_secret': '500e4fcabb6da24823328a86415994e0',
                'grant_type': 'authorization_code',
                'redirect_uri': 'https://localhost:3000/instagaram-redirect/',
                'code': 'AQCQR88F-6Zyd_uGM8siNCvnjMfRDV60pd1h4L8229c-am1nESuQ0-cdf1zjAb4H4PBQUlokT7ngg2lCTa_tz-ATBJQEG8KvUfRFTD2JfPI6wqtpDYN379NNzM_TE-xjkgccHzkGp2ZK7sd5tKO9x_3UGezu_qWK4A9u20Z7tLsYXed8xvaPAgAozrXjTpQbcCqTOUSarqUyGdr31O1RRtnSegGg13KLZHhdq4Ym-bN2_g'
              }
            };
            request(options, function (error, response) { 
              if (error) {
                  logger.error(error);
                  res.statusCode = 400;
                  res.send(error);
              }
              else {
                  logger.info(response);
                  res.statusCode = 200;
                  res.send(response);
              }
              console.log(response.body);
            });
            
        }else{
            res.statusCode =500
            res.send("Instagram token not available")
        }
    },
    validatePin_Token : function(req, res){
        const logger = winston.get('Store_OAuthToken.js')
        logger.info("Soon will be implemented")         
    }
}