/**
 * Created by Suhas on 2/15/2016.
 */
var mongoose = require('mongoose'),
        peopleDetectionDataModel = mongoose.model('peopleDetectionModel'),
        socketIo=require('../../config/socketIo').getSocketIoServer(),
        socketClientDetails = require('../multipleSocket');
var pushAggregatedDataOfDemographicInfoBasedOnAgeRangeData = function(){
        var clientDetails = socketClientDetails.socketClientDetails.getSocketArrayDetails();
        if(clientDetails){
                for(var i=0;i<clientDetails.length;i++){
                        var clientDetail=clientDetails[i];
                        aggregateFunctionToGetAgeCountByRange(clientDetail);
                        /*pushAggregatedDataByGender(clientDetail);*/
                }
        }
}
var aggregateFunctionToGetAgeCountByRange = function(clientDetail){
        var start = new Date();
        var end = new Date();
        var seconds=clientDetail.details.demographicRelatedData.secondsSelected;
        var connId=clientDetail.id;
        /*console.log("clientid   "+connId+"    seconds   "+seconds);*/
        start.setSeconds(start.getSeconds()-seconds);
        peopleDetectionDataModel.aggregate(
                [{
                        $match: {
                                "demographicInformation.receivedDateTime":{$gt:start,$lt:end}
                        }
                },
                        {
                                $unwind: "$demographicInformation.personDetectionEvent"
                        },
                        {
                                $group: {
                                        "_id" : null,
                                        "0-10":{"$sum" : {"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",10]},{"$gt":["$demographicInformation.personDetectionEvent.age",5]}]},1,0]}},
                                        "11-20":{"$sum":{"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",20]},{"$gt":["$demographicInformation.personDetectionEvent.age",11]}]},1,0]}},
                                        "21-30":{"$sum":{"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",30]},{"$gt":["$demographicInformation.personDetectionEvent.age",21]}]},1,0]}},
                                        "31-40":{"$sum":{"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",40]},{"$gt":["$demographicInformation.personDetectionEvent.age",31]}]},1,0]}},
                                        "41-50":{"$sum":{"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",50]},{"$gt":["$demographicInformation.personDetectionEvent.age",41]}]},1,0]}},
                                        "51-60":{"$sum":{"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",60]},{"$gt":["$demographicInformation.personDetectionEvent.age",51]}]},1,0]}},
                                        "61-70":{"$sum":{"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",70]},{"$gt":["$demographicInformation.personDetectionEvent.age",61]}]},1,0]}},
                                        "71-100":{"$sum":{"$cond":[{"$and":[{"$lt":["$demographicInformation.personDetectionEvent.age",100]},{"$gt":["$demographicInformation.personDetectionEvent.age",71]}]},1,0]}},
                                        "male":{"$sum" : {"$cond":[{ $eq: [ "$demographicInformation.personDetectionEvent.gender", "MALE" ] } ,1,0]}},
                                        "female":{"$sum" : {"$cond":[{ $eq: [ "$demographicInformation.personDetectionEvent.gender", "FEMALE" ] } ,1,0]}},
                                        "adultCount":{"$sum":{"$cond":[{"$gt":["$demographicInformation.personDetectionEvent.age",60]},1,0]}},
                                        "elderCount":{"$sum":{"$cond":[{"$lt":["$demographicInformation.personDetectionEvent.age",60]},1,0]}}
                                }
                        }
                ],
                function (err, result) {
                        if (err) {
                                console.log(err);
                                return;
                        }
                        var data;
                        if(result.length<=0){
                                data=[{"0-10":0,"11-20":0,"21-30":0,"31-40":0,"41-50":0,"51-60":0,"61-70":0,"71-100":0,"male":0,"female":0,"adultCount":0,"elderCount":0}]
                        }else{
                                data=result;
                        }
                        emitDemographicDataForGraph(data,connId);
                        /*socketIo.to(connId).emit('personNotifiedForASelectedPeriodOfTime',data)*/
                });
}
function emitDemographicDataForGraph(data, connId){
        socketIo.to(connId).emit('personNotifiedForASelectedPeriodOfTime',data)
}
/*var pushAggregatedDataByGender=function(clientDetail){
        var start = new Date();
        var end = new Date();
        var seconds=clientDetail.details.demographicRelatedData.secondsSelected;
        start.setSeconds(start.getSeconds()-seconds);
        var connId=clientDetail.id;
        peopleDetectionDataModel.aggregate(
            [{
                    $match: {
                            "demographicInformation.dateTime":{$gt:start,$lt:end}
                    }
            },
                    {
                            $unwind: "$demographicInformation.personDetectionEvent"
                    },
                    {
                            $group: {
                                    "_id":"$demographicInformation.personDetectionEvent.gender",
                                    "count": { $sum: 1 }
                            }
                    }
            ],
            function (err, result) {
                    if (err) {
                            console.log(err);
                            return;
                    }
                    var data={
                            MALE:0,
                            FEMALE:0
                    };
                    if(result.length>0){
                            for(var j=0;j<result.length;j++){
                                data[result[j]._id]=result[j].count
                                    if(j==result.length-1){
                                        console.log(data);
                                    }
                            }
                    }
                    socketIo.to(connId).emit('genderCountForPeriodOfTime',data)
            });
}*/
module.exports={
        pushAggregatedData:pushAggregatedDataOfDemographicInfoBasedOnAgeRangeData
}