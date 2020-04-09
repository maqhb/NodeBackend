require("dotenv").config();

const jwt = require("jsonwebtoken")
const mySecret = process.env.SECRET;

const withAuth = function(req, res, next){
    const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

    if(token){
        jwt.verify(token, mySecret, function(error, decoded){
            if(error){
                res.statusCode = 505
                res.send("Unauthorization: Token is not valid")
            }else{
                //add id in request 
                req.email = decoded;
                req.body.userId = 
                next();
            }
        })
    }else{
        res.send("Unauthorization: Token is not available")
    }
}

module.exports = withAuth;