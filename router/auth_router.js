const express = require("express");

const tokenValidator = require("../lib/Auth")
const userController = require("../Controller/UserController");
const oAuthTokensController = require("../Controller/OAuthTokensController")
const validate_OAuthToken = require("../Controller/Validate_OAuthToken")

const router = express.Router();

router.post("/authenticateUser/",userController.authenticateUser)

router.post("/createUser/", userController.registerUser)

//Validating OAUTH token from platforms like FB,TW
router.post('/validate_fb_token/',tokenValidator.postWithAuth, validate_OAuthToken.validateFb_Token)
router.post('/validate_tw_token/',tokenValidator.postWithAuth, validate_OAuthToken.validateTw_Token)
router.post('/validate_inst_token/',tokenValidator.postWithAuth, validate_OAuthToken.validateInst_Token)
router.post('/validate_pin_token/',tokenValidator.postWithAuth, validate_OAuthToken.validatePin_Token)


//Setting tokens
router.post("/fb_token/",tokenValidator.postWithAuth ,oAuthTokensController.setFb_Token)

router.post("/tw_token/",tokenValidator.postWithAuth,oAuthTokensController.setTw_Token)

router.post("/basic_inst_token/" ,tokenValidator.postWithAuth,oAuthTokensController.set_Basic_Inst_Token)

router.post("/pin_token/",tokenValidator.postWithAuth ,oAuthTokensController.setPin_Token)

//Getting tokens
router.get("/get_tokens/:userId",tokenValidator.getWithAuth ,oAuthTokensController.getOAuthTokens)

router.get("/fb_token/:userId",tokenValidator.getWithAuth ,oAuthTokensController.getFb_Token)

router.get("/tw_token/:userId/",tokenValidator.getWithAuth,oAuthTokensController.getTw_Token)

router.get("/basic_inst_token/:userId/",tokenValidator.getWithAuth ,oAuthTokensController.get_Basic_Inst_Token)

router.get("/pin_token/:userId",tokenValidator.getWithAuth,oAuthTokensController.getPin_Token)

module.exports = router