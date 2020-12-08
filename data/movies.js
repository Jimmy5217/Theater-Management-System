const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movie;

let exportedMethods = {

    async getAllMovies() {
        const moviesCollection = await movies();
        const movieList = await moviesCollection.find({}).toArray();
        if (!movieList) throw 'No movie in system!';
        return movieList;
    },

    async getMovieById(id) {
        const moviesCollection = await movies();
        const aMovie = await moviesCollection.find({id: id});
        if (!aMovie) throw 'No movie with this id';
        return aMovie;
    }
};

module.exports = exportedMethods;
