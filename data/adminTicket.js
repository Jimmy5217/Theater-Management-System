const mongoCollections = require('../config/mongoCollections');
const ticket = mongoCollections.session;
const user = mongoCollections.users;
const { ObjectID, ObjectId } = require('mongodb');
const { users } = require('../config/mongoCollections');

let exportedMethods = {
    async get(id) {
        if (!id) throw 'You must provide an id to search';
        if (typeof (id) !== 'string' || id == null) throw 'You must provide a correct id for session in get';
        const sessionCollection = await ticket();
        let sessiongo = null;
        try {
        let parsedId = ObjectId(id);
        sessiongo = await sessionCollection.findOne({ _id: parsedId });
        }catch (e){
            
        }    
        if (sessiongo === null) throw 'No session with that id';
        sessiongo._id = sessiongo._id.toString();

        return sessiongo;
    },

    async getuser(id) {
        if (!id) throw 'You must provide an id to search';
        if (typeof (id) !== 'string' || id == null) throw 'You must provide a correct id for user in get';
        let userCollection = await user();
        let usergo = null;
        try {
            let parsedId = ObjectId(id);
            usergo = await userCollection.findOne({ _id: parsedId });
        } catch (e){

        }
        if (usergo === null) throw 'No user with that id';
        usergo._id = usergo._id.toString();

        return usergo;
    },




    async checkticket(sessionid, row, seat) {
        sessioninformation = await this.get(sessionid);
        const sessionseat = JSON.parse(sessioninformation.seat);
        if (sessionseat[row - 1][seat - 1] == 0) {
            return true;
        } else {
            return false;
        }

    },


    async orderticket(userid, sessionid, row, seat) {
        sessioninformation = await this.get(sessionid);
        const sessionseat = JSON.parse(sessioninformation.seat);
        sessionseat[row - 1][seat - 1] = 1;
        await this.updataticket(sessionid, sessionseat);
    },



    async refundticket(userid, sessionid, row, seat) {
        sessioninformation = await this.get(sessionid);
        const newsessionseat = JSON.parse(sessioninformation.seat);
        newsessionseat[row - 1][seat - 1] = 0;
        await this.updataticket(sessionid, newsessionseat);

    },


    async updataticket(sessionid, sessionseat) {
        sessioninformation = await this.get(sessionid);
        const sessionCollection = await ticket();
        sessionseat1 = JSON.stringify(sessionseat);

        let newsessionseat = {
            roomNumber: sessioninformation.roomNumber,
            movieId: sessioninformation.movieId,
            price: sessioninformation.price,
            showDate: sessioninformation.showDate,
            showTimes: sessioninformation.showTimes,
            seat: sessionseat1,
        };
        let parsedId = ObjectId(sessionid);
        await sessionCollection.updateOne({ _id: parsedId }, { $set: newsessionseat });
    },





};

module.exports = exportedMethods;