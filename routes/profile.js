const express = require('express');
const router = express.Router();
const data = require('../data');
const loginData = data.login;

router.get('/', async(req, res) => {
	res.render('profile/profile', {
		user:req.session.AuthCookie
	})
	
})

module.exports = router;