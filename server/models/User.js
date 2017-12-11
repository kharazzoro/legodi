const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// User Schema
const schema = new Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	isAdmin: {
		type: Boolean,
		default: false,

	},
	userDetails:{
		fullName:String,
		address:String,
		imageFile:String,
		graduated:Boolean,
		uniCollege:String,
		currentJob:String
		
	}

});

const User = mongoose.model('users', schema);

module.exports = User;
