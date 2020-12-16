const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movie;

let exportedMethods = {
    async createMovie(moviename, plot, rating, runtime, genre, cast, releaseTime, selledTicket,
        image, id) {
        const movieCollection = await movies();
        const newMovie = {
            moviename: moviename,
            plot: plot,
            rating: rating,
            runtime: runtime,
            genre: genre,
            cast: cast,
            releaseTime: releaseTime,
            selledTicket: selledTicket,
            image: image,
            id: id
        }
        const insertInfo = await movieCollection.insertOne(newMovie);
        return insertInfo;
    },

    async getAllMovies() {
        const moviesCollection = await movies();
        const movieList = await moviesCollection.find({}).toArray();
        if (!movieList) throw 'No movie in system!';
        return movieList;
    },
    
    async getMovieById(id) {
        const moviesCollection = await movies();
        const aMovie = await moviesCollection.findOne({id: parseInt(id)});
        if (!aMovie || aMovie == null) throw 'No movie with this id';
        
        return aMovie;
    }
};

module.exports = exportedMethods;
