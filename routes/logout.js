const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	if(req.session.AuthCookie){
		res.clearCookie('AuthCookie')
		res.render('logout/logout')
	}
	
})
module.exports = router;