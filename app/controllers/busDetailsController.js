/**
 * Created by Suhas on 2/16/2016.
 */
var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        random = require('mongoose-simple-random'),
        request = require("request"),
        settingsModel = mongoose.model('settingModel'),
        busLotDataRetriever = require('../dataAccessModule/dataRetriever').busLotDataRetriever,
        busLotStatusModel = mongoose.model('busLotStatusModel');
var zlib = require('zlib');
var aggregationModule = require('../aggregation');
var busParkingStatus = false;
var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secrete password';


module.exports = function (app){
        app.use('/', router);
};

var busLotStatusId = 0;
var retrieverRefreshTime = 2*1000;
var busParkingStatus;
router.get('/smrt/busLotStatus/startDataPush', function (req, res) {
        if(busLotStatusId==0){
                triggerBusLotStatusDataPusher();
                setBusParkingRefreshStatus(true)
                res.send("started")
        }else{
                res.send("Push Already Started No Need To Start Again")
        }

})
router.get('/smrt/busLotStatus/stopDataPush', function (req, res) {
        clearIntervalOfBusParkingDetails();
        busLotStatusId=0;
        setBusParkingRefreshStatus(false)
        res.send("Bus parking Data Pusher Stopped")
})
router.get('/smrt/busLotStatus/status', function (req, res) {
        var status;
        if(busLotStatusId==0){
                status=false;
                res.send(status);
        }else{
                status=true;
                res.send(status);
        }
})
router.get('/smrt/busLotStatus/setRefreshTime:refreshTime', function (req, res) {
        if(req.params.refreshTime=="0"){
                retrieverRefreshTime = 5000;
        }else{
                retrieverRefreshTime = parseInt(req.params.refreshTime);
        }
        setBusParkingRefreshTime(retrieverRefreshTime)
        if(busLotStatusId!=0){
                clearIntervalOfBusParkingDetails();
                triggerBusLotStatusDataPusher();
        }
})
router.get('/smrt/busLotStatus/getRefreshTime', function (req, res) {
        var refreshTime = {
                retrieverRefreshTime:retrieverRefreshTime
        };
        res.send(refreshTime);
})
function triggerBusLotStatusDataPusher(){
        if(busParkingStatus) {
                busLotStatusId = setInterval(function () {
                        /*console.log("started")*/
                        busLotDataRetriever.getBusLotData();
                }, retrieverRefreshTime);
        }
        console.log("started Bus");
}
function clearIntervalOfBusParkingDetails(){
        /*busLotStatusId=0;*/
        clearInterval(busLotStatusId);
}
router.get('/smrt/busLotStatus/getData', function (req, res) {
        if(busParkingStatus){
                busLotDataRetriever.getBusLotData();
        }
        res.send("sent for first time");
})

router.get('/smrt/settings/setBusParkingRefreshTime/:refreshTime', function (req, res) {
        if(req.params.refreshTime=== "0"){
                retrieverRefreshTime = 5000;
                res.send("Refresh Status of Bus parking has been changed to "+(retrieverRefreshTime/1000)+"  Seconds")
        }else{
                retrieverRefreshTime = parseInt(req.params.refreshTime);
                res.send("Refresh Status of Bus parking has been changed to "+(retrieverRefreshTime/1000)+"  Seconds")
        }
        setBusParkingRefreshTime(retrieverRefreshTime)
        if(busLotStatusId!=0){
                clearIntervalOfBusParkingDetails();
                triggerBusLotStatusDataPusher();
        }

})



router.get('/smrt/userData/busLotData/:startDate/:endDate', function (req, res) {
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', 'disp-ext-type; filename=busParkingData.json.gz;creation-date-parm:'+new Date());
        var stream = require('stream');
        var arrayStream = new stream.Transform({objectMode: true});
        arrayStream._hasWritten = false;
        arrayStream._transform = function (chunk, encoding, callback) {
                if (!this._hasWritten) {
                        this._hasWritten = true;
                        this.push('[' + JSON.stringify(chunk));

                } else {
                        this.push(',' + JSON.stringify(chunk));
                }
                callback();
        };
        arrayStream._flush = function (callback) {
                /*console.log('_flush:');*/
                this.push(']');
                callback();

        };

        var startDate = new Date(req.params.startDate);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        var endDate = new Date(req.params.endDate);
        endDate.setDate(endDate.getDate()+1)
        endDate.setHours(0);
        endDate.setMinutes(0);
        endDate.setSeconds(0);
        busLotStatusModel
                .find({"receivedDateTime":{$gt:startDate,$lt:endDate}})
                .stream()
                .pipe(arrayStream)
                .pipe(zlib.createGzip())
                .pipe(res);
})


function getBusParkingRetrievalDetails(){
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result) {
                if(err)
                        console.log(err)
                retrieverRefreshTime=result.SettingsConfiguration.busParkingDetails.refreshTime;
                busParkingStatus=result.SettingsConfiguration.busParkingDetails.refreshStatus;
                if(busParkingStatus && busLotStatusId==0){
                        clearIntervalOfBusParkingDetails();
                        triggerBusLotStatusDataPusher();
                }
        })
}
getBusParkingRetrievalDetails();

function setBusParkingRefreshStatus(flag){
        busParkingStatus = flag;
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.busParkingDetails.refreshStatus=flag;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                        })
                }
                /*res.send(settingsObj);*/
        });
}
function setBusParkingRefreshTime(timeInMilliSeconds){
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.busParkingDetails.refreshTime=timeInMilliSeconds;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                console.log("saved settings details of demographic show gender as   :"+timeInMilliSeconds)
                        })
                }
                /*res.send(settingsObj);*/
        });
}

/*Historical Data*/
router.get('/busParking/historicalData/:seriesSelected',function(req,res){
        var startDate = new Date();
        var seriesSelected = parseInt(req.params.seriesSelected)
        aggregationModule.historicalData.busParkingLot.occupancyData.getBusParkingOccupancy(startDate,seriesSelected,function(result){
                res.send(result)
        })
})