const winstonConfig = require('./loggerconfig');
const winston = require('winston').loggers;

module.exports.configLoggerCategories = function(){
    winston.add('database.js', winstonConfig.createLoggerConfig('database.js'));
    winston.add('server.js', winstonConfig.createLoggerConfig('server.js'))
    winston.add('OAuthTokenController.js', winstonConfig.createLoggerConfig('OAuthTokenController.js'))
    winston.add('Store_OAuthToken.js', winstonConfig.createLoggerConfig('Store_OAuthToken.js'))
}