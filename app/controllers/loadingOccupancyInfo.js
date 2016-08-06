/**
 * Created by Suhas on 2/12/2016.
 */
var express = require('express'),
router = express.Router(),
mongoose = require('mongoose'),
loadingOccupancyModel = mongoose.model('loadingOccupancyInfo'),
random = require('mongoose-simple-random'),
socketIo = require('../../config/socketIo'),
savedataToDb = require('../dataAccessModule').save,
dataPusher=require('../dataPusher'),
settingsModel = mongoose.model('settingModel');
var aggregationModule = require('../aggregation');
var config = require('../../config/config');
var zlib = require('zlib');
module.exports = function (app) {
                app.use('/', router);
        };
var loadingOccupancyIntervalId=0;
var loadingOccupancyAggregationId=0;
var loadingOccupancyRefreshTime=5000;
var loadingOccupancyAggregationTime=2*60;
var loadingOccupancyAggregationStatus=true;

/*For Simulator*/
router.get('/smrt/loadingOccupancy/startDataPush', function (req, res) {
        if(loadingOccupancyIntervalId==0){
                triggerLoadingOccupancyDataPusher();
                res.send("Started")
        }else{
                res.send("Push Already Started So Need To Start Again")
        }
})
router.get('/smrt/loadingOccupancy/stopDataPush', function (req, res) {
        clearInterval(loadingOccupancyIntervalId);
        loadingOccupancyIntervalId=0;
        res.send("loadingOccupancy Data Pusher Stopped")
})
router.get('/smrt/loadingOccupancy/status', function (req, res) {
        var status;
        if(loadingOccupancyIntervalId==0){
                status=false;
                res.send(status);
        }else{
                status=true;
                res.send(status);
        }
})
function triggerLoadingOccupancyDataPusher(){
        loadingOccupancyIntervalId = setInterval(function(){
                loadingOccupancyDataPusher();
        },5000)
}
function loadingOccupancyDataPusher(){
        /*loadingOccupancyModel.findOneRandom(function(err,result){
                if(err){
                        console.log(err)
                }
                if(result){
                        savedataToDb.loadingOccupancyInfoDataHandler.saveData(result);
                        /!*dataPusher.loadOccupancyDetails.pushAggregatedData(result);*!/
                }else{
                        console.log("No Data In Database");
                }
        })*/
}
if(config.settingStatus.simulatorStatus){
        triggerLoadingOccupancyDataPusher();
}
/*triggerLoadingOccupancyDataPusher();*/


