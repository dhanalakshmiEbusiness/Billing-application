/**
 * Created by zendynamix on 6/10/2016.
 */
var mongoose = require('mongoose')
var loadingQueueModule = mongoose.model('loadingOccupancyInfo');
var q= require('q')
var getLoadingDataForDateRange=function(startDate,bertIndex,series,callback){
    var promises=[];
    var occupancyArray = new Array(60);
    occupancyArray.fill(null);
    var aggregationStartDate = new Date(startDate);
    var aggregationEndDate = new Date(startDate);
    aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
    for(var i=0;i<60;i++){
        if(i==0){

        }else{
            aggregationStartDate.setSeconds(aggregationStartDate.getSeconds()-series)
            aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
        }
        var promise = getHistoricalDataForLoadingOccupancy(aggregationStartDate,aggregationEndDate,bertIndex).then(function(result){
            var occupancy = new Array(3);
            occupancy.fill(null);
            if(result.length>0){
                var berthLaneData = result;
                for(var i=0;i<berthLaneData.length;i++){
                    occupancy[berthLaneData[i]._id-1] = Math.round(berthLaneData[i].occupancy);
                    if(i==berthLaneData.length-1){
                        return q(occupancy);
                    }
                }
            }else{
                return q(occupancy);
            }
        })
        promises.push(promise)
    }
    q.all(promises).then(function(resultData){
        var laneWiseBerthDataArray = new Array(3);
        laneWiseBerthDataArray.fill([])
        var aggregationData = resultData

        for(var i=0;i<aggregationData.length;i++){
            var laneDataOfBerth = aggregationData[i];
            for(var j=0;j<laneDataOfBerth.length;j++){
                if(laneWiseBerthDataArray[j].length==0){
                    laneWiseBerthDataArray[j] = new Array(resultData.length);
                    laneWiseBerthDataArray[j].fill(null);
                }
                laneWiseBerthDataArray[j][i] = laneDataOfBerth[j];
                if(i==aggregationData.length-1 && j==laneDataOfBerth.length-1){
                    /*callback(laneWiseBerthDataArray)*/
                    for(var array=0;array<laneWiseBerthDataArray.length;array++){
                        laneWiseBerthDataArray[array] = laneWiseBerthDataArray[array].reverse();
                        if(array==laneWiseBerthDataArray.length-1){
                            callback(laneWiseBerthDataArray)
                        }

                    }
                }
            }
        }
    })
}
function getHistoricalDataForLoadingOccupancy(startDate,endDate,bertIndex){
    var deferred = q.defer();
    var aggregateStartDate = new Date(startDate);
    var aggregateEndDate = new Date(endDate);
    loadingQueueModule.aggregate(

        // Pipeline
        [
            // Stage 1
            {
                $match: {
                    "receivedDateTime" : {
                        "$gt" : aggregateEndDate,
                        "$lt" : aggregateStartDate
                    }
                }
            },

            // Stage 2
           /* {
                $unwind: "$queueLevelInformation.queueLevel.loadingBerth"
            },*/

            // Stage 3
            {
                $match: {
                    "berth" : bertIndex
                }
            },

            // Stage 4
            /*{
                $unwind: "$queueLevelInformation.queueLevel.loadingBerth.lanes"
            },*/

            // Stage 5
            {
                $group: {
                    "_id" : "$laneIndex",
                    "occupancy" : {"$avg" : "$occupancy"}
                }
            },

            // Stage 6
            {
                $sort: {
                    "_id" : 1
                }
            }

        ],function(err,result){
            if(err){
                console.log(err.stack)
            }else if(result && result.length>0){
                deferred.resolve(result);
            }else if(result && result.length==0){
                deferred.resolve(result);
            }
        }
    );
    return deferred.promise;
}
module.exports={
    getLoadingDataForDateRange:getLoadingDataForDateRange
}
