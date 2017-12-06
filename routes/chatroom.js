const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
	//这个页面必须保证有用户名了，
	if(!req.session.user){
		res.redirect("/");
		return;
	}
	res.render("chatroom",{
		"user" : req.session.user
	});
});

module.exports = router;
