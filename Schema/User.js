require("dotenv").config();

const mongoose = require("mongoose");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

const Scehma = mongoose.Schema;
const myPassSecret = process.env.PASSSECRET;
const myJWTSecret = process.env.JWTSECRET;

let UserSchema = new Scehma({
    firstName : {type: String, required: [true, "First Name is required"]},
    lastName : {type: String, required: [true, "Second name is required"]},
    email : {type: String, required: [true, "Email is required"], unique: true},
    password : {
        type: String,
        required: [true, "Password is required"],
    }
})


//Used to encrpyted password in the databse and called before executing the save method
UserSchema.methods.doPasswordEncrytion = function(password){
    this.password = crypto.pbkdf2Sync(password, myPassSecret ,1000, 512, 'sha512'.toString('hex'))
}

//Used to validate the entered password during thee authenticating of the user
UserSchema.methods.doPasswordValidation = function(password){
    var hash = crypto.pbkdf2Sync(password, myPassSecret,1000, 512, 'sha512'.toString('hex'))
    return hash == this.password;
}

UserSchema.methods.generateJWT = function() {
    return jwt.sign({
        email: this.email,
        id: this._id
    }, myJWTSecret, {expiresIn: '1h'});
}
  
UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};


module.exports = mongoose.model("User", UserSchema)