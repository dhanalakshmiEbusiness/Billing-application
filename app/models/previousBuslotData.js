/**
 * Created by Suhas on 6/15/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var busLotStatusPreviousSchema = new mongoose.Schema(
    {
        "bayId":String,
        "status":Number,
        "batteryStatus":String,
        "receivedDateTime" : Date,
        "date":String,
        "time":String,
        "updateDate":String,
        "updateTime":String,

    },{collection: "busLotStatusPreviousDoc"});
module.exports = mongoose.model('busLotStatusModel1',busLotStatusPreviousSchema);