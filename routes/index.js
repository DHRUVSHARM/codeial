//this is the entry point of the routes
const express=require('express');  //not loaded again

const router=express.Router();
const homeController=require('../controllers/home_controller.js');

console.log('entry point router loaded !!!!');

router.get('/' , homeController.home);
router.use('/comments' , require('./comments'));
router.use('/users' , require('./users.js'));
router.use('/posts', require('./posts'));


module.exports=router;

//console.log('for router' , module.exports);