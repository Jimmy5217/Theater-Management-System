const express = require('express');
const router = express.Router();
const sessionData = require('../data/session');

//add
router.post('/session', async (req, res) => {
    
    let sessionInfo = req.body;
    try {
    if (!sessionInfo) {
      throw 'You must provide data to create a session'
    }
    if (!sessionInfo.roomNumber) {
      throw 'You must provide data to create a roomNumber'
    }
    if (!sessionInfo.movieId) {
      throw 'You must provide data to create a movieId'
    }
    if (!sessionInfo.price) {
      throw 'You must provide data to create a price'
    }
    if (!sessionInfo.showDate) {
    
      throw 'You must provide data to create a howDate'
    }
    if (!sessionInfo.showTimes) {
      throw 'You must provide data to create a showTimes'
    }
    if (!sessionInfo.seat) {
        throw 'You must provide data to create a seat'
    }
  
      const newsession = await sessionData.create(
        sessionInfo.roomNumber,
        sessionInfo.movieId,
        sessionInfo.price,
        sessionInfo.showDate,
        sessionInfo.showTimes,
        sessionInfo.seat,
      );  
     // res.json(newsession);
      res.render('admin/addsuccess', { session: newsession })
      
    } catch (e) {
      console.dir(e);
      res.render('admin/error', { error: e});
      //res.sendStatus(500);
    }
  });

  //delete session
  router.post('/delete', async (req, res) => {
    id = req.body.deletesession;
    if (!id) throw 'You must specify an ID to delete';
    try {
      await sessionData.get(id);
    } catch (e) {
      res.render('admin/error', { error: 'session not found'});
    //  res.status(404).json({ error: 'session not found' });
      return;
    }
  
    try {
      await sessionData.remove(id);
     // res.json({"sessionId": req.params.id, "deleted": true});
     res.render('admin/addsuccess', {"deleted": true})
    } catch (e) {
      console.dir(e);
      res.sendStatus(500);
    }
  });


  router.patch('/:id', async (req, res) => {
    const requestBody = req.body;
    let updatedObject = {};
    try {
      const oldsession = await sessionData.get(req.params.id);
      console.dir(oldsession);
      if (requestBody.roomNumber && requestBody.roomNumber !== oldsession.roomNumber)
        updatedObject.roomNumber = requestBody.roomNumber;
      if (requestBody.movieId && requestBody.movieId !== oldsession.movieId)
        updatedObject.movieId = requestBody.movieId;
      if (requestBody.price && requestBody.price !== oldsession.price)
        updatedObject.price = requestBody.price;
      if (requestBody.showDate && requestBody.showDate !== oldsession.showDate)
        updatedObject.showDate = requestBody.showDate; 
      if (requestBody.showTimes && requestBody.showTimes !== oldsession.showTimes)
        updatedObject.showTimes = requestBody.showTimes;
      if (requestBody.seat && requestBody.seat !== oldsession.seat)
        updatedObject.seat = requestBody.seat;
    } catch (e) {
      res.status(404).json({ error: 'session not found' });
      return;
    }
    //console.dir(updatedObject);
    if (Object.keys(updatedObject).length !== 0) {
      try {
        const updatedsession = await moviesData.updatesession(
          req.params.id,
          updatedObject
        );
        res.json(updatedsession);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    } else {
      
      res.status(400).json({error:'No fields have been changed from their inital values, so no update has occurred'});
    }
  });


module.exports = router;