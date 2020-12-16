const mongoCollections = require('../config/mongoCollections');
const moviesession = mongoCollections.session;
const { ObjectID, ObjectId} = require('mongodb');


let exportedMethods = {

    async create(roomNumber, movieId, price, showDate, showTimes,seat,){

        if (!roomNumber )throw 'You must provide a roomNumber for session';
        if (!movieId) throw 'You must provide a info for session';
        if (!price) throw 'You must provide a price for session';
        if(!showDate) throw 'You must provide a showDate for session';
        if (!showTimes)throw 'You must provide showTimes for session';
        if (!seat)throw 'You must provide seat for session';
        
        const sessionCollection = await moviesession();
        
        let newsession = {
            roomNumber: roomNumber,
            movieId: movieId,
            price: parseInt(price),
            showDate: showDate,
            showTimes: showTimes,
            seat:seat,
            //reviews: []
        };
    
        const insertInfo = await sessionCollection.insertOne(newsession);
        if (insertInfo.insertedCount === 0) throw 'Could not creat session';
        const newId = insertInfo.insertedId;
    
        const session = await this.get(newId.toString());

        return session;
    
    },

    async get(id){
        if (!id) throw 'You must provide an id to search for';
        if(typeof(id) !== 'string' || id == null) throw 'You must provide a correct id for session in get';
        const sessionCollection = await moviesession();
        let sessiongo = null;
        try{
        let parsedId = new ObjectId(id);
        sessiongo = await sessionCollection.findOne({ _id: parsedId });
        }catch(e){

        }
        if (sessiongo === null) throw 'No session with that id';
        sessiongo._id = sessiongo._id.toString();
       
        return sessiongo;   
    },

    async remove(id) {
        if (!id) throw 'You must provide an id to search for';
        if(typeof(id) !== 'string' || id == null) throw 'You must provide a correct id for session';
        const sessionCollection = await moviesession();
        let parsedId = ObjectId(id);
        const deletionInfo = await sessionCollection.deleteOne({ _id: parsedId });
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete user with id of ${id}`;
        }
        return true;
      },


      async updatesession(id, updatedsession) {
        if (!id) throw 'You must provide an id to search for';
        if(typeof(id) != 'string' || id == null) throw 'You must provide a correct id for session';
        const sessionCollection = await moviesession();
        const updatedsessionData = {}; 
        if (updatedsession.roomNumber) {
          updatedsessionData.roomNumber = updatedsession.roomNumber;
        }  
        if (updatedsession.movieId) {
            updatedsessionData.movieId = updatedsession.movieId;
        }
        if (updatedsession.price) {
            updatedsessionData.price = updatedsession.price;
        }
        if (updatedsession.showDate) {
            updatedsessionData.showDate= updatedsession.showDate;
        }
        if (updatedsession.showTimes) {
            updatedsessionData.showTimes= updatedsession.showTimes;
        }
        if (updatedsession.seat) {
            updatedsessionData.seat= updatedsession.seat;
        }
        let parsedId = ObjectId(id);
        await movieCollection.updateOne({ _id: parsedId }, { $set: updatedsessionData });
        return await this.get(id);
      },



}

module.exports = exportedMethods;