/**
 * Created by Suhas on 2/25/2016.
 */
var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        elderlyQueueInfoModel = mongoose.model('elderlyQueueModel')
        random = require('mongoose-simple-random'),
        socketIo = require('../../config/socketIo'),
        savedataToDb = require('../dataAccessModule').save,
        dataPusher=require('../dataPusher'),
        utility=require('../utilities'),
        elderlyQueueInfoModel = require('../models/elderlyQueueModel.js'),
        settingsModel = mongoose.model('settingModel');
var aggregationModule = require('../aggregation')
loadingOccupancyModel = mongoose.model('loadingOccupancyInfo');
var config = require('../../config/config');
var constants = require('../../config/constants').constants;
var zlib = require('zlib');

module.exports = function (app) {
        app.use('/', router);
};
var elderlyQueueInfoIntervalId = 0;
var elderlyAggregationTime=2*60;
var elderlyAggregationRefreshTime=5000;
var elderlyAggregateIntervalId=0;
var elderlyOccupancyAggregationStatus = true;

/************************************to switch between start************************************/

router.get('/smrt/elderlyQueue/startDataPush', function (req, res) {
        if(elderlyQueueInfoIntervalId==0){
                triggerElderlyQueueDataPusher();
                res.send("Started")
        }else{
                res.send("Push Already Started So Need To Start Again")
        }
})
router.get('/smrt/elderlyQueue/stopDataPush', function (req, res) {
        clearInterval(elderlyQueueInfoIntervalId);
        elderlyQueueInfoIntervalId=0;
        res.send("Elderly Queue Data Pusher Stopped")
})
router.get('/smrt/elderlyQueue/status', function (req, res) {
        var status;
        if(elderlyQueueInfoIntervalId==0){
                status=false;
                res.send(status);
        }else{
                status=true;
                res.send(status);
        }
})
function triggerElderlyQueueDataPusher(){
        elderlyQueueInfoIntervalId = setInterval(function(){
                elderlyQueueInfoDataPusher();
        },2000)
}
function elderlyQueueInfoDataPusher(){
        elderlyQueueInfoModel.findOneRandom(function(err,result){
                if(err){
                        console.log(err)
                }
                if(result){
                        savedataToDb.elderlyQueueInfoDataHandler.saveData(result);
                        /*dataPusher.loadOccupancyDetails.pushAggregatedData(result);*/
                }else{
                        console.log("No Data In Database");
                }
        })
}
if(config.settingStatus.simulatorStatus){
        triggerElderlyQueueDataPusher();
}
/************************************to switch between aggregate and tick************************************/

router.get('/smrt/elderlyQueue/startAggregate', function (req, res) {
        elderlyOccupancyAggregationStatus = true;
        savedataToDb.elderlyQueueInfoDataHandler.setDataPushType(!elderlyOccupancyAggregationStatus);
        setElderlyAggregationStatus(elderlyOccupancyAggregationStatus)
        if(elderlyAggregateIntervalId==0){
                elderlyOccupancyAggregatePusher();
                res.send("Started")
        }else if(elderlyAggregateIntervalId!=0){
                res.send("Elderly Queue Aggregate Push Already Started So Need To Start Again"+elderlyAggregateIntervalId)
        }
})
router.get('/smrt/elderlyQueue/stopAggregate', function (req, res) {
        elderlyOccupancyAggregationStatus = false;
        setElderlyAggregationStatus(elderlyOccupancyAggregationStatus)
        clearOccupancyAggregatePusher();
        elderlyAggregateIntervalId=0;
        savedataToDb.elderlyQueueInfoDataHandler.setDataPushType(!elderlyOccupancyAggregationStatus);
        res.send("Elderly Queue Aggregate Data Pusher Stopped "+elderlyAggregateIntervalId)
})
router.get('/smrt/elderlyQueue/aggregateStatus', function (req, res) {
        var status;
        if(elderlyAggregateIntervalId==0){
                status=false;
                res.send(status);
        }else{
                status=true;
                res.send(status);
        }
})
router.get('/smrt/elderlyQueue/setAggregationTime/:aggregationRefreshSeconds', function (req, res) {
        if(req.params.aggregationRefreshSeconds==="0"){
                elderlyAggregationTime =5000;
                res.send("Cant set Value Zero!!!!!!!!!! so refresh value set to 5 seconds")
        }else{
                elderlyAggregationTime =parseInt(req.params.aggregationRefreshSeconds);
                res.send("Elderly Occupancy Aggregating for "+elderlyAggregationTime+" seconds")
        }
        setElderlyAndLoadingAggregationRefreshTime(elderlyAggregationRefreshTime)
        if(elderlyOccupancyAggregationStatus && elderlyAggregateIntervalId!=0){
                clearOccupancyAggregatePusher();
                elderlyOccupancyAggregatePusher();
        }
})
router.get('/smrt/elderlyQueue/setAggregationRefreshTime/:elderlyAggregationTime', function (req, res) {
        elderlyAggregationRefreshTime =parseInt(req.params.elderlyAggregationTime);
        setElderlyAndLoadingAggregationPeriod(elderlyAggregationTime)
        res.send("Elderly Occupancy Aggregating for "+elderlyAggregationTime+" seconds")
})

