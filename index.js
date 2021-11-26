//this is the entry point of the project 
const express=require('express');
const app=express();   //firing up the server
const port=8000;

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

