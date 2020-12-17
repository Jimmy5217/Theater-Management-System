const express = require('express');
const router = express.Router();
const data = require('../data');
const loginData = data.login;

router.get('/', async (req, res) => {
	res.render('login/changeUserInfo')
})

router.patch('/', async (req, res) => {
	const requestBody = req.body;
	const userId = req.session.AuthCookie.userInfo._id.toString()
	let newUserName = requestBody.userName
	const errors = []
	const b = await loginData.login(newUserName)
	if (b){
		errors.push('Already has a user with this username, please change!')
	}
	if (errors.length > 0){
		res.status(404)
		const ifErrors = true
		res.render('login/changeUserInfo',{
			ifErrors:ifErrors,
			errors: errors
		})
		return
	}
  	let updatedObject = {};
  	//res.redirect('/profile')
  	try {
    	const oldUser = await loginData.getById(userId);
    	/*if (!oldUser){
    		res.status(400).json({ error: 'aaa' });
			return
    	}else {
    		res.status(500).json({ error: '666' });
			return
    	}*/
    	if (requestBody.firstName && requestBody.firstName !== oldUser.firstName)
      		{updatedObject.firstName = requestBody.firstName};
    	if (requestBody.lastName && requestBody.lastName !== oldUser.lastName)
      		{updatedObject.lastName = requestBody.lastName};
    	if (requestBody.Email && requestBody.Email !== oldUser.Email)
      		{updatedObject.Email = requestBody.Email};
  		if (requestBody.Gender && requestBody.Gender !== oldUser.Gender){
      		{updatedObject.Gender = requestBody.Gender};
  		}
  		if (requestBody.DateOfBirthDay && requestBody.DateOfBirthDay !== oldUser.DateOfBirthDay){
      		updatedObject.DateOfBirthDay = requestBody.DateOfBirthDay;
  		}
  		if (requestBody.DateOfBirthMonth && requestBody.DateOfBirthMonth !== oldUser.DateOfBirthMonth){
      		updatedObject.DateOfBirthMonth = requestBody.DateOfBirthMonth;
  		}
  		if (requestBody.DateOfBirthYear && requestBody.DateOfBirthYear !== oldUser.DateOfBirthYear){
      		updatedObject.DateOfBirthYear = requestBody.DateOfBirthYear;
  		}
  		if (requestBody.Password && requestBody.Password !== oldUser.Password){
      		updatedObject.Password = requestBody.Password;
  		}
  		/*if (requestBody.userName && requestBody.userName !== oldUser.userName){
      		updatedObject.userName = requestBody.userName;
  		}*/
  		
  	} catch (e) {
    	res.status(404).json({ error: 'Book not found' });
    	return;
  	}

  	try {
    	const updatedUser = await loginData.update(userId, updatedObject);
    	const userInfo = await loginData.getById(userId)
		req.session.AuthCookie = {userInfo: userInfo};
    	res.redirect('/profile')
  	} catch (e) {
    	res.status(500).json({ error: e });
  	}	
})

module.exports = router;