const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleAuthCallback);
router.post('/metamask', authController.metamaskAuth);

module.exports = router;
