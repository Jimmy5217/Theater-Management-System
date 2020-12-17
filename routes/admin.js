const express = require('express');
const router = express.Router();
const moviesData = require('../data/admin');

//add movie
router.post('/movie', async (req, res) => {
    
    let moviesInfo = req.body;
    try {
    if (!moviesInfo) {
      // res.status(400).json({ error: 'You must provide data to create a movie' });
      // return;
      throw 'You must provide data to create a movie'
    }
    if (!moviesInfo.moviename) {
      throw 'You must provide a moviename'
    }
    if (!moviesInfo.cast) {
      throw 'You must provide a cast'
    }
    if (!moviesInfo.genre) {
      throw 'You must provide a genre'
    }
    if (!moviesInfo.runtime) {
      throw 'You must provide a runtime'
    }
    if (!moviesInfo.plot) {
      throw 'You must provide a plot'
    }
    if (!moviesInfo.rating) {
        throw 'You must provide  a rating'
    }
    if (!moviesInfo.releaseTime) {
        throw 'You must provide a releaseTime'
    }
    if (!moviesInfo.selledTicket) {
        throw 'You must provide a selledTicket'
    }
    if (!moviesInfo.image) {
        throw 'You must provide  a image'
    }
    if (!moviesInfo.id) {
        throw 'You must provide a id'
    }
  
    
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
        parseInt(moviesInfo.id)
      );
    res.render('admin/addsuccess', { movie: newmovie })
    } catch (e) {
      res.render('admin/error', { error: e });
    //  res.sendStatus(500);
    }
  });

//delete movie
  router.post('/delete', async (req, res) => {
    id = req.body.deletemovie;
    if (!id) throw 'You must specify an ID to delete';
    try {
      await moviesData.get(id);
    } catch (e) {
    //  res.status(404).json({ error: 'movie not found' });
      res.render('admin/error', { error: 'movie not found'});
      return;
    }
  
    try {
      await moviesData.remove(id);
      res.render('admin/addsuccess', {"deleted": true})
    } catch (e) {
      res.sendStatus(500);
    }
  });

//update movie
  router.post('/update', async (req, res) => {
    const requestBody = req.body;
    let updatedObject = {};
    try {
      Id = req.body.movieobjectid
      //const oldmovie = await moviesData.get(req.params.id);
      const oldmovie = await moviesData.get(Id);

      if (requestBody.moviename && requestBody.moviename !== oldmovie.moviename)
        updatedObject.moviename = requestBody.moviename;
      if (requestBody.cast && requestBody.cast !== oldmovie.cast)
        updatedObject.cast = requestBody.cast;
      if (requestBody.genre && requestBody.genre !== oldmovie.genre)
        updatedObject.genre = requestBody.genre;
      if (requestBody.runtime && requestBody.runtime !== oldmovie.runtime)
        updatedObject.runtime = requestBody.runtime; 
      if (requestBody.plot && requestBody.plot !== oldmovie.plot)
        updatedObject.plot = requestBody.plot;
      if (requestBody.rating && requestBody.rating !== oldmovie.rating)
        updatedObject.rating = requestBody.rating;
      if (requestBody.releaseTime && requestBody.releaseTime !== oldmovie.releaseTime)
        updatedObject.releaseTime = requestBody.releaseTime;
      if (requestBody.selledTicket && requestBody.selledTicket !== oldmovie.selledTicket)
        updatedObject.selledTicket = requestBody.selledTicket;
      if (requestBody.image && requestBody.image !== oldmovie.image)
        updatedObject.image = requestBody.image;
      if (requestBody.id && requestBody.id !== oldmovie.id)
        updatedObject.id = requestBody.id;
    } catch (e) {
      res.render('admin/error', { error: 'movie not found'})
    //  res.status(404).json({ error: 'movie not found' });
      return;
    }
    if (Object.keys(updatedObject).length !== 0) {
      try {
        const updatedmovie = await moviesData.updatemovie(
          //req.params.id,
          Id,
          updatedObject
        );
      //  res.json(updatedmovie);
      res.render('admin/addsuccess', {movie: updatedmovie})
      } catch (e) {
        console.dir(e);
        res.render('admin/error', { error: e})
      }
    } else {
      
      res.status(400).json({error:'No fields have been changed from their inital values, so no update has occurred'});
    }
  });

  //get movie by name
  router.post('/search', async (req, res) => {
    try {
      name = req.body.searchTerm;
      let movie = await moviesData.getmoviebyname(name);
      if(movie.length == 0){
        throw'can not found the movie'
      }
   res.render('admin/showmovie', { movie: movie })

    } catch (e) {
      res.render('admin/error', { error: e});
    //  res.status(404).json({ error: 'User not found' });
    }
  });

  router.get('/:id', async (req, res) => {
    
      const newid = req.params['id'];
    try {  
      let movie = await moviesData.get(newid);
      res.render('admin/moviedetail', { movie: movie })
     
    } catch (e) {
      const context = {
          title: "Found : Error",
          errors: e.message,
      };
      res.status(e.http_code);
      res.render('error', context);
  //   res.status(404).json({ error: 'can not found' });
   }
  });



  module.exports = router;