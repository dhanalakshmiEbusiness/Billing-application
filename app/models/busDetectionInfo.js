/**
 * Created by Suhas on 2/12/2016.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var busDetectionInfoSchema =  new Schema({
        "busEntryExitInformation":{
                "cameraExtrinsics" : {
                        "cameraId" : Number,
                        "cameraName" : String,
                        "cameraDirection" : String,
                        "cameraLatitude" : Number,
                        "cameraLongitude" : Number,
                        "cameraHeight" : Number
                },
                "cameraIntrinsics" : {
                        "cameraFocalLength" : Number,
                        "cameraAngle" : Number,
                        "imageWidth" : String,
                        "imageHeight" : String,
                        "frameRate" : Number
                },

                "dateTime" : Date,
                "busEntryExitEvent":[
                        {
                                "plateNumber":String,
                                "direction":String,
                                "routeNumber":Number,
                                "driverID" : String,
                                "driverName" : String,
                                "image":String
                        }
                ]
        }


},{collection: "busDetectionInfo"});
busDetectionInfoSchema.plugin(random);
module.exports = mongoose.model('busDetectionInfo',busDetectionInfoSchema);