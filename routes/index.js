const homeRoutes = require('./home');
const adminRoutes = require('./admin');
const sessionRoutes = require('./session');

const constructorMethod = (app) => {
    app.use('/', homeRoutes);
    app.use('/admin',adminRoutes);
    app.use('/session',sessionRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });    
};

module.exports = constructorMethod;