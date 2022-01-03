//this is the entry point of the project 
const express=require('express');
//for handling cookies 
const cookieParser=require('cookie-parser');
const app=express();   //firing up the server
const port=8000;
const expressLayouts=require('express-ejs-layouts');//will import this functionality
const db=require("./config/mongoose");

//importing required functionality for authentication using passport.js
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

//library to store the session data permanently so that it does not get lost
//on refreshing
const MongoStore=require('connect-mongo');//session is our express session 
//middleware to use convert sass to css
const sassMiddleware=require('node-sass-middleware');


//middleware to convert sass to css
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
//for post requests
app.use(express.urlencoded( {extended:true}) );
//for cookie parsing
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

//used to extract scripts and styles from subpages to layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



//setting the view engine and the views folder path
app.set('view engine' , 'ejs');
app.set('views' , './views');

//using a midddleware to handle sessions
//step: setting up the session cookie and it's encryption
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    //to set up monog store to store session data in db
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codeial_development',
            autoRemove:'false'    
        },
        
        function(err){console.log(err || 'mongo store ok!!');}
    )
}));
//start using passport
app.use(passport.initialize());
//start using express sessions
app.use(passport.session());

//before going to any of the routes as middleware we will use a setter to
//make the session data available in locals

app.use(passport.setAuthenticatedUser);

//middleware for route handling
app.use('/' , require('./routes'));  //this will go to the index of routes

app.listen(port , function(err){
    if(err){
        //interpolation used
        console.log(`the error is: ${err}`);
        return;
    }
    console.log(`the server is up and running on port number: ${port} `);
    //whatever in dollar sign even 2+2 is evaluated and shown
});

