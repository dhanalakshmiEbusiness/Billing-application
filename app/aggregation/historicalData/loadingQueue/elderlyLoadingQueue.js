/**
 * Created by zendynamix on 6/10/2016.
 */
var mongoose = require('mongoose')
var elederlyQueueModel = mongoose.model('elderlyQueueModel');
var q= require('q')
var getElderlyDataForDateRange=function(startDate,bertIndex,series,callback){
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
        var promise = getElderlyHistoricalData(aggregationStartDate,aggregationEndDate,bertIndex).then(function(result){
            var occupancy = null;
            if(result.length>0){
                occupancy = Math.round(result[0].occupancy)
            }
            return q(occupancy);
        })
        promises.push(promise)
    }
    q.all(promises).then(function(resultData){
        callback(resultData.reverse())
    })
}
function getElderlyHistoricalData(startDate,endDate,bertIndex){
    var deferred = q.defer();
    var aggregationStartDate = new Date(startDate);
    var aggregationEndDate = new Date(endDate);

    elederlyQueueModel.aggregate(
        // Pipeline
        [
            // Stage 1
            {
                $match: {
                    "queueLevelInformation.receivedDateTime" : {
                        "$gt" : aggregationEndDate,
                        "$lt" : aggregationStartDate
                    },
                    "queueLevelInformation.elderlyQueueLevel.berthIndex":bertIndex
                }
            },

            // Stage 2
            {
                $group: {
                    "_id" : null,
                    "occupancy":{
                        "$avg":"$queueLevelInformation.elderlyQueueLevel.occupancy"
                    }
                }
            },

            // Stage 3
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
                /*console.log(result)*/
            }else if(result && result.length==0){
                deferred.resolve(result);
                /*console.log(result)*/
            }
        }

        // Created with 3T MongoChef, the GUI for MongoDB - http://3t.io/mongochef

    );
    return deferred.promise;
}
module.exports={
    getElderlyDataForDateRange:getElderlyDataForDateRange
}