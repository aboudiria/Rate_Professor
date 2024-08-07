const express = require('express');
const protectRoute = require( './../middleware/protectRoute');
const router = express.Router();

const {changeEmail,changePassword}=require('../controllers/profileController');

router.post('/change-email',protectRoute ,changeEmail);

router.post('/change-password',protectRoute ,changePassword);

module.exports = router;