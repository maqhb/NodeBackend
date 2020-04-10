const mongoose = require("mongoose");
const Scehma = mongoose.Schema;

const Tw_Token = require("./Tw_token")
const Fb_Token = require("./Fb_token")
const Pin_Token = require("./Pin_token")
const Inst_Token = require("./Inst_token")

let oAuthTokens = new Scehma({
    userId : {type: mongoose.Types.ObjectId, required: [true, "Registerd User Id is required"], unique:true},
    fb_token : {type: Fb_Token},
    tw_token : {type: Tw_Token},
    pin_token : {type: Pin_Token},
    inst_token : {type: Inst_Token}
})

module.exports = mongoose.model("OAuthTokons", oAuthTokens)