const express = require('express');
const router = express.Router();
const data = require('../data');
const loginData = data.login;

router.get('/', async (req, res) => {
	res.render('login/login')
})

router.post('/', async (req, res) =>{
	const loginInfo = req.body;
	if (!loginInfo.userName || !loginInfo.Password){
		res.status(401)
		const ifError = true;
		const error = 'Please enter both username and Password !'
		res.render('login/login',{
			ifError:ifError,
			error: error
		})
		return
	}
	const userName = loginInfo.userName;
	const Password = loginInfo.Password;
	try {
		const entry = await loginData.login(userName)
		/*if (entry == true){
			req.session.AuthCookie = loginInfo;
			res.redirect('/private')
		}*/
		if (entry == null){
			res.status(401)
			const noSuchUser = true;
			const accounterror = 'No user with this userName'
			res.render('login/login',{
				noSuchUser:noSuchUser,
				accounterror: accounterror
			})
			return
		}
		if (entry.Password == Password){
			req.session.AuthCookie = entry;
			if (entry.isAdmin == false){
				res.redirect('/')
			}else if (entry.isAdmin == true){
				res.redirect('/admin')
			}
			
		}else{
			res.status(401)
			const ifError = true;
			const error = 'Wrong Password'
			res.render('login/login',{
				ifError:ifError,
				error: error
			})
			return
		}
		
	}catch(e){
		res.status(500);
	}
})

module.exports = router;