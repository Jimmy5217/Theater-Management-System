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
        console.log(parsedId);
        const moviego = await movieCollection.findOne({ _id: parsedId });
        if (moviego === null) throw 'No movie with that id';
        moviego._id = moviego._id.toString();
       
        return moviego;   
    },
};

module.exports = exportedMethods;
