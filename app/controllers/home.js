var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  random = require('mongoose-simple-random'),
  request = require("request");



var bCrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt
var secret = 'this is the secrete password';
module.exports = function (app) {
  app.use('/', router);
};
/*var SocketIo = require('../multipleSocket/socketIo');
router.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized Token Is not present');
  }
});
var getMsg= function(){
  var noOfCar = randomInt(20,100)
  var lane = randomInt(1,4)
  var terminal = randomInt(1,3)
  var iconClass = noOfCar >50 ?"red":"yellow"

  var msg = {
    "message" : "Around "+noOfCar+" cars in Lane "+lane+" near T" +terminal+ " Exit",
    "iconTextPart2" : "Cars",
    "iconClass" : "symbol "+iconClass,
    "iconTextPart1" : noOfCar,
    "messageTime" : new Date()
  }
  return msg
}
function randomInt (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
router.get('/api/newMsg', function (req, res) {
  var io = req.io;
  Notify.findOneRandom(function(err,resNotification){
    if(err){
      res.send(err);
    }else{
      /!*console.log(resNotification);*!/
      if(resNotification.vehicleAnalytics.incidentDetection.length>0){
        var data = {
          noOfVehicle:resNotification.vehicleAnalytics.incidentDetection.length,
          zoneIndex:resNotification.vehicleAnalytics.cameraExtrinsics.cameraId,
          laneIndex:resNotification.vehicleAnalytics.incidentDetection[0].laneIndex,
          segmentInLane:resNotification.vehicleAnalytics.incidentDetection[0].segmentInLane,
          snapShot:resNotification.vehicleAnalytics.incidentDetection[0].incidentImage
        }
        sendNotificatio(data);
        res.send("Data Sent For Notification");
      }else{
        res.send("");
      }

    }

  })
});
function sendNotificatio(data){
  SocketIo.getSocketIoServer().emit('notificationMsg',data)
}*/



