const moviesData = require('./movies');
const adminData = require('./admin');
const register = require('./register')
const login = require('./login')

module.exports = {
   	movies: moviesData,
    admin: adminData,
    register: register,
	login: login
};