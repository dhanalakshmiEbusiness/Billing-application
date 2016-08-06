/**
 * Created by Suhas on 6/11/2016.
 */
var mongoose = require('mongoose')
var busEntryExitModel = mongoose.model('busEntryExitInfo');
var constants = require(__dirname+'/../../../../config/constants').constants;
var q = require('q');
var busEntryOrExitHistoricalData = function(startDate, status, series, callback){
    var aggregationStartDate = new Date(startDate)
    var aggregationEndDate = new Date(startDate)
    console.log(series)
    aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
    var promises=[];
    for(var i=0;i<60;i++){
        if(i==0){

        }else{
            aggregationStartDate.setSeconds(aggregationStartDate.getSeconds()-series)
            aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
        }
        var promise=getBusEntryOrExitHistoricalData(aggregationStartDate,aggregationEndDate,status).then(function(result){
            var count = 0;
            /*console.log(result)*/
            if(result.length>0){
                count = result[0].count
            }
            return q(count);
        })
        promises.push(promise)
    }
    q.all(promises).then(function(resultData){
        callback(resultData.reverse())
    })

}
var busEntryAndExitHistoricalData = function(startDate,series, callback){
    var aggregationStartDate = new Date(startDate)
    var aggregationEndDate = new Date(startDate)
    aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
    var promises=[];
    for(var i=0;i<60;i++){
        if(i==0){
        }else{
            aggregationStartDate.setSeconds(aggregationStartDate.getSeconds()-series)
            aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
        }
        var promise=getBusEntryAndExitHistoricalData(aggregationStartDate,aggregationEndDate).
        then(function(result){
            var count={
                busEntryCount:0,
                busDepartureCount:0
            };
            /*console.log(result)*/
            if(result.length>0){
                count={
                    busEntryCount:result[0].busEntryCount,
                    busDepartureCount:result[0].busDepartureCount
                };
            }
            return q(count);
        })
        promises.push(promise)
    }
    q.all(promises).then(function(resultData){
        var countData = resultData.reverse();
        var BusEntryExitArray = [[],[]]
        for(var i=0;i<countData.length;i++){
            BusEntryExitArray[0].push(countData[i].busEntryCount);
            BusEntryExitArray[1].push(countData[i].busDepartureCount)
            console.log(i)
            if(i==countData.length-1){
                callback(BusEntryExitArray)
            }
        }
    })

}
function getBusEntryOrExitHistoricalData(startDate, endDate, status){
    var deferred = q.defer();
    var aggregationStartDate1 = new Date(startDate)
    var aggregationEndDate1 = new Date(endDate)
    busEntryExitModel.aggregate(

        // Pipeline
        [
            // Stage 1
            {
                $match: {
                    "busEntryExitInformation.receivedDateTime" : {
                        "$gt" :aggregationEndDate1,
                        "$lt" :aggregationStartDate1
                    }
                }
            },

            /*// Stage 2
            {
                $unwind: "$busEntryExitInformation.busEntryExitEvent"
            },*/

            // Stage 3
            {
                $match: {
                    "direction" :status
                }
            },

            // Stage 4
            {
                $group: {
                    "_id" :null,
                    "count":{"$sum":1}
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

        });
    return deferred.promise;
}
function getBusEntryAndExitHistoricalData(startDate,endDate){
    var deferred = q.defer();
    var aggregationStartDate1 = new Date(startDate)
    var aggregationEndDate1 = new Date(endDate)
    busEntryExitModel.aggregate(

        // Pipeline
        /*[
            // Stage 1
            {
                $match: {
                    "receivedDateTime" : {
                        "$gt" :aggregationEndDate1,
                        "$lt" :aggregationStartDate1
                    }
                }
            },

            // Stage 2
           /!* {
                $unwind: "$busEntryExitInformation.busEntryExitEvent"
            },*!/

            // Stage 4
            {
                $group: {
                    "_id" :null,
                    "busEntryCount":{"$sum" : {"$cond" :
                        [{"$eq" : ["$direction","entrance"]},1,0]}},
                    "busDepartureCount":{"$sum" : {"$cond" :
                        [{"$eq" : ["$direction","exit"]},1,0]}}
                }
            }

        ]*/
        [
            // Stage 1
            {
                $match: {
                    "receivedDateTime":{"$gt":aggregationEndDate1,"$lt":aggregationStartDate1}
                }
            },

            // Stage 2
            {
                $group: {
                    "_id" :null,
                    "busEntryCount":{"$sum" : {"$cond" :[{"$eq" : ["$direction",constants.BUS_NUMBER_PLATE_DETECTION.BUS_ENTRANCE]},1,0]}},
                    "busDepartureCount":{"$sum" : {"$cond" :[{"$eq" : ["$direction",constants.BUS_NUMBER_PLATE_DETECTION.BUS_DEPARTURE]},1,0]}}
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

        });
    return deferred.promise;
}
module.exports={
    busEntryOrExitHistoricalData:busEntryOrExitHistoricalData,
    busEntryAndExitHistoricalData:busEntryAndExitHistoricalData
}