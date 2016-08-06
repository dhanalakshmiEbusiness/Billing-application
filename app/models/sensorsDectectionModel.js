var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var sensorDetectionSchema = new mongoose.Schema({
"sensors": [{
        "SensorName":String,
        "Status":String,
         "receivedDateTime":Date
    }]
},{collection: "sensorDetection"});
sensorDetectionSchema.plugin(random);
module.exports =mongoose.model('sensorDetection',sensorDetectionSchema);