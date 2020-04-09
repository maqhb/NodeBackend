const express = require("express");

const withAuth = require("../lib/Auth")
const userController = require("../Controller/UserController");
const oAuthTokensController = require("../Controller/OAuthTokensController")

const router = express.Router();

router.post("/authenticateUser/",userController.authenticateUser)

router.post("/createUser/", userController.registerUser)

//Setting tokens
router.post("/fb_token/",withAuth ,oAuthTokensController.setFb_Token)

router.post("/tw_token/",oAuthTokensController.setTw_Token)

router.post("/inst_token/" ,oAuthTokensController.setInst_Token)

router.post("/pin_token/",withAuth ,oAuthTokensController.setPin_Token)

//Getting tokens
router.get("/fb_token/:userId",withAuth ,oAuthTokensController.getFb_Token)

router.get("/tw_token/:userId/",oAuthTokensController.getTw_Token)

router.get("/inst_token/:userId/" ,oAuthTokensController.getInst_Token)

router.get("/pin_token/:userId",withAuth ,oAuthTokensController.getPin_Token)

module.exports = router