const express = require('express');
const { login, redirect} = require('../controllers/authController.js');
const router = express.Router();

router.get('/login', login);

router.get('/redirect', redirect);


// router.post('/signup', userSignup);
// router.post('/login-user', loginUser);
// router.post('/logout-user', logoutUser);


module.exports = router;