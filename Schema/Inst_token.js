const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

let Inst_Token = new Scehma({
    userId : {type: String},//Tue, 31 Mar 1981 05:00:00 GMT
    accessToken : {type: String}//7588892-kagSNqWge8gB1WwE3plnFsJHAZVfxWD7Vb57p0b4&
})

exports.module = Inst_Token