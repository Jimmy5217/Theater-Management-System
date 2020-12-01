const homeRoutes = require('./home');
const adminRoutes = require('./admin');
const registerRoutes = require('./register');
const loginRoutes = require('./login')
const privateRoutes = require('./private')
const logoutRoutes = require('./logout')

const constructorMethod = (app) => {
    app.use('/', homeRoutes);
    app.use('/admin',adminRoutes);
    app.use('/register',registerRoutes);
  	app.use('/login', loginRoutes)
  	app.use('/private', privateRoutes)
  	app.use('/logout', logoutRoutes)
    app.use('*', (req, res) => {
        res.sendStatus(404);
    });    
};

module.exports = constructorMethod;