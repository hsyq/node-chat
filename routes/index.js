const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/', function(req, res, next) {
		res.render('index');	
});

router.post('/',function(req,res,next){
	const username = req.body.username;
	// console.log(username);
	const pwd = req.body.pwd;
	User.findUserByUsername(username,function(err,result){
		if(err){
		 res.send(500);
		  req.session.error =  '网络异常错误！';
			console.log(err);
		} else if(!result){
			req.session.error = '用户名不存在';
            res.send(404);   //    状态码返回404
            //res.redirect("/login");
		} else {
		    const pwd1 = result[0].pwd;
		    // console.log(result[0]);
		    //console.log(result[0].pwd);
		    if(pwd != pwd1){
		    	req.session.error = "密码错误";
                res.send(404);
		    } else {
		    	 req.session.user = result[0];
                 res.send(200);
		    }
		}
		
		
		
		// console.log(result[0].username);
	});
});

module.exports = router;
