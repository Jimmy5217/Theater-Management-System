const express = require('express');
const router = express.Router();
const moviesData = require('../data/admin');

//add movie
router.post('/movie', async (req, res) => {
    
    let moviesInfo = req.body;
    try {
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
    //  res.json(newmovie);
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
    //  res.json({"movieId": id, "deleted": true});
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
      console.dir(oldmovie);
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
      res.status(404).json({ error: 'movie not found' });
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
        res.status(500).json({ error: e });
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
      console.dir(movie)
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
     // res.render('admin/moviedetail',  movie )
  
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