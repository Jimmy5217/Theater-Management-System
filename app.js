const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === 'number')
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        },
        equalZero: (seat,zero,options) => {
            if(seat == zero){
              return options.fn(this);
            }else {
              return options.inverse(this);
            }
        }
    }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));

app.use('/private',(req, res, next) =>{
    if(!req.session.AuthCookie){
        res.status(403)
        res.render('error/error')
    }else{
        next();
    }
});

app.use('/movie/1',(req, res, next) =>{
    if(!req.session.AuthCookie){
        res.redirect('/login')
    }else{
        next();
    }
});

app.use('/movie/2',(req, res, next) =>{
    if(!req.session.AuthCookie){
        res.redirect('/login')
    }else{
        next();
    }
});

app.use('/movie/3',(req, res, next) =>{
    if(!req.session.AuthCookie){
        res.redirect('/login')
    }else{
        next();
    }
});

app.use('/movie/4',(req, res, next) =>{
    if(!req.session.AuthCookie){
        res.redirect('/login')
    }else{
        next();
    }
});

app.use('/movie/5',(req, res, next) =>{
    if(!req.session.AuthCookie){
        res.redirect('/login')
    }else{
        next();
    }
});

app.use('/movie/6',(req, res, next) =>{
    if(!req.session.AuthCookie){
        res.redirect('/login')
    }else{
        next();
    }
});

app.use('/login',(req, res, next) =>{
    if(req.session.AuthCookie){
        if (req.session.AuthCookie.isAdmin == false)
        {res.redirect('/profile')}else if(req.session.AuthCookie.isAdmin == true){
            res.redirect('/admin')
        }
    }else{
        next();
    }
});

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.get('/admin', function (req, res, next) {
    res.render('admin/admin', {layout: false});
})

app.get('/admin/search', function (req, res, next) {
    res.render('admin/search', {layout: false});
})
app.get('/admin/addmoviepage', function (req, res, next) {
    res.render('admin/addmoviepage', {layout: false});
})
app.get('/admin/deletepage', function (req, res, next) {
    res.render('admin/deletepage', {layout: false});
})
app.get('/admin/updatepage', function (req, res, next) {
    res.render('admin/updatepage', {layout: false});
})

app.get('/admin/addsessionpage', function (req, res, next) {
    res.render('admin/addsessionpage', {layout: false});
})
app.get('/admin/deletesessionpage', function (req, res, next) {
    res.render('admin/deletesessionpage', {layout: false});
})

app.get('/admin/orderticket', function (req, res, next) {
    res.render('admin/orderticket', {layout: false});
})
app.get('/admin/refundticket', function (req, res, next) {
    res.render('admin/refundticket', {layout: false});
})

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
