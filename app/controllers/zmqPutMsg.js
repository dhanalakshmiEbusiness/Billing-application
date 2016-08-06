/**
 * Created by rranjan on 11/29/15.
 */
var express = require('express');
var zmq = require('zmq');
var config = require('../../config/config');

var router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};
var queData = config.zmq.queue;
var zmqConfigObj = config.zmq;
queData.forEach((queueItem)=>{
  router.post('/putMsgIn0MQ'+queueItem.name, function (req, res, next) {
    pushData(queueItem,JSON.stringify(req.body))
    res.send(queueItem)
})
})
var pushData = function(queueDetails,dataToPush){
  var zmqSocket = zmq.socket('push');
  var sendHost = zmqConfigObj.sendHost;
  if(queueDetails.sendHost){
    sendHost = queueDetails.sendHost;
  }
  var zmqPortPart = 'tcp://'+sendHost+':'+queueDetails.portNo;
  zmqSocket.connect(zmqPortPart)
  zmqSocket.send(dataToPush);
};
