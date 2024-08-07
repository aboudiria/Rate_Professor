const express = require('express');
const router = express.Router();
const { signUp, confirmEmail,signIn,signOut } = require('../controllers/authController');

router.post('/signup', signUp);

router.post('/signin', signIn);
router.post('/signout', signOut);

router.get('/confirm/:token', confirmEmail);

module.exports = router;
   