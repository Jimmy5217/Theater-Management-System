const express = require('express');
const router = express.Router();
const moviesData = require('../data/movies');
const bookData = require('../data/book');
const userData = require('../app');

router.get('movie/:id', async (req, res) => {
    if (!req.params.id) throw 'You must specify an movie to book tickets';
    try {
      let movie = await moviesData.getMovieById(req.param.id);
      const {moviename, img, id} = movie; 
      let session = await bookData.getSessionDetails(req.param.id);
      const {showTimes, showDate} = session;
      res.render('book/sessionFilterr', { 
          moviename: moviename, 
          imgUrl: img, 
          id: id,
          title: `${moviename} order`, 
          showDate: showDate,
          showTimes: showTimes,
        });
    } catch (e) {
      res.status(404).json({ error: 'movie not found with the id' });
      return;
    }
})

router.post('movie/:id/session', async(req, res) => {
    if (!req.params.id) throw 'You must specify an movie to book tickets';
    try {
        let showDate = req.body.showDate;
        let showTimes = req.body.showTimes;
        const session = await bookData.getSessionSeat(req.params.id, showDate, showTimes);
        let {seat, price} = session;
        let movie = await moviesData.getMovieById(req.param.id);
        const {moviename, img, id} = movie; 
        res.render('book/seatChoose', { 
            moviename: moviename, 
            imgUrl: img, 
            id: id,
            title: `${moviename} order`, 
            showDate: showDate,
            showTimes: showTimes,
            price: price,
            seat: seat
        });
    } catch (e) {
      res.status(404).json({ error: 'movie not found with the id' });
      return;
    }
})

router.post('movie/:id', asnyc (req, res) => {

})