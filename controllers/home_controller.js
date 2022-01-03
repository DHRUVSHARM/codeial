const Post=require('../models/post');

module.exports.home=function(req , res){
 //   return res.end('<h1>EXPRESS CONTROLLER IN ACTION</h1>');
 //show the cookies before rendering page on request
 //console.log(req.cookies);
 //res.cookie('user_id' , 1233); //changing cookie value on request
 //console.log(req.cookies);
//we want to display all the posts on the home page
/*
Post.find({} , function(err , posts){
//finds all posts and displays them on home page by passing them as context for views
 return res.render('home.ejs' , {
    title:"Codeial | Home",
    posts:posts
});

});

*/
//prepopulating the db with the help of referenced object user in posts
Post.find({}).
populate('user').
populate({
//also populating the comment model
path:'comments',
//each id in comments is referenced and used to populate further and show comments for
//each post
populate:{
    path:'user'
    //nested populate to get author of each comments on post
}


}).
exec(function(err , posts){
    return res.render('home.ejs' , {
        title:"Codeial | Home",
        posts:posts
    });
});

}

console.log('this is the exports for controllers' , module.exports);