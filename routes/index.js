const homeRoutes = require('./home');
const adminRoutes = require('./admin');

const sessionRoutes = require('./session');

const registerRoutes = require('./register');
const loginRoutes = require('./login')
const profileRoutes = require('./profile')
const logoutRoutes = require('./logout')
const userPageRoutes = require('./userPage')

const sessionPickerRoutes = require('./sessionPicker')


const constructorMethod = (app) => {
    app.use('/', homeRoutes);
    app.use('/admin',adminRoutes);

    app.use('/session',sessionRoutes);


    app.use('/register',registerRoutes);
  	app.use('/login', loginRoutes)
  	app.use('/profile', profileRoutes)
  	app.use('/logout', logoutRoutes)
    app.use('/userPage', userPageRoutes)
    
    app.use('/movie/:id', sessionPickerRoutes)

    app.use('/movie/:id/:sessionId', )

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });    
};

module.exports = constructorMethod;