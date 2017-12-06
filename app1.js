const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const index = require('./routes/index.js');
// const check = require('./routes/check.js');
const chatroom = require('./routes/chatroom.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //设置为false取不到body参数

app.use(cookieParser());
app.use(session({
    secret: 'kitty',
    resave: false,
    saveUninitialized: true
}));
app.set('view engine','ejs');

app.use(express.static('./public'));

app.use('/',index);
app.post('/check', function(req, res, next) {
	const allUser = [];
	const username = req.body.username;
	const pwd = req.body.pwd;
	// User.save(username,pwd);	
	if(!username){
		res.send('用户名不能为空!');
	}else if(!pwd){
		res.send('密码不能为空!');
	}else if(allUser.indexOf(username) != -1){
		res.send("用户名已经被占用");
		return;
	}

	req.session.user = username;
	console.log(req.session);
	console.log(res.session.user);
	//res.redirect("/chatroom");
});

app.use('/chatroom',chatroom);

io.on('connection',function(socket){
	socket.on('client',function(msg){
		//console.log(msg);
		io.emit('client',msg);
	});
});

http.listen(3000);
console.log('Server is running at 127.0.0.1:3000');