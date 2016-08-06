/**
 * Created by Suhas on 2/25/2016.
 */
var mongoose = require('mongoose'),
    elderlyQueueInfoModel = mongoose.model('elderlyQueueModel'),
    socketIo = require('../../config/socketIo').getSocketIoServer(),
        utility=require('../utilities');
var pushData = function(data){
        socketIo.emit('elderlyQueueInfo',data);
}
var pushAggregatedData = function(aggregationTime){
        var start = new Date();
        var end = new Date();
        var seconds=aggregationTime;
        start.setSeconds(start.getSeconds()-seconds);
        elderlyQueueInfoModel.aggregate(
                [
                        // Stage 1
                        {
                                $match: {
                                        "queueLevelInformation.receivedDateTime":{$gt:start,$lt:end}
                                }
                        },
                        // Stage 2
                        {
                                $group: {
                                                "_id":{"berthIndex": "$queueLevelInformation.elderlyQueueLevel.berthIndex"},
                                                queueOccupancy:{$last: "$queueLevelInformation.elderlyQueueLevel.occupancy"}
                                }
                        }

                ],
                function (err, result) {
                        if (err) {
                                console.log(err);
                                return;
                        }
                        socketIo.emit('elderlyAggregationQueueInfo',result);
                });
}
var pushElderlyNotification = function(bertIndex,date,notificationPeriod,threshold){
        var start = date;
        var end = date;
        var seconds=notificationPeriod;
        end.setSeconds(end.getSeconds()-1);
        start.setSeconds(start.getSeconds()+seconds);
        elderlyQueueInfoModel.aggregate(
                [
                        // Stage 1
                        {
                                $match: {/*
                                        "queueLevelInformation.dateTime":{$gt:end,$lt:start},*/
                                        "queueLevelInformation.elderlyQueueLevel.berthIndex":bertIndex
                                }
                        },

                        // Stage 2
                        {
                                $sort: {
                                        "queueLevelInformation.dateTime":-1
                                }
                        },

                        // Stage 3
                        {
                                $group: {
                                        _id:null,
                                        date:{ "$first":"$queueLevelInformation.dateTime"},
                                        occupancy:{ "$first":"$queueLevelInformation.elderlyQueueLevel.occupancy"}
                                }
                        }

                ],
                function (err, result) {
                        var data = {
                                bertIndex:bertIndex,
                                occupancy:0,
                                date:date
                        }
                        if (err){
                                console.log(err);
                                return;
                        }
                        if(result.occupancy>threshold){
                                data.occupancy=result.occupancy;
                                socketIo.emit('elderlyCountNotificationInfo',data);
                        }
                        utility.timeOut.clearIntervalForGivenId(bertIndex-1)

                });
}
module.exports={
        pushData:pushData,
        pushAggregatedData:pushAggregatedData,
        pushElderlyNotification:pushElderlyNotification
}