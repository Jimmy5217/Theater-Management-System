const express = require('express');
const router = express.Router();
const ticketData = require('../data/adminTicket');
const sessionData = require('../data/session');
//const { session } = require('../config/mongoCollections');

//order ticket
router.post('/ticket', async (req, res) => {
    const requestBody = req.body;
    try {

        const sessionid1 = await sessionData.get(requestBody.sessionid);
        if (!sessionid1) {
            throw 'session id is not correct'
        }

        if (requestBody.row > 8 ||requestBody.seat > 12 || requestBody.row < 1||requestBody.seat < 1) {
            throw 'number of seat is not correct'
        }
        const position = await ticketData.checkticket(requestBody.sessionid,requestBody.row,requestBody.seat)
        if (position == false){
            throw 'This seat is already occupied'
        }

        await ticketData.orderticket(requestBody.userId,requestBody.sessionid,requestBody.row,requestBody.seat) 
        res.render('admin/addsuccess', { addsuccess: true })
    } catch (e) {
        console.dir(e);
        res.render('admin/error', { error: e });
    }

});


module.exports = router;