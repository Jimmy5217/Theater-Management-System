const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movie;
const { ObjectID, ObjectId} = require('mongodb');

let exportedMethods = {

    async getAllMovies() {
        const moviesCollection = await movies();
        const movieList = await moviesCollection.find({}).toArray();
        if (!movieList) throw 'No movie in system!';
        return movieList;
    },

    async create(moviename, cast, genre, runtime, plot,rating,releaseTime,selledTicket,image,id){

        if (!moviename || (typeof (moviename) != "string") || !moviename.trim().length )throw 'You must provide a moviename for movie';
        if (!cast) throw 'You must provide a info for movie';
        if (!genre) throw 'You must provide a genre for movie';
        if(!runtime) throw 'You must provide a runtime for movie';
        if (!plot)throw 'You must provide plot for movie';
        if (!rating)throw 'You must provide rating for movie';
        if (!releaseTime)throw 'You must provide releaseTime for movie';
        if (!selledTicket)throw 'You must provide selledTicket for movie';
        if (!image)throw 'You must provide image for movie';
        if (!id)throw 'You must provide id for movie';
    
        const moviesCollection = await movies();
    
        let newmovies = {
            moviename: moviename,
            cast: cast,
            genre: genre,
            runtime: runtime,
            plot: plot,
            rating:rating,
            releaseTime:releaseTime,
            selledTicket:selledTicket,
            image:image,
            id:id
            //reviews: []
        };
    
        const insertInfo = await moviesCollection.insertOne(newmovies);
        if (insertInfo.insertedCount === 0) throw 'Could not creat movie';
        const newId = insertInfo.insertedId;
    
        const movie = await this.get(newId.toString());

        return movie;
    
    },

    async get(id){
        if (!id) throw 'You must provide an id to search for';
        if(typeof(id) !== 'string' || id == null) throw 'You must provide a correct id for movie in get';
        const movieCollection = await movies();
        
        let parsedId = ObjectId(id);
       // console.log(parsedId);
        const moviego = await movieCollection.findOne({ _id: parsedId });
        if (moviego === null) throw 'No movie with that id';
        moviego._id = moviego._id.toString();
       
        return moviego;   
    },

    async remove(id) {
        if (!id) throw 'You must provide an id to search for';
        if(typeof(id) !== 'string' || id == null) throw 'You must provide a correct id for movie';
        const movieCollection = await movies();
        let parsedId = ObjectId(id);
        const deletionInfo = await movieCollection.deleteOne({ _id: parsedId });
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete user with id of ${id}`;
        }
        return true;
      },

      async updatemovie(id, updatedmovie) {
        if (!id) throw 'You must provide an id to search for';
        if(typeof(id) != 'string' || id == null) throw 'You must provide a correct id for movie';
        const movieCollection = await movies();
        const updatedmovieData = {}; 
        if (updatedmovie.moviename) {
          updatedmovieData.moviename = updatedmovie.moviename;
        }  
        if (updatedmovie.cast) {
            updatedmovieData.cast = updatedmovie.cast;
        }
        if (updatedmovie.genre) {
            updatedmovieData.genre = updatedmovie.genre;
        }
        if (updatedmovie.runtime) {
            updatedmovieData.runtime= updatedmovie.runtime;
        }
        if (updatedmovie.plot) {
            updatedmovieData.plot= updatedmovie.plot;
        }
        if (updatedmovie.rating) {
            updatedmovieData.rating= updatedmovie.rating;
        }if (updatedmovie.releaseTime) {
            updatedmovieData.releaseTime= updatedmovie.releaseTime;
        }
        if (updatedmovie.selledTicket) {
            updatedmovieData.selledTicket= updatedmovie.selledTicket;
        }
        if (updatedmovie.image) {
            updatedmovieData.image= updatedmovie.image;
        }
        if (updatedmovie.id) {
            updatedmovieData.id= updatedmovie.id;
        }
        let parsedId = ObjectId(id);
        await movieCollection.updateOne({ _id: parsedId }, { $set: updatedmovieData });
        return await this.get(id);
      },
      
    async getmoviebyname(name){
        if (!name) throw 'You must provide a name to search for';     
        if(typeof(name) !== 'string' || name == null) throw 'You must provide a correct name for movie in get'; 
        const movieCollection = await movies();

        let parsedname = name;

        //const themovie = await movieCollection.find({ moviename: parsedname });
        const themovie = await movieCollection.find({moviename: parsedname}).toArray();

        if (themovie === null) throw 'No movie with that name';
       
        return themovie;   
    },

};



module.exports = exportedMethods;
