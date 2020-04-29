require("dotenv").config();

const jwt = require("jsonwebtoken")
const mySecret = process.env.JWTSECRET;

getWithAuth = function(req, res, next){
    const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
    if(token){
        jwt.verify(token, mySecret, function(error, decoded){
            if(error){
                res.statusCode = 500
                res.send("Unauthorization: Token is not valid")
            }else{
                if(req.params.userId === decoded.id){
                    next()
                }else{
                    res.statusCode = 500
                    res.send("Unauthorization: Parameters does not match token data")
                } 
            }
        })
    }else{
        res.send("Unauthorization: Token is not available")
    }
}

postWithAuth = function(req, res, next){
    const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
    res.setHeader("Content-Type", "application/json");
    if(token){
        jwt.verify(token, mySecret, function(error, decoded){
            if(error){
                res.statusCode = 200
                res.json({"error":{"Unauthorization": "Token is not valid"}})
            }else{
                if(req.body.userId === decoded.id){
                    next()
                }else{
                    res.statusCode = 200
                    res.json({"error":{"Unauthorization": "Parameters does not match token data"}})
                }
            }
        })
    }else{
        res.statusCode = 200
        res.json({"error":{"Unauthorization": "Token is not available"}})
    }
}

module.exports = {getWithAuth, postWithAuth};