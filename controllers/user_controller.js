//we will need this model for creation
const User=require('../models/user');

//this is the controller for users
module.exports.profile=function(req , res){
    //return res.end('<h1>User Profile</h1>');
    return res.render('user_profile.ejs' , {
        title:"USERS"
    });
}
//we are now going to define 2 actions that will be exported and used for
//sign in and sign up pages , rendering sign in and sign up pages respectively

module.exports.signIn=function(req , res){
    //restricting access to sign in page when user is signed in(authenticated)
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }    
    return res.render('user_sign_in.ejs', {
        title:"Codeial | SIGN IN"
    });
};

//note that render will directly look into views folder as defined in index.js

module.exports.signUp=function(req , res){

    //not accessible if you are already signed in(authenticated)
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up.ejs' , {
        title:"Codeial | SIGN UP"
    });


};

//NOTE THAT THE SEMICOLONS ARE OPTIONAL , BETTER PUT IT

//this is to get the data on creation sign up ie;
module.exports.create=function(req , res){
    //TO DO we will now do some actions on sign up
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
        //not matching 
    }
    User.findOne({email:req.body.email} , function(err , user){
        if(err){console.log('error in finding the user'); return; }

        //if user is not found then you have to create
        if(!user){
            User.create(req.body , function(err , user){
                if(err){console.log('error in creating user in database');return;}
                else{
                    return res.redirect('/users/sign-in');
                    //user created means redirected to sign in page
                }
            });
        }
        else{
            return res.redirect('back');
            //user already exists
        }
    });
};

//action with data you get during sign in
module.exports.createSession=function(req , res){
    //this is now handled by passport.js
    return res.redirect('/');
    //after sign in you are taken to the home page
};

//action to sign out
module.exports.destroySession=function(req , res){
    req.logout();  //provided by passport
    return res.redirect('/');
};