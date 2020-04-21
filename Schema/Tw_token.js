const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

let Token = new Scehma({
    expires : {type: String, required: [true, "First Name is required"]},//Tue, 31 Mar 1981 05:00:00 GMT
    oauth_token : {type: String},//7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4&
    oauth_token_secret : {type: String}//PbKfYqSryyeKDWz4ebtY3o5ogNLG11WJuZBc9fQrQo
})

exports.module = Token