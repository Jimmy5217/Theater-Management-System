const mongoCollections = require('../config/mongoCollections')
const users = mongoCollections.users;
const movie = mongoCollections.movie;
const session = mongoCollections.session;
const userData = require('./register');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

module.exports = {
    async getSessionDate(movieId) {
        if (!movieId) throw 'You must provide an id to search for';
        if(typeof(movieId) !== 'string' || movieId == null) throw 'You must provide a correct id for movie to book tickets';
        const sessionCollection = await session();
        const sessionList = await sessionCollection.find({movieId: parseInt(movieId)}).toArray();
        if (!sessionList) throw 'No session in system with the id';
        const dict = {};
        for(let s of sessionList) {
            if (!dict[s.showDate]) {
                dict[s.showDate] = [s.showTimes];
            } else {
                dict[s.showDate].push(s.showTimes);
            }
        }
        return dict;
    },

    async getSessionDetails(movieId, showDate, showTimes) {
        // if (!movieId || !showDate || !showTimes) throw 'You must provide movieId, showDate and showTimes to search for seatTable';
        // if(typeof(movieId) !== 'string' || id == null) throw 'You must provide a correct id for movie to book tickets';
        const sessionCollection = await session();
        const aSession = await sessionCollection.findOne({movieId: parseInt(movieId), showDate: showDate, showTimes: showTimes});
        if (!aSession) throw 'No session in system with the the filter';
        let {seat, price, _id} = aSession;
        //turn seat String to array
        const seatTemp = seat.substr(2, seat.length-4).split('],[');
        const seatResult = [];
        for (let s of seatTemp) {
            seatResult.push(s.split(','));
        }
        return {
            seatResult: seatResult,
            price: price,
            sessionId: _id
        };
    },

    async updateMovieSell(movieId, count) {
        if (!movieId) throw 'You must provide an id to search for';
        if(typeof(movieId) !== 'string') throw 'You must provide a correct id for movie to book tickets';
        const movieCollection = await movie();
        const ticketCount = parseInt(count);
        const updateInfo = await movieCollection.update(
            {id: parseInt(movieId)}, 
            {$inc: {selledTicket : ticketCount} }
            );
        return updateInfo;
    },

    async updateSeat(sessionId, bookSeat) {
        if (!sessionId || !bookSeat) throw 'You must provide the needed information to update seat information';
        if(!ObjectId.isValid(sessionId)) throw 'The id must be a valid ObjectId';
        const sessionCollection = await session();
        const parsedId = ObjectId(sessionId);
        const theSession = await sessionCollection.findOne({_id: parsedId});
        const seatTemp = theSession.seat.substr(2, theSession.seat.length-4).split('],[');
        const seatArray = [];
        for (let s of seatTemp) {
            seatArray.push(s.split(','));
        }
        for(let index of bookSeat) {
            seatArray[parseInt(index[0])][parseInt(index[1])] = '1';
        }
        let seatString = "";
        for(let s of seatArray) {
            seatString += '[' + s.toString() + '],';
        }
        const replaceSeat = '[' + seatString.substr(0, seatString.length-1) + ']';
        const updateInfo = await sessionCollection.update(
            {_id: parsedId}, 
            {$set: {seat : replaceSeat} }
            );
        return updateInfo;
    },

	async updateHistoryPlay(userName,movieId,sessionId, movieName) {
        const userCollection = await users();
        const theUser = await userData.getUser(userName);
        // console.log("I am here");
		const newPlay = {
            movieName: movieName,
            movieId: movieId,
            sessionId: sessionId   
        }
        const replaceData = await theUser.historyPlay.push(newPlay);
        const updateInfo = await  userCollection.update(
            {userName: userName}, 
            {$set: {historyPlay : replaceData} }
            );
        return updateInfo;
    }    
}