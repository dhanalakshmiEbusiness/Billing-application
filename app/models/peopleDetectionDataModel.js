/**
 * Created by Suhas on 2/12/2016.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var peopleDetectionDataSchema =  new Schema({
        "demographicInformation": {
                "cameraExtrinsics": {
                        "cameraId": Number,
                        "cameraName": String,
                        "cameraDirection": String,
                        "cameraLatitude": Number,
                        "cameraLongitude": Number,
                        "cameraHeight": Number // in feet from ground
                },
                "cameraIntrinsics": {
                        "cameraFocalLength": Number, // in mm
                        "cameraAngle": Number, // in degrees wrt horizontal plane
                        "imageWidth": String,
                        "imageHeight": String,
                        "frameRate": Number // Frames per second
                },
                "dateTime": Date,
                "receivedDateTime" : Date,
                "personDetectionEvent": [{
                        "gender": String, //[MALE or FEMALE]
                        "age": Number,
                        "ethnicity":String // optional
                }]
        }
},{collection: "peopleDetectionDoc"});
peopleDetectionDataSchema.plugin(random);
module.exports = mongoose.model('peopleDetectionModel',peopleDetectionDataSchema);