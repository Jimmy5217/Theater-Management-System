const moviesData = require('./movies');
const adminData = require('./admin');
const register = require('./register')
const login = require('./login')
const comments = require('./comments')
const book = require('./book')
const session = require('./session')

module.exports = {
   	movies: moviesData,
    admin: adminData,
    register: register,
	login: login,
	comments: comments,
	session: session,
	book: book
};