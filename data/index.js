const moviesData = require('./movies');
const adminData = require('./admin');
const register = require('./register')
const login = require('./login')
const comments = require('./comments')

module.exports = {
   	movies: moviesData,
    admin: adminData,
    register: register,
	login: login,
	comments: comments
};