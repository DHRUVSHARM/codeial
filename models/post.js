//creating a schema for posts
const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //array of object ids to help get the query of all comments on a post
    comments:{
        type:mongoose.Schema.Types.Array,
        ref:'Comment'
    }
},
{
    timestamps:true
}
);

const Post=mongoose.model('Post' , postSchema);
module.exports=Post;