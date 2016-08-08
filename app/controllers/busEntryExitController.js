/**
 * Created by Suhas on 2/23/2016.
 */
var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        random = require('mongoose-simple-random'),
        request = require("request"),
        busEntryExitModel = mongoose.model('busEntryExitInfo'),
        saveDataToDb=require('../dataAccessModule');
var aggregationModule = require('../aggregation');
var zlib = require('zlib')
var config = require('../../config/config');
var constants = require('../../config/constants').constants;

var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secrete password';
module.exports = function (app) {
        app.use('/', router);
};
var busEntryExitDataSimulatorId=0;
router.get('/smrt/busEntryExitData/startDataPush', function (req, res) {
        if(busEntryExitDataSimulatorId==0){
                triggerBusEntryExitDataPusher();
                res.send("started")
        }else{
                res.send("Push Already Started No Need To Start Again")
        }
})
router.get('/smrt/busEntryExitData/stopDataPush', function (req, res) {
        clearInterval(busEntryExitDataSimulatorId);
        busEntryExitDataSimulatorId=0;
        res.send("Bus Entry Exit Data Pusher Stopped")
})
function triggerBusEntryExitDataPusher(){
        busEntryExitDataSimulatorId = setInterval(function(){
                busEntryExitDataPusher();
                console.log("Started Bus")
        },10000)
        console.log("started busEntryExit Data Pusher");
}
function busEntryExitDataPusher(){
        busEntryExitModel.findOneRandom(function(err,result){
                if(err){
                        console.log(err)
                }
                if(result){
                        saveDataToDb.save.busEntryExitInfoDataHandler.saveData(result);
                }else{
                        console.log("No Data In Database (BEE)");
                }
        })
}

if(config.settingStatus.simulatorStatus){
    triggerBusEntryExitDataPusher();
}
router.get('/smrt/busEntryExitData/status', function (req, res) {
        var status;
        if(busEntryExitDataSimulatorId==0){
                status = false;
                res.send(status);
        }else{
                status=true;
                res.send(status);
        }
})
router.get('/smrt/busEntryExitData/count', function (req, res) {
        busEntryExitModel.aggregate(
                [
                       /* // Stage 1
                        {
                                $unwind: '$busEntryExitInformation.busEntryExitEvent'
                        },
*/
                        // Stage 2
                        {
                                $sort: {
                                        'receivedDateTime':-1
                                }
                        },

                        // Stage 3
                        {
                                $group: {
                                        _id:null,
                                        "EntryCount":{"$sum" : {"$cond":[{ $eq: [ "$direction", constants.BUS_NUMBER_PLATE_DETECTION.BUS_ENTRANCE] } ,1,0]}},
                                        "ExitCount":{"$sum" : {"$cond":[{ $eq: [ "$direction", constants.BUS_NUMBER_PLATE_DETECTION.BUS_DEPARTURE] } ,1,0]}},
                                }
                        }

                ],
        function (err, result) {
                        if (err) {
                                console.log(err);
                                return;
                        }
                     res.send(result)
                })

})
router.get('/smrt/busEntryExitData/skip/:skip/limit/:limit/type/:type', function (req, res) {
        var skip = parseInt(req.params.skip);
        var limit = parseInt(req.params.limit);
        var type = req.params.type;

        busEntryExitModel.aggregate(
                // Pipeline
                [
                        /*// Stage 1
                        {
                                $unwind: '$busEntryExitInformation.busEntryExitEvent'
                        },
*/
                        // Stage 2
                        {
                                $sort: {
                                        'receivedDateTime':-1
                                }
                        },

                        // Stage 3
                        {
                                $match: {
                                        "direction":type
                                }
                        },

                        // Stage 4
                        {
                                $skip: skip
                        },

                        // Stage 5
                        {
                                $limit: limit
                        }

                ],function (err, result) {
                        if (err) {
                                console.log(err);
                                return;
                        }
                        console.log(result)
                        res.send(result)
                }
        );
})

router.get('/smrt/remove/busArrival', function (req, res) {
        busEntryExitModel.update(
            {},
            { $pull: { 'busEntryExitInformation.busEntryExitEvent' : {'direction' : constants.BUS_NUMBER_PLATE_DETECTION.BUS_ENTRANCE} } },
            { multi: true }, function (err, catRes){
                    if(err){
                            res.send(err);
                    }
                    res.send(" upadted successfuly")
            })
})


router.get('/smrt/remove/departure', function (req, res) {
        busEntryExitModel.update(
            {},
            { $pull: { 'busEntryExitInformation.busEntryExitEvent' : {'direction' : constants.BUS_NUMBER_PLATE_DETECTION.BUS_DEPARTURE} } },
            { multi: true }, function (err, catRes){
                    if(err){
                            res.send(err);
                    }
                    res.send(" upadted successfuly")
            })
})





router.get('/smrt/userData/busEntryExit/:startDate/:endDate', function (req, res) {
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', 'disp-ext-type; filename=busEntryExitData.json.gz;creation-date-parm:'+new Date());
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

        /*res.write("[")*/
        busEntryExitModel
                .find({"receivedDateTime":{$gt:startDate,$lt:endDate}})
                .stream()
                .pipe(arrayStream)
                .pipe(zlib.createGzip())
                .pipe(res);
})

/*Historical data Api*/
router.get('/busEntryExit/historicalData/both/:seriesSelected',function(req, res){
    var startDate = new Date();
    var seriesSelected = parseInt(req.params.seriesSelected);
    aggregationModule.historicalData.busDataEntryExit.busDataEntryExit.busEntryAndExitHistoricalData(startDate,seriesSelected,function(result){
        res.send(result)
    })
})
router.get('/busEntryExit/historicalData/:status/:seriesSelected',function(req, res){
    var startDate = new Date();
    var seriesSelected = parseInt(req.params.seriesSelected)
    var status = req.params.status
    aggregationModule.historicalData.busEntryExit.busDataEntryExit.busEntryOrExitHistoricalData(startDate,status,seriesSelected,function(result){
        res.send(result)
    })
})
