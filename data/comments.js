const mongoCollections = require('../config/mongoCollections')
const comments = mongoCollections.comments;

module.exports = {
	async creatComment(userId, movieId, content, rating){
		const commentscollection = await comments();
		const newcomment = {
			userId: userId,
			movieId: movieId,
			content: content,
			rating: rating
		}
		const insertInfo = await commentscollection.insertOne(newcomment);
		if (insertInfo.insertedCount === 0) throw 'Could not creat new book';
   		return insertInfo;
	}
}
