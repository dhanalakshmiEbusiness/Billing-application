/**
 * Created by Suhas on 2/17/2016.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var busLotStatusSchema = new mongoose.Schema(
        {
            "receivedDateTime" : Date,
            busParkingArray:Array,

        },{collection: "busLotDataNew"});
busLotStatusSchema.index({ 'receivedDateTime':1});
busLotStatusSchema.plugin(random);
module.exports = mongoose.model('busLotStatusModel',busLotStatusSchema);