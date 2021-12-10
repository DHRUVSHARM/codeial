//we will need this model for creation
const User=require('../models/user');

//this is the controller for users
module.exports.profile=function(req , res){
    //return res.end('<h1>User Profile</h1>');
    /*return res.render('user_profile.ejs' , {
        title:"USERS"
    });*/

    //only authorized users can access this page; ie if they have completed the sign in
    //successfully

    if(req.cookies.user_id){
        //cookies are present of this name
        //find if user exists
        User.findById(req.cookies.user_id , function(err , user){
            if(err){console.log('error in finding the user from database based on id');return;}
            if(user){
                //user found , so we will render the profile page with the users details
                return res.render('user_profile.ejs' , {
                    title:'USERS PROFILE',
                    user:user
                });
            }
            else{
                //corrupt cookie , user not found based on it's value
                return res.redirect('/users/sign-in');
            }
        });
    }
    else{
        //no cookie of this name present , therefore redirect to sign in
        return res.redirect('/users/sign-in');
    }
};
//we are now going to define 2 actions that will be exported and used for
//sign in and sign up pages , rendering sign in and sign up pages respectively

module.exports.signIn=function(req , res){
    return res.render('user_sign_in.ejs', {
        title:"Codeial | SIGN IN"
    });
};

//note that render will directly look into views folder as defined in index.js

module.exports.signUp=function(req , res){
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
        //not matching passwords entered during sign up,thus redirect back
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
                    //this means that the user has been successfully created
                }
            });
        }
        else{

            //this means user exists , the unique key used to recognize a user in the
            //database is the email as we are using find by email id
            return res.redirect('back');
            //user already exists , so go back dont create it
        }
    });
};


//action with data you get during sign in
module.exports.createSession=function(req , res){
    console.log("here!!!");
    //find the user for authentication , the key used is the email from request
    User.findOne({email:req.body.email} , function(err , user){

        if(err){console.log('error in finding the user in the database');return;}
        //now if you find the user
        if(user){
            //case 1 :user password entered is not matching
            if(user.password!=req.body.password){
                return res.redirect('back');
            }
            //if above is not true , create session
            res.cookie('user_id' , user.id);
            return res.redirect('/users/profile');
        }
        else{
            //user is not found 
            return res.redirect('back');
        }
    });
    

 
};

//controller for signing out
module.exports.signOut=function(req , res){
    //this is where you will control the action after clicking the sign out button
    //now the way we had designed initially was that we had a cookie user_id
    //which was created(if not there)or modified whenever we signed in with the 
    //id of the user in the database. this happens everytime a sign in is done and we
    //rendered the profile page
    //so now we will remove the user id cookie first
    console.log(req.cookies);//shows the id of the user logged in
    res.cookie('user_id' , -1);//reseting to a null value
    return res.redirect('/users/sign-in');
};