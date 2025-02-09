
const User = require('../models/user');

module.exports.signupget = (req,res) =>{
    res.render("users/signup.ejs");
};
module.exports.signuppost = async(req,res) =>{
    try{
        let{username,email,password} = req.body;
        const newuser = new User({email,username});
        const registeruser = await User.register(newuser,password);
        console.log(registeruser);
        req.login(registeruser,(err) => {
            if (err) { 
                return next(err); 
            }
            req.flash("success","you successfully signed in to wonderlust")
            res.redirect("/test");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginget = (req,res) =>{
    res.render("users/login.ejs");
};

module.exports.loginpost = async(req,res) =>{
    req.flash("success","you successfully logged in to wonderlust")
    let redirectUrl = res.locals.redirectUrl || "/test";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) =>{
    req.logout((err) =>{
        if (err) { 
            return next(err); 
        }
        req.flash("success","you successfully Logged out to wonderlust")
        res.redirect("/test");
    })
};