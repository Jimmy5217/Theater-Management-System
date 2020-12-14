const mongoCollections = require('../config/mongoCollections');
const ticket = mongoCollections.session;
const { ObjectID, ObjectId} = require('mongodb');

let exportedMethods = {
    async get(id){
        if (!id) throw 'You must provide an id to search for';
        if(typeof(id) !== 'string' || id == null) throw 'You must provide a correct id for session in get';
        const sessionCollection = await ticket();
        
        let parsedId = ObjectId(id);
       // console.log(parsedId);
        const sessiongo = await sessionCollection.findOne({ _id: parsedId });
        if (sessiongo === null) throw 'No session with that id';
        sessiongo._id = sessiongo._id.toString();
       
        return sessiongo;   
    },


    async checkticket(sessionid, row, seat){
        sessioninformation = await this.get(sessionid);
        const sessionseat = JSON.parse(sessioninformation.seat);
        if (sessionseat[row-1][seat-1] == 0){
            return true;
        }else{  
            return false;
        }

    },


    async orderticket(userid, sessionid,row,seat){
        sessioninformation = await this.get(sessionid);
        const sessionseat = JSON.parse(sessioninformation.seat);
        sessionseat[row-1][seat-1] = 1;
        await this.updataticket(sessionid,sessionseat)
    },
    
    async updataticket(sessionid,sessionseat){
        sessioninformation = await this.get(sessionid);
        const sessionCollection = await ticket();
        sessionseat1=JSON.stringify(sessionseat);
 
        let newsessionseat = {
            roomNumber: sessioninformation.roomNumber,
            movieId: sessioninformation.movieId,
            price: sessioninformation.price,
            showDate: sessioninformation.showDate,
            showTimes: sessioninformation.showTimes,
            seat:sessionseat1,
        };

        let parsedId = ObjectId(sessionid);
        await sessionCollection.updateOne({ _id: parsedId }, { $set: newsessionseat});      
    },

};

module.exports = exportedMethods;