module.exports.home=function(req , res){
 //   return res.end('<h1>EXPRESS CONTROLLER IN ACTION</h1>');
 return res.render('home.ejs' , {
     title:"Home"
 });

}

console.log('this is the exports for controllers' , module.exports);