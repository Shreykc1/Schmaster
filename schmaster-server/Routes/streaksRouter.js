const express = require('express');
const Router = express.Router();
// const protect = require('./protect')
const streaksController = require('../Controllers/streaksController');
const authController = require('../Controllers/authController');

Router.route('/addStreak')
    .post(authController.protect,streaksController.addStreak);


Router.route('/breakStreak')
    .post(authController.protect,streaksController.breakStreak);


Router.route('/getUserStreaks')
    .post(authController.protect,streaksController.getUserStreaks);

    
module.exports = Router;