const express=require('express');
const passport = require('passport');
const router=express.Router();

const postsController=require('../controllers/posts_controller');

router.post('/create' , passport.checkAuthentication , postsController.create);
//used function created with passport as middleware to make sure that only authenticated
//users can make post

module.exports=router;