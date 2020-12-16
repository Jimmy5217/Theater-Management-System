const express = require('express');
const router = express.Router();
const data = require('../data');
const commentsData = data.comments;

router.get('/', async (req, res) => {
	/*const userName =
	const commentsList = await commentData.getAll(userName)*/
	res.render('comments/comments')
})

router.post('/', async (req, res) => {
	const newComment = req.body;
	try{
		const a = await commentsData.creatComment(
			newComment.userName,
			newComment.moviename,
			newComment.comment,
			newComment.rating)
			
		
		res.redirect('/profile')
		//res.render('comments/comments')
	}catch(e){
		res.status(404).json({ error: 'comments error' });
	}
})

module.exports = router;