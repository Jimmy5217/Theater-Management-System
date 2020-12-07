const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');
const saltRounds = 16;

module.exports = {
	async register(firstName, lastName, Email, Gender, DateOfBirthDay, DateOfBirthMonth, DateOfBirthYear,
		Password, userName){
		const userCollection = await users();
		//const hashPassword = await bcrypt.hash(Password)
		const newuser = {
			firstName: firstName,
			lastName: lastName,
			Email: Email,
			Gender: Gender,
			DateOfBirthDay:DateOfBirthDay,
			DateOfBirthMonth: DateOfBirthMonth,
			DateOfBirthYear: DateOfBirthYear,
			Password: Password,
			userName: userName,
			isAdmin: false,
			historyPlay:[]
		}
		const insertInfo = await userCollection.insertOne(newuser);
		return insertInfo;
	}
}