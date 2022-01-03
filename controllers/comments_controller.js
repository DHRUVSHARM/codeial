const Comment=require('../models/comment');
const Post=require('../models/post');
const mongoose=require('mongoose');

module.exports.create=function(req , res){
    //firstly we will verify if the post id sent is exisisting in database
   // req.body.post.trim();


 //   var postId=mongoose.Types.ObjectId(req.body.post);

    //console.log(postId);

    Post.findById(req.body.post, function(err , post){

         
    
        

        if(err){console.log("check error here" , err);return;}

        if(post){

            console.log(post);
            //means post is found , so we will add post id , user id to comments
            Comment.create(
                {
                    content:req.body.content,
                    user:req.user._id,
                    post:req.body.post
                },
                function(err , comment){
                    if(err){
                        console.log('error in creating comment ');
                        return;
                    }
                    //now we will add the comment id to the array comments in post
                    console.log(comment);
                    
                    console.log(post.comments);
                    post.comments.push(comment._id);
                    //mongoose has this to add id of comment to comments array in post
                    post.save();
                    //saving after updating   
                    
                    return res.redirect('/');
                }
            );
        }
    });
};