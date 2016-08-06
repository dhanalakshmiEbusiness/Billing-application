/**
 * Created by Suhas on 2/25/2016.
 */
/*
*/
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var elderlyQueueSchema = new mongoose.Schema(
        {
                "queueLevelInformation": {
                        "cameraExtrinsics": {
                                "cameraId": Number,
                                "cameraName": String,
                                "cameraDirection": String,
                                "cameraLatitude": Number,
                                "cameraLongitude": Number,
                                "cameraHeight": Number
                        },
                        "cameraIntrinsics": {
                                "cameraFocalLength": Number,
                                "cameraAngle": Number,
                                "imageWidth": String,
                                "imageHeight": String,
                                "frameRate": Number
                        },
                        "dateTime": Date, //Date and Time of the Payload genrated
                        "receivedDateTime" : Date,
                        "elderlyQueueLevel": {
                                "berthIndex": Number,
                                "occupancy": Number,  // in %
                                "image": String //Optional [Base 64 encoded String of image]

                        }
                }
        },{collection: "elderlyQueueDoc"});
elderlyQueueSchema.index({ 'queueLevelInformation.receivedDateTime': 1});
elderlyQueueSchema.index({ 'queueLevelInformation.elderlyQueueLevel.berthIndex': 1});
elderlyQueueSchema.plugin(random);
module.exports = mongoose.model('elderlyQueueModel',elderlyQueueSchema);