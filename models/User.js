const mongoose = require('mongoose');
const db = require('./db.js');

const userSchema = new mongoose.Schema({
	username:String,
	pwd:String
});

// 根据用户名查找用户
userSchema.statics.findUserByUsername = function(username,callback){
	this.model('User').find({username:username},callback);
}

const userModel = db.model('User',userSchema);
module.exports = userModel;