const winston = require("winston")

const DEFAULT_CATEGORY = 'DEFAULT';

function createLoggerConfig(category) {
     return {
         level: 'info',
         transports: [
             new winston.transports.Console()
         ],
         format: winston.format.combine(
             winston.format.label({
                 label: category
             }),
             winston.format.timestamp(),
             winston.format.printf((info) => {
                 return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
             })
         )
     };
 }
winston.loggers.add(DEFAULT_CATEGORY, createLoggerConfig(DEFAULT_CATEGORY));

module.exports.defaultLogger = winston.loggers.get(DEFAULT_CATEGORY);

module.exports.createLoggerConfig = createLoggerConfig;