function elderlyOccupancyAggregatePusher(){
        elderlyAggregateIntervalId = setInterval(function(){
                if(elderlyOccupancyAggregationStatus){
                        dataPusher.elderlyQueueInfoDataPusher.pushAggregatedData(elderlyAggregationTime);
                }
        },elderlyAggregationRefreshTime);
}
function clearOccupancyAggregatePusher(){
        clearInterval(elderlyAggregateIntervalId)
}
savedataToDb.elderlyQueueInfoDataHandler.setDataPushType(!elderlyOccupancyAggregationStatus);

/************************************Elderly Notification Code*************************************************/
var notificationElderly = 3000;
router.get('/smrt/elderlyQueue/notification/startTimer/:berthIndex', function (req, res) {
        var bertIndex = req.params.berthIndex;
        var date = new Date();
        var length = utility.timeOut.setTimeOut(bertIndex-1,notifyElderlyCount(bertIndex,date,notificationElderly),notificationElderly);
       /* res.send("Elderly Queue notification timer Started for berth index "+bertIndex)*/
        res.sendStatus(length)

})
router.get('/smrt/elderlyQueue/notification/stopTimer/:berthIndex', function (req, res) {
        var berthIndex = req.params.berthIndex;
        var length = utility.timeOut.clearIntervalForGivenId(berthIndex-1);
        res.sendStatus(new Date("2016-03-02T13:38:19.531+0000"))
})
function notifyElderlyCount(bertIndex,date,notificationPeriod){
        dataPusher.elderlyQueueInfoDataPusher.pushElderlyNotification(bertIndex,date,notificationPeriod);
}


/***********************************************downloading Data***********************************************/
router.get('/smrt/userData/elderlyOccupancyInfo/:startDate/:endDate',
function (req, res) {
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', 'disp-ext-type; filename=physicallyChallengedData.json.gz;creation-date-parm:'+new Date());
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
        /* var endDateLimit= new Date(req.params.endDate)*/
        console.log(constants.LOADING_OCCUPANCY.ELDERLY_QUEUE_AREA)
        elderlyQueueInfoModel.find({"queueLevelInformation.receivedDateTime":{$gt:startDate,$lt:endDate}})
                .stream()
                .pipe(arrayStream)
                .pipe(zlib.createGzip())
                .pipe(res);
})


/***********************************************Getting Data From Settings Page***********************************************/
function getElderlySettingsDetails(){
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        elderlyAggregationRefreshTime = settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.refreshTime;
                        elderlyOccupancyAggregationStatus = settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.isAggregationStatus;
                        elderlyAggregationTime=settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.aggregationPeriod;
                        if(elderlyOccupancyAggregationStatus && elderlyAggregateIntervalId==0){
                                        elderlyOccupancyAggregatePusher();
                                }
                        savedataToDb.elderlyQueueInfoDataHandler.setDataPushType(!elderlyOccupancyAggregationStatus);
                }
        });
}
getElderlySettingsDetails();
function setElderlyAggregationStatus(flag){
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.isAggregationStatus=flag;
                        settingsObj.save(function(err1){
                                if(err1)
                                       console.log(err1)
                                console.log("changed Status")
                        })
                }
        });
}
function setElderlyAndLoadingAggregationRefreshTime(aggRefreshTime){
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.refreshTime=aggRefreshTime;
                        settingsObj.SettingsConfiguration.loadingOccupancyAggregation.refreshTime=aggRefreshTime;
                        settingsObj.save(function(err1){
                                if(err1)
                                        console.log(err1)
                                console.log("changed aggregation Details")
                        })
                }
        });
}
function setElderlyAndLoadingAggregationPeriod(aggPeriod){
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.aggregationPeriod=aggPeriod;
                        settingsObj.SettingsConfiguration.loadingOccupancyAggregation.aggregationPeriod=aggPeriod;
                        settingsObj.save(function(err1){
                                if(err1)
                                        console.log(err1)
                                console.log("changed aggregation Details")
                        })
                }
        });
}


/*Historical data Api*/
router.get('/elderlyLoadingOccupancy/historicalData/:seriesSelected/:berthIndex',function(req, res){
        var startDate = new Date();
        var seriesSelected = parseInt(req.params.seriesSelected)
        var berthIndex = parseInt(req.params.berthIndex)
        aggregationModule.historicalData.loadingQueue.elderlyLoadingQueue.getElderlyDataForDateRange(startDate,berthIndex,seriesSelected,function(result){
                res.send(result)
        })
})