const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

let Fb_Token = new Scehma({
    expires_in : {type: Number, required: [true, "Expiry time is required"]},//5183944
    token_type : {type: String, required: [true, "Type of token must be defined"]},//bearer
    oauth_token_secret : {type: String}//asdadawdasdawasdadawdasdawasdadawdasdawasdadawdasdaw
})

exports.module = Fb_Token