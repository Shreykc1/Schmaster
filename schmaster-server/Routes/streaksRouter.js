const express = require('express');
const Router = express.Router();
// const protect = require('./protect')
const streaksController = require('../Controllers/streaksController');
const authController = require('../Controllers/authController');

Router.route('/addStreak')
    .post(streaksController.addStreak);


Router.route('/breakStreak')
    .post(streaksController.breakStreak);


Router.route('/getUserStreaks')
    .post(streaksController.getUserStreaks);

    
module.exports = Router;