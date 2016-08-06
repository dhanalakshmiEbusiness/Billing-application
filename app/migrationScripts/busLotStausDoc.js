/**
 * Created by Suhas on 6/16/2016.
 */
var mongoose = require('mongoose'),
    /*busLotStatusModel = mongoose.model('busLotStatusModel'),*/
    busLotStatusModel = require('../models/previousBuslotData.js'),
    config = require('../../config/config');
    mongoose.connect(config.db);
function migrate(){
    var date = new Date('2016-06-16T06:16:23.554+0000')
    busLotStatusModel.aggregate(

        // Pipeline
        [
            // Stage 1
            {
                $match: {
                    "receivedDateTime":{"$lt":date}
                }
            },

            // Stage 2
            {
                $project: {
                    "receivedDateTimeString": { $dateToString: { format: "%Y-%m-%dT%H:%M:%S",date:"$receivedDateTime" } },
                    "receivedDateTime":1,
                    "updateTime":1,
                    "updateDate":1,
                    "time" :1,
                    "date" :1,
                    "batteryStatus" :1,
                    "bayId" : 1,
                    "status" :1
                }
            },

            // Stage 3
            {
                $group: {
                    "_id":"$receivedDateTimeString",
                    "busParkingArray":{
                        $push:
                            {
                                "receivedDateTime" : "$receivedDateTime",
                                "updateTime" : "$updateTime",
                                "updateDate" : "$updateDate",
                                "time" : "$time",
                                "date" : "$date",
                                "batteryStatus" : "$batteryStatus",
                                "bayId" : "$bayId",
                                "status" : "$status"
                            }
                        },
                    "receivedDateTimeArray":
                        {
                            $push:
                            {
                                "dateTime":"$receivedDateTime"
                            }
                        }

                }
            },
            // Stage 4
            {
                $project: {
                    "_id":1,
                    "recievedDateArray1":{
                        $arrayElemAt:["$receivedDateTimeArray",0]},
                        "busParkingArray":"$busParkingArray"
                }
            },

            // Stage 5
            {
                $project: {
                    "_id":0,
                    "receivedDateTime":"$recievedDateArray1.dateTime",
                    "busParkingArray":"$busParkingArray",
                }
            },

            // Stage 6
            {
                $out: "busLotDataNew1"
            }

        ],function(err,result){
            if(err){
             console.log(err.stack)
            }
            if(result){
            console.log("migrated Successfully")
            }
        });
}

migrate();