/*for push aggregation data to pusher*/
router.get('/smrt/loadingOccupancy/startAggregation', function (req, res) {
        loadingOccupancyAggregationStatus=true;
        if(loadingOccupancyAggregationId==0){
                loadingBayAggregationDataPusher();
                savedataToDb.loadingOccupancyInfoDataHandler.setDataPushType(!loadingOccupancyAggregationStatus);
                res.send("setAggregationTime")
        }else{
                savedataToDb.loadingOccupancyInfoDataHandler.setDataPushType(!loadingOccupancyAggregationStatus);
                res.send("Push Already Started So Need To Start Again")
        }
})
router.get('/smrt/loadingOccupancy/stopAggregation', function (req, res) {
        loadingOccupancyAggregationStatus = false;
        clearInterval(loadingOccupancyAggregationId);
        loadingOccupancyAggregationId=0;
        savedataToDb.loadingOccupancyInfoDataHandler.setDataPushType(!loadingOccupancyAggregationStatus);
        res.send("Loading Occupancy Aggregated  Data Pusher Stopped")
})
router.get('/smrt/loadingOccupancy/aggregationStatus', function (req, res) {
                res.send(loadingOccupancyAggregationStatus);

})
router.get('/smrt/loadingOccupancy/setAggregationTime/:seconds', function (req, res) {
        loadingOccupancyAggregationTime=req.params.seconds;
        res.send("Loading Occupancy Aggregating for "+(req.params.seconds)+" seconds")
})
router.get('/smrt/loadingOccupancy/getAggregationTime', function (req, res) {
        var loadingOccupancyAggregation={
                loadingOccupancyAggregationTime:loadingOccupancyAggregationTime
        }
        res.send(loadingOccupancyAggregation);
})
router.get('/smrt/loadingOccupancy/setAggregationRefreshTime/:refreshTime', function (req, res) {
        if(req.params.refreshTime==="0"){
                loadingOccupancyRefreshTime =5000;
                res.send("Cant set Value Zero!!!!!!!!!!");
        }else{
                loadingOccupancyRefreshTime =parseInt(req.params.refreshTime)
                res.send("Loading Occupancy Aggregating for "+loadingOccupancyRefreshTime+" seconds")
        }
        if(loadingOccupancyAggregationId!=0){
                clearInterval(loadingOccupancyAggregationId);
                loadingBayAggregationDataPusher();
        }
})
router.get('/smrt/loadingOccupancy/getAggregationRefreshTime', function (req, res) {
        var loadingOccupancyAggregation={
                loadingOccupancyRefreshTime:loadingOccupancyRefreshTime
        }
        res.send(loadingOccupancyAggregation);
})
function loadingBayAggregationDataPusher(){
        loadingOccupancyAggregationId = setInterval(function(){
                if(loadingOccupancyAggregationStatus){
                        /*dataPusher.loadOccupancyDetails.pushAggregatedData(loadingOccupancyAggregationTime);*/
                }
        },loadingOccupancyRefreshTime);
}
/*if(loadingOccupancyAggregationStatus){
        loadingBayAggregationDataPusher();
}*/
/*loadingBayAggregationDataPusher();*/
var pipesFirstDoc = true;
var pipesLastDoc = false;
var pipeIndex = 0;
function transform(data){
        if(pipesFirstDoc){
                pipesFirstDoc=false;
                return  "["+JSON.stringify(data) + ",";
        }else if(pipesLastDoc){
                return JSON.stringify(data) + ",{}]";
        }else{
                return JSON.stringify(data) + ",";
        }
        /*let index = 0;*/
 /*       return (data) => {
                return (!(pipeIndex++) ? '[' : ',') + JSON.stringify(data);
        };*/

}


/*savedataToDb.loadingOccupancyInfoDataHandler.setDataPushType(!loadingOccupancyAggregationStatus);*/
router.get('/smrt/userData/loadingOccupancyData/:startDate/:endDate',function(req, res){

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

        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', 'disp-ext-type; filename=loadingOccupancyData.json.gz;creation-date-parm:'+new Date());
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
        loadingOccupancyModel
                .find({"receivedDateTime":{$gt:startDate,$lt:endDate}})
                .stream()
                .pipe(arrayStream)
                .pipe(zlib.createGzip())
                .pipe(res);
})

function getLoadingSettingsDetails(){
        settingsModel.findOne({'SettingsConfiguration.id':1}, function (err, settingsObj) {
                if (err)
                        console.log(err);
                if(settingsObj){
                        loadingOccupancyRefreshTime = settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.refreshTime;
                        loadingOccupancyAggregationStatus = settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.isAggregationStatus;
                        loadingOccupancyAggregationTime=settingsObj.SettingsConfiguration.physicallyChallengedOccupancy.aggregationPeriod;
                        if(loadingOccupancyAggregationStatus && loadingOccupancyAggregationId==0){
                                loadingBayAggregationDataPusher();
                        }
                        savedataToDb.loadingOccupancyInfoDataHandler.setDataPushType(!loadingOccupancyAggregationStatus);
                }
        });
}
getLoadingSettingsDetails();

/*Historical data Api*/
router.get('/loadingOccupancy/historicalData/:seriesSelected/:berthIndex',function(req, res){
        var startDate = new Date();
        var seriesSelected = parseInt(req.params.seriesSelected)
        var berthIndex = parseInt(req.params.berthIndex)
        aggregationModule.historicalData.loadingQueue.loadingQueueAggregation.getLoadingDataForDateRange(startDate,berthIndex,seriesSelected,function(result){
                res.send(result)
        })
})