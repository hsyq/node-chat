const express = require('express');
const router = express.Router();
const allUser = [];
router.post('/', function(req, res, next) {
	
	const username = req.body.username;
	const pwd = req.body.pwd;
	// User.save(username,pwd);	
	if(!username){
		res.send('用户名不能为空!');
	}
	if(!pwd){
		res.send('密码不能为空!');
	}
	
	if(allUser.indexOf(username) != -1){
		res.send("用户名已经被占用");
		return;
	}
	allUser.push(username);
	console.log(allUser);
	console.log(req.session);
	req.session.user = username;
	//console.log(res.session.user);
	res.redirect("/chatroom");
});

module.exports = router;
