var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var notifySchema = new mongoose.Schema(
  {
    "smrt": {
      "smrtNotification" : {
        "cameraId" : Number,
        "cameraName" : String,
        "cameraDirection" : String,
        "cameraLatitude" : Number
      }
    },
    "dateTime":Date
  },{collection: "notificationModel"});
notifySchema.plugin(random);
module.exports = mongoose.model('notificationModel',notifySchema);
