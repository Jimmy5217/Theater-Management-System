const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const bookData = data.book;
const loginData = data.login;

router.get('/:id', async (req, res) => {
    // if (!req.params.id) throw 'You must specify an movie to book tickets';
    try {
      //console.log(req.params.id); == {id: '1'}
      let movie = await moviesData.getMovieById(req.params.id);
      const {moviename, image, id} = movie;
      let dict = await bookData.getSessionDate(req.params.id); //return the dict object
      const showDate = Object.keys(dict);
      const showTimes = dict[showDate[0]];
      res.render('book/sessionFilter', { 
          moviename: moviename, 
          imgUrl: image, 
          id: id,
          title: `${moviename} order`, 
          showDate: showDate,
          showTimes: showTimes
        });
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: 'movie not found with the id' });
      return;
    }
})

router.post('/:id', async(req, res) => {
    if (!req.params.id) throw 'You must specify an movie to book tickets';
    try {  
        const showDate = req.body.showDate;
        const showTimes = req.body.showTimes;
        // console.log(req.params);
        const {seatResult, price, sessionId} = await bookData.getSessionDetails(req.params.id, showDate, showTimes);
        let movie = await moviesData.getMovieById(req.params.id);
        const {moviename, image, id} = movie; 
        res.render('book/seatChoose', { 
            moviename: moviename, 
            imgUrl: image, 
            movieId: id,
            title: `${moviename} order`, 
            showDate: showDate,
            showTimes: showTimes,
            price: price,
            seat: seatResult,
            sessionId: sessionId.toString()
        });
    } catch (e) {
        console.log(e);
      res.status(404).json({error: e})
    //   json({ error: 'movie not found with the id' });
      return;
    }
})

router.post('/:id/book', async(req, res) => {
    if (!req.params.id) throw 'You must specify an movie to book tickets';
    try {
        
        let bookSeat = req.body.bookSeat;
        let count = req.body.ticketCount;
        let movieName = req.body.movieName;
        let sessionId = req.body.sessionId;
        let userName = req.session.AuthCookie.userInfo.userName;
        // console.log(userName);
        let movieId = req.params.id;
        // console.log(movieId);
        const bookResult = await bookData.updateSeat(sessionId, bookSeat);
        const movieSellResult = await bookData.updateMovieSell(movieId, count);
        // console.log(movieSellResult);
        const historyPlayResult = await bookData.updateHistoryPlay(userName, movieId, sessionId, movieName,count);
        const userId = req.session.AuthCookie.userInfo._id.toString()
        const userInfo = await loginData.getById(userId)
        req.session.AuthCookie = {userInfo: userInfo};
        res.redirect('/profile');
    } catch (e) {
      res.status(404).json({ error: 'Tickets book fail' });
      return;
    }
})


module.exports = router;