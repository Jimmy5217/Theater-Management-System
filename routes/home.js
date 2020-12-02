const express = require('express');
const router = express.Router();
const moviesData = require('../data/movies');

function orderSort(obj1, obj2) {
    var a = obj1.rating;
    var b = obj2.rating;
    if (a > b) {
        return -1
    } else if (a < b) {
        return 1
    } else {
        return 0
    }
};

router.get('/', async (req, res) => {
    var loginState = false;
    if(req.session.AuthCookie){
        loginState = true;
    } else {
        loginState = false
    }

    try {
        let movieList = await moviesData.getAllMovies();
        
        var ratingList = JSON.parse(JSON.stringify(movieList));
        ratingList.sort(orderSort);

        res.render('pages/home', { movieList: movieList, ratingList:ratingList, title: "Home", loginState: loginState});
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

module.exports = router;