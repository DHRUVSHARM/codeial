const express=require('express');
const passport = require('passport');
const router=express.Router();

const userController=require('../controllers/user_controller.js');

router.get('/profile' , passport.checkAuthentication, userController.profile);

router.get('/sign-in' , userController.signIn);
router.get('/sign-up' , userController.signUp);

router.post('/create' , userController.create);

//now handle the sign in route
router.post('/create-session' , passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
) , userController.createSession);

module.exports=router;

router.get('/sign-out' , userController.destroySession);
