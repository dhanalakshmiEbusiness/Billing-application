/**
 * Created by Suhas on 2/23/2016.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var busEntryExitSchema =  new Schema({
        "plate":String,// bus registration/plate number,
        "direction":String,// “ENTRY” or “EXIT”
        "timestamp":Number,
        "snapshot":String,// Optional [Base 64 encoded String of image],
        "receivedDateTime":Date
},{collection: "busEntryExitDoc"});
/*busEntryExitSchema.index({ 'busEntryExitInformation.receivedDateTime': 1});*/
busEntryExitSchema.index({'receivedDateTime':1});
busEntryExitSchema.plugin(random);
module.exports = mongoose.model('busEntryExitInfo',busEntryExitSchema);