const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');

module.exports = {
	async login(userName){
		const userCollection = await users();
		let user = userCollection.findOne({userName: userName})
		if(user){
			return user
		}else{
			return 'no user with this username'
		}
	},
	async getById(id){
		let parsedId = ObjectId(id)
		let user = {};
		const userCollection = await users();
		user = userCollection.findOne({_id: parsedId})
		return user
	},
	async update(id, updateInfo){
		let parsedId = ObjectId(id)
		const userCollection = await users();
		const newUser = {};
		if (updateInfo.firstName){
			newUser.firstName = updateInfo.firstName
		};
		if (updateInfo.lastName){
			newUser.lastName = updateInfo.lastName
		};
		if (updateInfo.Email){
			newUser.Email = updateInfo.Email
		};
		if (updateInfo.Gender){
			newUser.Gender = updateInfo.Gender
		};
		if (updateInfo.DateOfBirthDay){
			newUser.DateOfBirthDay = updateInfo.DateOfBirthDay
		};
		if (updateInfo.DateOfBirthMonth){
			newUser.DateOfBirthMonth = updateInfo.DateOfBirthMonth
		};
		if (updateInfo.DateOfBirthYear){
			newUser.DateOfBirthYear = updateInfo.DateOfBirthYear
		};
		if (updateInfo.Password){
			newUser.Password = updateInfo.Password
		};
		if (updateInfo.userName){
			newUser.userName = updateInfo.userName
		};
		const userGo = userCollection.findOne({_id: parsedId});
    	
    	const updatedInfo = await userCollection.updateOne(
      		{ _id: parsedId },
      		{ $set: newUser }
    	);
    	if (updatedInfo.modifiedCount === 0) {
      		throw 'could not update book successfully';
    	}
		return await this.getById(id);
	}
}
