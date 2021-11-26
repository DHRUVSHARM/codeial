//this is the entry point of the routes
const express=require('express');  //not loaded again

const router=express.Router();
const homeController=require('../controllers/home_controller.js');

console.log('router loaded !!!!');

router.get('/' , homeController.home);

module.exports=router;

console.log('for router' , module.exports);