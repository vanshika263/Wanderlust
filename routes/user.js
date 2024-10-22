const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// for creating new user in database
const User=require("../models/user.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");

// first route
router.route("/signup")
// signup form route
.get(userController.signupForm)
// signup route
.post(wrapAsync(userController.signup));

// second route
router.route("/login")
// login form route
.get(userController.loginForm)
// login route
.post(saveRedirectUrl,passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

// logout route
router.get("/logout",userController.logout);

module.exports=router;