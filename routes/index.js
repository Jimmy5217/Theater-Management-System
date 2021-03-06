const homeRoutes = require('./home');
const adminRoutes = require('./admin');

const sessionRoutes = require('./session');
const ticketRoutes = require('./adminTicket');

const registerRoutes = require('./register');
const loginRoutes = require('./login')
const profileRoutes = require('./profile')
const logoutRoutes = require('./logout')
const changeUserInfoRoutes = require('./changeUserInfo')
const commentsRoutes = require('./comments')

const sessionPickerRoutes = require('./sessionPicker')


const constructorMethod = (app) => {
    app.use('/', homeRoutes);
    app.use('/admin',adminRoutes);

    app.use('/session',sessionRoutes);

    app.use('/adminTicket',ticketRoutes);

    app.use('/register',registerRoutes);
  	app.use('/login', loginRoutes)
  	app.use('/profile', profileRoutes)
  	app.use('/logout', logoutRoutes)
    app.use('/changeUserInfo', changeUserInfoRoutes)
    app.use('/comments', commentsRoutes)
    
    app.use('/movie', sessionPickerRoutes);
    app.use('*', (req, res) => {
        res.sendStatus(404);
    });    
};

module.exports = constructorMethod;