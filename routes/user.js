const express = require("express");
const router = express.Router();
const wrapasync = require("../utility/wrapasync.js");
const passport = require("passport");
const usercollector = require("../collector/user.js");


const saveredirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
       res.locals.redirectUrl= req.session.redirectUrl; 
    }
    next();
};

// sign up
router.get("/signup",usercollector.signupget);
router.post("/signup",wrapasync(usercollector.signuppost));

// login
router.get("/login",usercollector.loginget);
router.post("/login",saveredirectUrl,passport.authenticate("local",{failureFlash: true , failureRedirect :"/login"}),usercollector.loginpost );

router.get("/logout",usercollector.logout);

module.exports = router;