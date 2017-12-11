const User = require('../models/User')
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectID;

createUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

getUserByUsername = (username, callback) => {
	const query = { username: username };
	User.findOne(query, callback);
}

getUserById = (id, callback) => {
	User.findById(id, callback);
}

comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if (err) throw err;
		callback(null, isMatch);
	});
}

editProfile = (userId, query, upsertOption, sucessCallBack) => {
    User.update({ "_id": ObjectId(userId) }, query, { upsert: upsertOption }, sucessCallBack);
};

deleteUser= (userId, callback) => {
    User.remove({ "_id": ObjectId(userId) }, callback)
}


module.exports = { createUser, getUserByUsername, comparePassword, getUserById,editProfile,deleteUser}