const express = require('express');
const router = express.Router();
const sessionData = require('../data/session');

//add
router.post('/session', async (req, res) => {
    
    let sessionInfo = req.body;
  
    if (!sessionInfo) {
      res.status(400).json({ error: 'You must provide data to create a session' });
      return;
    }
    if (!sessionInfo.roomNumber) {
      res.status(400).json({ error: 'You must provide a roomNumber' });
      return;
    }
    if (!sessionInfo.movieId) {
      res.status(400).json({ error: 'You must provide a movieId' });
      return;
    }
    if (!sessionInfo.price) {
      res.status(400).json({ error: 'You must provide a price' });
      return;
    }
    if (!sessionInfo.showDate) {
      res.status(400).json({ error: 'You must provide a showDate' });
      return;
    }
    if (!sessionInfo.showTimes) {
      res.status(400).json({ error: 'You must provide a showTimes' });
      return;
    }
    if (!sessionInfo.seat) {
        res.status(400).json({ error: 'You must provide a seat' });
        return;
    }
  
    try {
      const newsession = await sessionData.create(
        sessionInfo.roomNumber,
        sessionInfo.movieId,
        sessionInfo.price,
        sessionInfo.showDate,
        sessionInfo.showTimes,
        sessionInfo.seat,
      );
      
     // res.json(newsession);
      res.render('admin/addsuccess', { session: newsesssion })
      
    } catch (e) {
      console.dir(e);
      res.sendStatus(500);
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