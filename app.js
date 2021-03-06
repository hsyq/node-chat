const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const index = require('./routes/index.js');
const register = require('./routes/register.js');
const check = require('./routes/check.js');
const chatroom = require('./routes/chatroom.js');

app.set('view engine','ejs');

// 日志
// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //设置为false取不到body参数


app.use(cookieParser());
app.use(session({
    secret: 'kitty',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('./public'));

app.use('/',index);
app.use('/register',register);
app.use('/check',check);
app.use('/chatroom',chatroom);

io.on('connection',function(socket){
	socket.on('client',function(msg){
		//console.log(msg);
		io.emit('client',msg);
	});
});

http.listen(3000);
console.log('Server is running at 127.0.0.1:3000');