const express = require('express');
const router = express.Router();
const data = require('../data');
const loginData = data.login;
const commentData = data.comments;

router.get('/', async(req, res) => {
	const userName = req.session.AuthCookie.userInfo.userName
	const commentsList = await commentData.getAll(userName)
	res.render('profile/profile', {
		user:req.session.AuthCookie.userInfo,
		commentsList: commentsList
	})
	
})

module.exports = router;