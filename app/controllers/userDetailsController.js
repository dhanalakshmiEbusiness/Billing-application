/**
 * Created by Suhas on 3/8/2016.
 */
var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        userModel = mongoose.model('PassportLocalUser'),
        dataAccessModule=require('../dataAccessModule');

var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secrete password';
module.exports = function (app){
        app.use('/', router);
};


var createHash = function(newPassword){
        return bCrypt.hashSync(newPassword, bCrypt.genSaltSync(10), null);
}
var isValidPassword = function(oldPassword, pwd){
        return bCrypt.compareSync(oldPassword.password, pwd);
}