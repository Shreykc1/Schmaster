const express = require('express');
const Router = express.Router();
// const protect = require('./protect')
const authController = require('../Controllers/authController');


Router.route('/SignIn')
    .post(authController.SignIn);


Router.route('/SignUp')
    .post(authController.SignUp);

Router.route('/getCurrentUser')
    .get(authController.getCurrentUser);
    
Router.route('/getAllUsers')
    .get(authController.getAllUsers);
    
Router.route('/getUserById')
        .post(authController.getUserById);

Router.route('/logout')
        .get(authController.logout);

module.exports = Router;