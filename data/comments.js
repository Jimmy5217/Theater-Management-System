const mongoCollections = require('../config/mongoCollections')
const comments = mongoCollections.comments;

module.exports = {
	async creatComment(userName, movieName, content, rating){
		const commentscollection = await comments();
		const newcomment = {
			userName: userName,
			movieName: movieName,
			content: content,
			rating: rating
		}
		const insertInfo = await commentscollection.insertOne(newcomment);
		if (insertInfo.insertedCount === 0) throw 'Could not creat new book';
   		return insertInfo;
	},
	async getAll(userName){
		const commentscollection = await comments();
		let commentsList = []
		commentsList = await commentscollection.find({userName: userName}).toArray()
		return commentsList
	}
}
