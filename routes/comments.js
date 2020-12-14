const express = require('express');
const router = express.Router();
const data = require('../data');
const commentsData = data.comments;

router.get('/', async (req, res) => {
	res.render('comments/comments')
})

router.post('/', async (req, res) => {
	const newComment = req.body;
	res.render('comments/comments', {
		newComment: newComment
	})
})

module.exports = router;