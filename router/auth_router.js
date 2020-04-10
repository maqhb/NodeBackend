const express = require("express");

const tokenValidator = require("../lib/Auth")
const userController = require("../Controller/UserController");
const oAuthTokensController = require("../Controller/OAuthTokensController")

const router = express.Router();

router.post("/authenticateUser/",userController.authenticateUser)

router.post("/createUser/", userController.registerUser)

//Setting tokens
router.post("/fb_token/",tokenValidator.postWithAuth ,oAuthTokensController.setFb_Token)

router.post("/tw_token/",tokenValidator.postWithAuth,oAuthTokensController.setTw_Token)

router.post("/inst_token/" ,tokenValidator.postWithAuth,oAuthTokensController.setInst_Token)

router.post("/pin_token/",tokenValidator.postWithAuth ,oAuthTokensController.setPin_Token)

//Getting tokens
router.get("/fb_token/:userId",tokenValidator.getWithAuth ,oAuthTokensController.getFb_Token)

router.get("/tw_token/:userId/",tokenValidator.getWithAuth,oAuthTokensController.getTw_Token)

router.get("/inst_token/:userId/",tokenValidator.getWithAuth ,oAuthTokensController.getInst_Token)

router.get("/pin_token/:userId",tokenValidator.getWithAuth,oAuthTokensController.getPin_Token)

module.exports = router