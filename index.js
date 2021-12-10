//this is the entry point of the project 
const express=require('express');
//for handling cookies ie ; reading and writing
const cookieParser=require('cookie-parser');
const app=express();   //firing up the server
const port=8000;
const expressLayouts=require('express-ejs-layouts');//will import this functionality
const db=require("./config/mongoose");

//for post requests
app.use(express.urlencoded());
//for cookie parsing
app.use(cookieParser());
//used as middlewaree

app.use(express.static('./assets'));

app.use(expressLayouts);

//used to extract scripts and styles from subpages to layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//middleware for route handling
app.use('/' , require('./routes'));  //this will go to the index of routes

//setting the view engine and the views folder path
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.listen(port , function(err){
    if(err){
        //interpolation used
        console.log(`the error is: ${err}`);
        return;
    }
    console.log(`the server is up and running on port number: ${port} `);
    //whatever in dollar sign even 2+2 is evaluated and shown
});

