const mongoose = require('mongoose');
const db = require('./db.js');

const chatSchema = new mongoose.Schema({
	uid:Number,
	content:String,
	time:Date
});

const chatModel = db.model('Chat',chatSchema);

module.exports = chatModel;