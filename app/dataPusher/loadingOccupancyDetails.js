/**
 * Created by Suhas on 2/12/2016.
 */
var mongoose = require('mongoose'),
    loadingOccupancyModel = mongoose.model('loadingOccupancyInfo'),
    socketIo = require('../../config/socketIo').getSocketIoServer();
var loadingOccupancyInfoArr = [];
var pushData = function(data){
    var loadingOccupancyInfoArray = data.loadingZone.occupancyInfo;
    for(var i=0;i<loadingOccupancyInfoArray.length;i++){
        var loadingIndex = loadingOccupancyInfoArray[i].index-1;
        var queueIndex = loadingOccupancyInfoArray[i].queue;
        var queueOccupancy = 0;
         queueOccupancy = loadingOccupancyInfoArray[i].queueOccupancy;
        var laneOccupancyObj ={
            occupancy:queueOccupancy,
            queue:queueIndex
        }
        if(!queueOccupancy){
            queueOccupancy=0;
        }
        loadingOccupancyInfoArr[loadingIndex]=laneOccupancyObj;
        if(i==loadingOccupancyInfoArray.length-1){
            /*console.log(loadingOccupancyInfoArr)*/
        }

    }
    socketIo.emit('loadingOccupancyInfo',loadingOccupancyInfoArr)
}
var pushAggregatedData = function(seconds){
    var start = new Date();
    var end = new Date();
    start.setSeconds(start.getSeconds()-seconds);
    loadingOccupancyModel.aggregate(
            [
                // Stage 1
                {
                    $match: {
                        "receivedDateTime":{$gt:start,$lt:end}
                    }
                },
                {
                    $group: {
                        "_id": {
                            "berthIndex": "$berth",
                            "laneIndex": "$laneIndex"
                        },
                        queueOccupancy:{$last: "$occupancy"}
                    }
                }

            ],
            function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                var loadingData;
                if(result.length>0){
                    var loadingOccupancyValArray = result;
                    loadingData = [[],[],[]]
                    for(var j=0;j<loadingOccupancyValArray.length;j++){
                        var berthIndex = loadingOccupancyValArray[j]._id.berthIndex-1;
                        var laneIndex = loadingOccupancyValArray[j]._id.laneIndex-1;
                        loadingData[laneIndex][berthIndex]=loadingOccupancyValArray[j].queueOccupancy;
                        if(j==loadingOccupancyValArray.length-1){
                            socketIo.emit('loadingOccupancyInfo',loadingData)
                        }
                    }
                }
            });
}
var pushDataForDownload = function(data){
    socketIo.emit('pushDataForDownload',data);
}
module.exports={
    pushData:pushData,
    pushAggregatedData:pushAggregatedData,
    pushDataForDownload:pushDataForDownload
}