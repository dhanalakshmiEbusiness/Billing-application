/**
 * Created by Suhas on 7/21/2016.
 */
var express = require('express'),
        router = express.Router(),
        config=require('../../config/constants');
var aggregationModule = require('../aggregation');
var busLotDataRetrieverFlag = false;
var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secrete password';
module.exports = function (app){
        app.use('/', router);
};
router.get('/smrt/constants',function(req, res){
        res.send(config.constants)
})