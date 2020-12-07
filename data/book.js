const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
const movie = mongoCollections.movie;
const session = mongoCollections.session;
const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');
const saltRounds = 16;

module.exports = {
	async updateHistoryPlay(sessionId, movieId, userName) {
		const userCollection = await users();
		const newPlay = {
			sessionId: sessionId,
			movieId: movieId
        }
        //待修改
        const insertInfo = await userCollection.findOne({userName: userName}).historyPlay.push(newPlay);
        return insertInfo;
    },

    async updateMovieSell(movieId) {
        const movieCollection = await movie();
        const updateInfo = await movieCollection.findOne({movieId: movieId}).selledTicket ++;
        return updateInfo;
    },

    async updateSeat(sessionId) {
        // updateSeat
    }
}