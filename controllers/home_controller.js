module.exports.home=function(req , res){
 //   return res.end('<h1>EXPRESS CONTROLLER IN ACTION</h1>');
 //show the cookies before rendering page on request
 /*console.log(req.cookies);//displays all the cookies present at the time of request
 res.cookie('user_id' , 10000); //changing cookie value on request
 console.log(req.cookies);*/

 return res.render('home.ejs' , {
     title:"Home"
 });

}

console.log('this is the exports for controllers' , module.exports);