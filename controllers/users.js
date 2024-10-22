const User=require("../models/user");

// signup form route
module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
};

// signup route
module.exports.signup=async(req,res)=>{
    // try and catch used for we will constant on signup page only get flash message
    try{
        let{username, email, password}=req.body;
        const newUser=new User({email,username});
        const registerUser=await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

// login form
module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs"); 
};

// login route
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wanderlust!");
    // if we direct login from main page then we redirect on main page
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// logout route
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
};