const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
const movie = mongoCollections.movie;
const session = mongoCollections.session;
const bcrypt = require('bcrypt');
let { ObjectId } = require('mongodb');

module.exports = {
    async getSessionDetails(movieId) {
        if (!movieId) throw 'You must provide an id to search for';
        if(typeof(movieId) !== 'string' || id == null) throw 'You must provide a correct id for movie to book tickets';
        const sessionCollection = await session();
        const sessionList = await sessionCollection.find({movieId: movieId}).toArray();
        if (!sessionList) throw 'No session in system with the id';
        const showTimes, showDate = [];
        for(let s of sessionList) {
            showTimes.push(s.showTimes);
            showDate.push(s.showDate);
        }
        return {
            showTimes: showTimes,
            showDate: showDate
        };
    },

    async getSessionSeat(movieId, showDate, showTimes) {
        if (!movieId || !showDate || !showTimes) throw 'You must provide movieId, showDate and showTimes to search for seatTable';
        if(typeof(movieId) !== 'string' || id == null) throw 'You must provide a correct id for movie to book tickets';
        const sessionCollection = await session();
        const s = await sessionCollection.find({movieId: movieId, showDate: showDate, showTimes: showTimes}).toArray();
        if (!s) throw 'No session in system with the the filter';
        const {seat, price, roomNumber} = s;
        return seat;
    },

    async updateMovieSell(movieId) {
        if (!movieId) throw 'You must provide an id to search for';
        if(typeof(movieId) !== 'string' || id == null) throw 'You must provide a correct id for movie to book tickets';
        const movieCollection = await movie();
        const updateInfo = await movieCollection.findOne({id: movieId}).selledTicket++;
        return updateInfo;
    },

    async updateSeat(movieId, showDate, showTime) {
        if (!movieId || !showDate || !showTime) throw 'You must provide the needed information to update seat information';
        if(typeof(movieId) !== 'string' || id == null) throw 'You must provide a correct id for movie to book tickets';
    },

	async updateHistoryPlay(sessionId,) {
		const userCollection = await users();
		const newPlay = {
			sessionId: sessionId,
            movieId: movieId
        }
        //待修改
        const insertInfo = await userCollection.findOne({userName: userName}).historyPlay.push(newPlay);
        return insertInfo;
    }    
}