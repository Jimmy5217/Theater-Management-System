const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');
const saltRounds = 16;

module.exports = {
	async register(firstName, lastName, Email, Gender, DateOfBirthDay, DateOfBirthMonth, DateOfBirthYear,
		Password, userName, isAdmin, historyPlay) {
		const userCollection = await users();
		//const hashPassword = await bcrypt.hash(Password)
		if (!isAdmin) isAdmin = false;

		if (!historyPlay) historyPlay = [];

		const newuser = {
			firstName: firstName,
			lastName: lastName,
			Email: Email,
			Gender: Gender,
			DateOfBirthDay: DateOfBirthDay,
			DateOfBirthMonth: DateOfBirthMonth,
			DateOfBirthYear: DateOfBirthYear,
			Password: Password,
			userName: userName,
			isAdmin: isAdmin,
			historyPlay: historyPlay
		}
		const insertInfo = await userCollection.insertOne(newuser);
		return insertInfo;
	},

	async getUser(username) {
		if (!username) throw 'You must provide an username to search for';
		if (typeof (username) !== 'string') throw 'You must provide an username to search for';
		const userCollection = await users();
		try {
			user = await userCollection.findOne({ userName: username });
		} catch (e) {

		}
		return user;
	},
}