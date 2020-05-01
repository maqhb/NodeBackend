const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

let Inst_Token = new Scehma({
    basic_token:{
        access_Token : {type: String},//7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4&
        token_type : {type: String},
        expires_in: {type:Number},//Tue, 31 Mar 1981 05:00:00 GMT
        userId : {type: String}//du3ridp3iooirpr3iur89089
    },
    graph_token:{
        access_Token : {type: String},//7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4&
        token_type : {type: String},
        expires_in: {type:Number},//Tue, 31 Mar 1981 05:00:00 GMT
        userId : {type: String}//du3ridp3iooirpr3iur89089
    }
})

exports.module = Inst_Token