const express = require('express');
const router = express.Router();
const data = require('../data');
const registerData = data.register;
const loginData = data.login;

router.get('/', async (req, res) => {
	res.render('register/register')
})

router.post('/', async (req, res) => {
	const newUser = req.body;
	const errors = [];
	if (!newUser.firstName || !newUser.lastName || !newUser.Email || !newUser.Gender || !newUser.DateOfBirthDay
		|| ! newUser.DateOfBirthMonth || !newUser.DateOfBirthYear || !newUser.Password || !newUser.userName){
		errors.push('Please enter all information !');
		
	}
	let newUserName = newUser.userName
	const b = await loginData.login(newUserName)
	if (b){
		errors.push('Already has a user with this username, please change!')
	}
	if (errors.length > 0){
		res.status(404)
		const ifErrors = true
		res.render('register/register',{
			ifErrors:ifErrors,
			errors: errors
		})
		return
	}
	let firstName = newUser.firstName;
	let lastName = newUser.lastName;
	let Email = newUser.Email;
	let Gender = newUser.Gender;
	let DateOfBirthDay = newUser.DateOfBirthDay;
	let DateOfBirthMonth = newUser.DateOfBirthMonth;
	let DateOfBirthYear = newUser.DateOfBirthYear;
	let Password = newUser.Password;
	let userName = newUser.userName
	try {
		const a = await registerData.register(
			firstName,
			lastName,
			Email,
			Gender,
			DateOfBirthDay,
			DateOfBirthMonth,
			DateOfBirthYear,
			Password,
			userName)
		const userInfo = await registerData.getUser(userName)
		req.session.AuthCookie = {userInfo: userInfo}
		res.redirect('/profile')
	}catch(e){
		res.status(500);
	}
})

module.exports = router;
