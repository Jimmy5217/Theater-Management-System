const express = require('express');
const router = express.Router();
const moviesData = require('../data/admin');


router.post('/movie', async (req, res) => {
    
    let moviesInfo = req.body;
  
    if (!moviesInfo) {
      res.status(400).json({ error: 'You must provide data to create a movie' });
      return;
    }
    if (!moviesInfo.moviename) {
      res.status(400).json({ error: 'You must provide a moviename' });
      return;
    }
    if (!moviesInfo.cast) {
      res.status(400).json({ error: 'You must provide a cast' });
      return;
    }
    if (!moviesInfo.genre) {
      res.status(400).json({ error: 'You must provide a genre' });
      return;
    }
    if (!moviesInfo.runtime) {
      res.status(400).json({ error: 'You must provide a runtime' });
      return;
    }
    if (!moviesInfo.plot) {
      res.status(400).json({ error: 'You must provide a plot' });
      return;
    }
    if (!moviesInfo.rating) {
        res.status(400).json({ error: 'You must provide a rating' });
        return;
    }
    if (!moviesInfo.releaseTime) {
        res.status(400).json({ error: 'You must provide a releaseTime' });
        return;
    }
    if (!moviesInfo.selledTicket) {
        res.status(400).json({ error: 'You must provide a selledTicket' });
        return;
    }
    if (!moviesInfo.image) {
        res.status(400).json({ error: 'You must provide a image' });
        return;
    }
    if (!moviesInfo.id) {
        res.status(400).json({ error: 'You must provide a id' });
        return;
    }
  
    try {
      const newmovie = await moviesData.create(
        moviesInfo.moviename,
        moviesInfo.cast,
        moviesInfo.genre,
        moviesInfo.runtime,
        moviesInfo.plot,
        moviesInfo.rating,
        moviesInfo.releaseTime,
        moviesInfo.selledTicket,
        moviesInfo.image,
        moviesInfo.id
      );
      res.json(newmovie);
      
    } catch (e) {
      res.sendStatus(500);
    }
  });



  module.exports = router;