/**
 * Created by Suhas on 2/12/2016.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var loadingOccupancyInfoSchema =  new Schema({
        "berth" : Number,
        "redQueueBusNumber" : String,
        "greenQueueBusNumber" : String,
        "blueQueueBusNumber" : String,
        "priorityQueueAlertThreshold" :Number,
        "area" : String,
        "occupancy" : Number,
        "timestamp" : Number,
        laneIndex:Number,
        receivedDateTime:Date
},{collection: "loadingOccupancyInfoDoc"});
loadingOccupancyInfoSchema.index({'receivedDateTime':1});
loadingOccupancyInfoSchema.index({'berth':1});
loadingOccupancyInfoSchema.plugin(random);
module.exports = mongoose.model('loadingOccupancyInfo',loadingOccupancyInfoSchema);
