const mongoose = require('mongoose');
//创建数据库连接
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/chatroom');

db.on('error', function(error) {
    console.log(error);
});
//监听open事件
db.once('opne',function(err){
    if(err){
        console.log(err);
    }
    console.log('数据库连接成功');
});

module.exports = db;
