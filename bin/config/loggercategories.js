const winstonConfig = require('./loggerconfig');
const winston = require('winston').loggers;

module.exports.configLoggerCategories = function(){
    winston.add('database.js', winstonConfig.createLoggerConfig('database.js'));
    winston.add('userController.js', winstonConfig.createLoggerConfig('userController.js'))
}