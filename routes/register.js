const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/', function(req, res, next) {
	res.render('register');	
});

router.post('/',function(req,res,next){
	const username = req.body.username;
	const pwd = req.body.pwd;
	User.findUserByUsername(username,function(err,result){
		if(err){
			res.send(500);
			req.session.error =  '网络异常错误!';
			console.log('网络异常错误!');
			console.log(err);
		}else if(!result){
			console.log(result);
			console.log('用户名已经存在!');
			req.session.error = '用户名已经存在!';
			res.sendStatus(500);
		} else {
			const user = {'username':username,'pwd':pwd};
			User.create(user,function(err){
				if(err){
					res.send(500);
					console.log(err);
				}
				console.log('用户注册成功!');
				req.session.error = '用户注册成功!'	;
				res.send(200);
			});
		}

	});
	
	
});

module.exports = router;
