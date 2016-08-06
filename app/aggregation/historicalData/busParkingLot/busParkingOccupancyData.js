/**
 * Created by Suhas on 6/13/2016.
 */
var q = require('q'),
    mongoose=require('mongoose'),
busLotStatusModel = mongoose.model('busLotStatusModel');
var getBusParkingOccupancy = function(startDate,seriesSelected,callback){
    var promises=[];
    var occupancyArray = new Array(60);
    occupancyArray.fill(null);
    var aggregationStartDate = new Date(startDate);
    var aggregationEndDate = new Date(startDate);
    var series = parseInt(seriesSelected);
    aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
    for(var i=0;i<60;i++){
        if(i==0){

        }else{
            aggregationStartDate.setSeconds(aggregationStartDate.getSeconds()-series)
            aggregationEndDate.setSeconds(aggregationEndDate.getSeconds()-series)
        }
        var promise = calculateBusParkingHistoricalData(aggregationStartDate,aggregationEndDate).then(function(result){
            var data={
                "unloadingBayData": {
                    "occupied":null,
                    "notOccupied":null,
                    "maintained":null,
                },
                "busParking": {
                    "occupied":null,
                    "notOccupied":null,
                    "maintained":null
                }
            }
            if(result.length>0){
                data= result[0];
            }
            return q(data);
        })
        promises.push(promise)
    }
    q.all(promises).then(function(resultData){
       var aggregatedData = resultData.reverse();
        var dataContent = {
            "unloadingBayData": {
                "occupied":new Array(resultData.length),
                "notOccupied":new Array(resultData.length),
                "maintained":new Array(resultData.length),
            },
            "busParking": {
                "occupied":new Array(resultData.length),
                "notOccupied":new Array(resultData.length),
                "maintained":new Array(resultData.length)
            }

        };
        dataContent.unloadingBayData.occupied.fill(null);
        dataContent.unloadingBayData.notOccupied.fill(null);
        dataContent.unloadingBayData.maintained.fill(null);
        dataContent.busParking.occupied.fill(null);
        dataContent.busParking.notOccupied.fill(null);
        dataContent.busParking.maintained.fill(null);
        for(var i=0;i<aggregatedData.length;i++){
            var obj = aggregatedData[i];
            var unloadingObj = obj.unloadingBayData;
            var busParkingObj = obj.busParking;
            dataContent.unloadingBayData.occupied[i]=unloadingObj.occupied;
            dataContent.unloadingBayData.notOccupied[i]=unloadingObj.notOccupied;
            dataContent.unloadingBayData.maintained[i]=unloadingObj.maintained;
            dataContent.busParking.occupied[i]=busParkingObj.occupied;
            dataContent.busParking.occupied[i]=busParkingObj.occupied;
            dataContent.busParking.occupied[i]=busParkingObj.occupied;
            if(i===aggregatedData.length-1){
                callback(dataContent)
            }
        }

    })
}
function calculateBusParkingHistoricalData(startDate,endDate){
    var deferred = q.defer();
    var aggregationStartDate = new Date(startDate);
    var aggregationEndDate = new Date(endDate);

    busLotStatusModel.aggregate(

        // Pipeline
        [
            // Stage 1
            {
                $match: {
                    "receivedDateTime" : {
                        "$gt" : aggregationEndDate,
                        "$lt" : aggregationStartDate
                    }
                }
            },

            // Stage 2
            {
                $unwind: '$busParkingArray'
            },

            // Stage 3
            {
                $project: {
                    "receivedDateTime":1,
                    "busParkingData": {
                        'bayId':{$substr:[ "$busParkingArray.bayid",0,1] },
                        'bayStaus':'$busParkingArray.status'
                    },

                }
            },

            // Stage 4
            {
                $group: {
                    "_id":"$receivedDateTime",
                    "totalCount":{$sum:1},
                    "occupiedCount(loading)" : {
                        "$sum" : {
                            "$cond" : [
                                {
                                    "$and":[
                                        {"$eq" : ["$busParkingData.bayId","A"]},
                                        {"$eq" : ["$busParkingData.bayStaus","1"]}
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    "notOccupiedCount(loading)" : {
                        "$sum" : {
                            "$cond" : [
                                {
                                    "$and":[
                                        {"$eq" : ["$busParkingData.bayId","A"]},
                                        {"$eq" : ["$busParkingData.bayStaus","0"]}
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    "maintainedCount(loading)" : {
                        "$sum" : {
                            "$cond" : [
                                {
                                    "$and":[
                                        {"$eq" : ["$busParkingData.bayId","A"]},
                                        {"$eq" : ["$busParkingData.bayStaus","2"]}
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },"occupiedCount(parking)" : {
                        "$sum" : {
                            "$cond" : [
                                {
                                    "$and":[
                                        {"$ne" : ["$busParkingData.bayId","A"]},
                                        {"$eq" : ["$busParkingData.bayStaus","1"]}
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    "notOccupiedCount(parking)" : {
                        "$sum" : {
                            "$cond" : [
                                {
                                    "$and":[
                                        {"$ne" : ["$busParkingData.bayId","A"]},
                                        {"$eq" : ["$busParkingData.bayStaus","0"]}
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    "maintainedCount(parking)" : {
                        "$sum" : {
                            "$cond" : [
                                {
                                    "$and":[
                                        {"$ne" : ["$busParkingData.bayId","A"]},
                                        {"$eq" : ["$busParkingData.bayStaus","2"]}
                                    ]
                                },
                                1,
                                0
                            ]
                        }
                    }
                }
            },

            // Stage 5
            {
                $group: {
                    "_id":null,
                    "totalCount":{$sum:1},
                    "occupiedAvg(loading)":{$avg:"$occupiedCount(loading)"},
                    "notOccupiedAvg(loading)":{$avg:"$notOccupiedCount(loading)"},
                    "maintainedAvg(loading)":{$avg:"$maintainedCount(loading)"},
                    "occupiedAvg(parking)":{$avg:"$occupiedCount(parking)"},
                    "notOccupiedAvg(parking)":{$avg:"$notOccupiedCount(parking)"},
                    "maintainedAvg(parking)":{$avg:"$maintainedCount(parking)"},
                }
            },{
            $project: {
                "_id":0,
                "unloadingBayData": {
                    "occupied":{$floor:"$occupiedAvg(loading)"},
                    "notOccupied":{$floor:"$notOccupiedAvg(loading)"},
                    "maintained":{$floor:"$maintainedAvg(loading)"},
                },
                "busParking": {
                    "occupied":{$floor:"$occupiedAvg(parking)"},
                    "notOccupied":{$floor:"$notOccupiedAvg(parking)"},
                    "maintained":{$floor:"$maintainedAvg(parking)"},
                }

            }
        },

        ],function(err,result){
            if(err){
                console.log(err.stack)
            }else if(result  && result.length>0){
                deferred.resolve(result)
            }else if(result  && result.length==0){
                deferred.resolve(result)
            }
        });

    return deferred.promise;

}
module.exports={
    getBusParkingOccupancy:getBusParkingOccupancy
}
