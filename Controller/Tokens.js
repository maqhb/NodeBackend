require("dotenv").config();
const winston = require("winston").loggers

var Promise = require("bluebird").Promise
var request = Promise.promisify(require("request"));

module.exports = {
    async getInstLongToken(accessToken){
        const logger = winston.get('Store_OAuthToken.js')
        var options = {
            'method': 'GET',
            'url': 'https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret='+process.env.insta_client_secret+'&access_token='+accessToken,
            'headers': {
              'Cookie': 'ig_did=A84700C1-3F60-40B1-9CEA-359756734FEB; csrftoken=IaeKIYzzYxjqsRcazHAP8aJFHVfG8a2u; mid=Xpdr7AAEAAGx2C9U0uSFk7pxiv0V'
            }
          };
        return request(options).then((response, error)=>{
            if (error){
                logger.error(error)
                return {}
            }else{
                let obj = JSON.parse(response.body)
                return obj
            }
        }).catch((error)=>{
            logger.error(error);
            return {}
        })
    }
}