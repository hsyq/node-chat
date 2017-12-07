const db = require('./db.js');
const User = require('./User.js');
const Chat = require('./Chat.js');


var liubei = new User({'username':'刘备','pwd':"123456"});
liubei.save(function(err){
	console.log('chenggong');
});

User.findUserByUsername('cacao',function(err,result){
	console.log(result);
});