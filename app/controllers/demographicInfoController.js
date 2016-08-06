/**
 * Created by Suhas on 2/15/2016.
 */
var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        peopleDetectionDataModel = mongoose.model('peopleDetectionModel'),
        random = require('mongoose-simple-random'),
        saveDataToDb = require('../dataAccessModule').save,
        dataPusher=require('../dataPusher'),
        socketIo = require('../../config/socketIo').getSocketIoServer(),
        multipleSocket=require('../multipleSocket'),
        settingsModel = mongoose.model('settingModel');
        var config = require('../../config/config');
module.exports = function (app) {
        app.use('/', router);
};
var demographicDataSimulatorId=0;
var aggregationStatus;
var aggregationRefreshTime=5000;
var demoGraphicAggregatePusherId=0;
router.get('/smrt/peopleDetectionData/startDataPush', function (req, res) {
        if(demographicDataSimulatorId==0){
                triggerPeopleDetectionDataPusher();
                res.send("started")
        }else{
                 res.send("Push Already Started No Need To Start Again")
        }
})
router.get('/smrt/peopleDetectionData/stopDataPush', function (req, res) {
        clearInterval(demographicDataSimulatorId);
        demographicDataSimulatorId=0;
        res.send("Demography Data Pusher Stopped")
})
function triggerPeopleDetectionDataPusher(){
        demographicDataSimulatorId = setInterval(function(){
                loadingOccupancyDataPusher();
        },5000)
        console.log("started Demographic Data Pusher");
}
function loadingOccupancyDataPusher(){
        peopleDetectionDataModel.findOneRandom(function(err,result){
                if(err){
                        console.log(err)
                }
                if(result){
                        saveDataToDb.demographicInfoDataHandler.saveData(result);
                }else{
                        console.log("No Data In Database");
                }
        })
}

if(config.settingStatus.simulatorStatus){
        triggerPeopleDetectionDataPusher();
}

socketIo.on('connection', function (newSocket) {
        if(newSocket){
                var connId = newSocket.id;
                newSocket.on("setDemographicConfigurationForSeconds",function(seconds){
                        dataPusher.demographyRelatedDataPush.pushAggregatedData();
                        multipleSocket.setSocketClientDetails.setSecondsForDemographicGraph(seconds,connId);
                })
        }
});
router.get('/smrt/peopleDetectionData/status', function (req, res) {
        var status;
        if(demographicDataSimulatorId==0){
                status = false;
                res.send(status);
        }else{
                status=true;
                res.send(status);
        }
})


/**********************Aggregation Code**********************/
function demoGraphicAggregationDataPusher(){
        demoGraphicAggregatePusherId = setInterval(function(){
                dataPusher.demographyRelatedDataPush.pushAggregatedData();
        },aggregationRefreshTime);
}
function clearDemographicAggregationDataPusher(){
        clearInterval(demoGraphicAggregatePusherId);
        demoGraphicAggregatePusherId=0;
}
function getDemographicAggregationDetails(){
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result) {
                if(err)
                        console.log(err)
                aggregationRefreshTime=result.SettingsConfiguration.demographicDetails.aggregationRefreshTime;
                aggregationStatus=result.SettingsConfiguration.demographicDetails.isAggregation;
                if(aggregationStatus && demographicDataSimulatorId==0){
                        clearDemographicAggregationDataPusher();
                        demoGraphicAggregationDataPusher();
                }
        })
}
getDemographicAggregationDetails();
/*function setDemographicRefreshTime(timeInMilliSeconds){
         demoGraphicAggregatePusherId = settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.demographicDetails.aggregationRefreshTime=timeInMilliSeconds;
                        settingsObj.save(function(err1){
                                if(err1)
                                        res.send(err)
                                console.log("saved settings details of demographic show gender as   :"+timeInMilliSeconds)
                        })
                }
        });
}*/

router.get('/smrt/settings/getDemographicShowGenderStatus', function (req, res) {
        settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result){
                if(err)
                        res.send(err)
                res.send(result.SettingsConfiguration.demographicDetails)
        })
})
router.get('/smrt/settings/setDemographicShowGenderStatus/:status', function (req, res) {
                aggregationStatus=req.params.status;
                if(aggregationStatus=="true"){
                        aggregationStatus=true;
                }
                else{
                        aggregationStatus=false;
                }
                if(aggregationStatus && demoGraphicAggregatePusherId==0){
                        clearDemographicAggregationDataPusher();
                        demoGraphicAggregationDataPusher();
                        console.log('Demographic Aggregation  Started')
                }
                else if(aggregationStatus && demoGraphicAggregatePusherId!=0){
                        console.log('Demographic Aggregation Already Started')
                }
                else if(!aggregationStatus){
                        clearDemographicAggregationDataPusher();
                        console.log('Demographic Aggregation Stopped')
                }
                setDemographicAggregationStatus(aggregationStatus)
        res.send("saved settings details of demographic show gender as "+req.params.status)
})

function setDemographicAggregationStatus(flag){
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.demographicDetails.showGenderCount=flag;
                        settingsObj.SettingsConfiguration.demographicDetails.isAggregation=flag;
                        aggregationStatus=flag;
                        settingsObj.save(function(err1){
                                if(err1)
                                        console.log(err)
                                console.log("saved settings details of demographic show gender as "+flag)
                        })
                }
        });
}