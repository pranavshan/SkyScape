const express = require("express")
const router = express.Router()
const wrapAsync = require("../utilis/wrapAsync.js")
const passport = require("passport")
const {saveRedirectUrl} = require("../middleware.js")
const userController = require("../controller/user")

router.route("/signup")
.get(userController.rendersignUpForm)
.post(wrapAsync(userController.signup));


router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", { 
    failureRedirect:'/login', 
    failureFlash: true }),
    userController.login
);


router.get("/logout",userController.logout);

module.exports = router