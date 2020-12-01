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
	}/*,
	async getInfo(userName){
		const userCollection = await users();
		let user = userCollection.findOne({userName: userName})
		if(user !== null){
			return true
		}else{
			return false
		}
		//return user;
	}*/
}
