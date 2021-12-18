//here we will start by setting up passport
const passport=require('passport');
//now we will import the strategy
const LocalStrategy=require('passport-local').Strategy;
//used as middleware
const User=require('../models/user');
//authentication using passport , sign in ie;
passport.use(new LocalStrategy({
    //here we will set the key
    usernameField:'email'
},
function(email , password , done){
    //this is the verify user function , we will find and verify the user
    User.findOne({email:email} , function(err , user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }
        if(!user || user.password!=password){
            //wrong password entered or user not found in the database 
            console.log('invalid username/password');
            return done(null , false);
        }
        //user found
        return done(null , user);
    });

}

));

//function to serialize user , ie; to decide what to use to create session cookie
passport.serializeUser(function(user , done){
    done(null , user.id);
});

//function to deserialize user ; to get the user from browser on it's request
passport.deserializeUser(function(id , done){
    User.findById(id , function(err , user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }
        //if(user){
            //user is found
            return done(null , user);
        //}
        //not required as this is already covered in passport.use
        /*//user is not found
        return done(null , false);*/
    });
});

//function to check user if authentication is complete
passport.checkAuthentication=function(req , res , next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
};

//function to send the session cookie data during request to the response locals for views
passport.setAuthenticatedUser=function(req , res , next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }

    return next();
};

module.exports=passport;