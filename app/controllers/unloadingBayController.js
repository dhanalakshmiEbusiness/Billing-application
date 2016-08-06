/**
 * Created by zendynamix on 3/9/2016.
 */
var express = require('express'),
        router = express.Router(),
        unloadingBayDataRetriever = require('../dataAccessModule/dataRetriever').unloadingBayDataRetriever;

var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secrete password';
module.exports = function (app){
        app.use('/', router);
};
var unloadingBayDataRetrieverId=0;
var intervalSeconds=5*60*1000;
router.get('/smrt/unloadingBayDetails/startRetriever', function (req, res) {
        if(unloadingBayDataRetrieverId!=0){
                res.send("Retriever is already running so no need to start it again")
        }else{
                startUnloadingBayDataRetriever();
                res.send("Retriever is Started")
        }

})
router.get('/smrt/unloadingBayDetails/status', function (req, res) {
        var status;
        if(unloadingBayDataRetrieverId==0){
                status=false;
                res.send(status);
        }else{
                status=true;
                res.send(status);
        }
})
function startUnloadingBayDataRetriever(){
        unloadingBayDataRetrieverId = setInterval(function(){
                unloadingBayDataRetriever.getUnloadingBayDetails();
        },intervalSeconds);
}
router.get('/smrt/unloadingBayDetails/stopRetriever', function (req, res) {
        clearInterval(unloadingBayDataRetrieverId)
        unloadingBayDataRetrieverId=0;
        res.send("Retriever is Stopped")
})
/*startUnloadingBayDataRetriever();*/
router.get('/smrt/unloadingBayDetails/getData', function (req, res) {
        unloadingBayDataRetriever.getUnloadingBayDetails();
})
router.post('/smrt/userData/unloadingBayData',function(req, res){
        var startDate =req.body.startDate;
        var endDate =req.body.endDate;
})
