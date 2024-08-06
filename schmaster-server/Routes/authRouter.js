const express = require('express');
const Router = express.Router();
// const protect = require('./protect')
const authController = require('../Controllers/authController');

Router.route('/SignIn')
    .post(authController.SignIn);


Router.route('/SignUp')
    .post(authController.SignUp);

Router.route('/getCurrentUser')
    .post(authController.getCurrentUser);


Router.route('/sendToken')
    .post(authController.sendToken);

    
Router.route('/getAllUsers')
    .get(authController.getAllUsers);
    
Router.route('/getUserById')
        .post(authController.getUserById);

module.exports = Router;