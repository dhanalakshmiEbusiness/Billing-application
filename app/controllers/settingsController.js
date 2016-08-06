/**
 * Created by Suhas on 3/1/2016.
 */
var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        settingsModel = mongoose.model('settingModel'),
        dataAccessModule=require('../dataAccessModule'),
        config = require('../../config/config');


var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secrete password';
module.exports = function (app){
        app.use('/', router);
};
router.get('/smrt/settings/getElderlyLoadingOccupancyThreshold', function (req, res) {
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result){
                if(err)
                        res.send(err)
                res.send(result.SettingsConfiguration.threshold)
        })
})
router.get('/smrt/settings/setElderlyLoadingOccupancyThreshold/:threshold', function (req, res) {
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        res.send(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.threshold.elderlyLoadingOccupancy=req.params.threshold;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                setElderlyOccupancyThreshold(req.params.threshold);
                                res.send("saved")
                        })
                }
                /*res.send(settingsObj);*/
        });
})



router.post('/smrt/settings/BayCapacity', function (req, res) {
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        res.send(err);
                if(settingsObj){
                        /*req.body.bayCapacityObject*/
                        var laneWiseCapacity = req.body.bayCapacityObject;
                        var loadingOccupancyArray = settingsObj.SettingsConfiguration.loadingOccupancy;
                        for(var i=0;i<loadingOccupancyArray.length;i++){
                                var loadingBerthObj = loadingOccupancyArray[i];
                                var laneId= loadingBerthObj.laneId;
                                loadingBerthObj.berthCapacity=laneWiseCapacity[laneId-1]
                                loadingBerthObj.speciallyChallengedCapacity=laneWiseCapacity[3]
                                if(i==loadingOccupancyArray.length-1){
                                        settingsObj.SettingsConfiguration.loadingOccupancy = loadingOccupancyArray;
                                        settingsObj.save(function(err1){
                                                if(err1)
                                                        res.send(err)
                                                res.send("saved")
                                        })
                                }
                        }

                }
        });
})




router.get('/smrt/settings/getLoadingOccupancyCountRatio', function (req, res) {
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result) {
                if(err)
                        res.send(err)
                res.send(result.SettingsConfiguration.loadingOccupancy)
        })
})
router.post('/smrt/settings/setElderlyLoadingOccupancyThreshold', function (req, res) {
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        res.send(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.threshold.elderlyLoadingOccupancy=req.body.countRation;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                res.send("saved")
                        })
                }
                /*res.send(settingsObj);*/
        });
})

/*router.get('/smrt/settings/getLoadingOccupancyCountRatio', function (req, res) {
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result) {
                if(err)
                        res.send(err)
                res.send(result.SettingsConfiguration.loadingOccupancy)
        })
})*/
router.post('/smrt/settings/setSMSNotificationDetails', function (req, res) {
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj){
                if (err)
                        res.send(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.smsNotification=req.body;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                setSMSDetails(req.body.phoneNo,req.body.smsSendingStatus)
                                res.send("saved")
                        })
                }
                /*res.send(settingsObj);*/
        });
})

router.get('/smrt/settings/getSettingDetails', function (req, res) {
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result){
                if(err)
                        res.send(err)
                res.send(result.SettingsConfiguration)
        })
})
router.get('/smrt/settings/setSMSNotificationDetails/autoSMS/:status', function (req, res) {
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        res.send(err);
                if(settingsObj){
                        var status;
                        if(req.params.status=='true'){
                                status=true;
                        }else{
                                status=false;
                        }
                        settingsObj.SettingsConfiguration.smsNotification.smsSendingStatus=status;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                setSMSDetails(settingsObj.SettingsConfiguration.smsNotification.phoneNo,
                                        settingsObj.SettingsConfiguration.smsNotification.smsSendingStatus)
                                res.send(typeof(status))
                        })
                }
        });
})


router.get('/smrt/settings/setShowSimulatorStatus/:status', function (req, res) {
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        res.send(err);
                if(settingsObj){
                        var status;
                        if(req.params.status=='true'){
                                status=true;
                        }else{
                                status=false;
                        }
                        settingsObj.SettingsConfiguration.settingsData.showSimulatorPage=status;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                res.send(status)
                        })
                }
        });
})


router.get('/smrt/settings/getSettingDetails/phoneNo', function (req, res) {
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result){
                if(err)
                        res.send(err)
                var data = {
                        phoneNo:result.SettingsConfiguration.smsNotification.phoneNo
                }
                res.send(data)
        })
})

router.post('/smrt/settings/setClearEntryExit/:status', function (req, res) {

        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        res.send(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.busEntryExitStatus.clearBusArrivalStatus=req.params.status;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                res.send("saved")
                        })
                }
        });
})

router.post('/smrt/settings/clearBusDepartureStatus/:status', function (req, res) {
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        res.send(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.busEntryExitStatus.clearBusDepartureStatus=req.params.status;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                res.send("saved")
                        })
                }
        });
})
function getSettingDetails(){
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result) {
                if(err)
                        res.send(err)
                var elderlyThreshold = result.SettingsConfiguration.threshold.elderlyLoadingOccupancy;
                var thresholdTimeOut = result.SettingsConfiguration.threshold.thresholdTimeOut;
                var smsDetails = result.SettingsConfiguration.smsNotification;
                setElderlyOccupancyThreshold(elderlyThreshold);
                setElderlyOccupancyThresholdTimeOut(thresholdTimeOut);
                setSMSDetails(smsDetails.phoneNo,smsDetails.smsSendingStatus);
                /*res.send(smsDetails)*/
        })
}
function setElderlyOccupancyThreshold(elderlyThreshold){
        dataAccessModule.save.elderlyQueueInfoDataHandler.setElderlyOccupancyThreshold(elderlyThreshold);
}
function setElderlyOccupancyThresholdTimeOut(thresholdTimeOut){
        dataAccessModule.save.elderlyQueueInfoDataHandler.setElderlyOccupancyThresholdTimeOut(thresholdTimeOut);
}
function setSMSDetails(phoneNo,status){
        dataAccessModule.save.elderlyQueueInfoDataHandler.setSMSDetails(phoneNo,status);
}

getSettingDetails();
router.get('/smrt/settings/getHostDetails', function (req, res) {
        res.send(config.zmq.sendHost)
})

router.get('/smrt/settings/loadingOccupancy/berthRouteNo', function (req, res) {
        settingsModel.findOne({"SettingsConfiguration.id":1},{"SettingsConfiguration.loadingOccupancy":1},function(err,result) {
                if(err)
                        res.send(err)
                res.send(result.SettingsConfiguration.loadingOccupancy)
        })
})
