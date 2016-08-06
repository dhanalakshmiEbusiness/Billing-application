/**
 * Created by zendynamix on 24-02-2016.
 */

var express = require('express'),
    router = express.Router();
var mongoose = require('mongoose'),
    config = require('../../config/config');
mongoose.connect(config.db);
busEntryExitDetectionPublisher = require('../models/busEntryExistModel');
var random = require('mongoose-simple-random');
var zmq = require('zmq')
var zmqPortPart = 'tcp://127.0.0.1:4204'
/*var zmqPortPart = 'tcp://212.47.240.62:4004'*/
var sock = zmq.socket('push');
sock.connect(zmqPortPart);

module.exports = function (app) {
    app.use('/', router);
};
setInterval(function () {
   /* busEntryExitDetectionPublisher.findOneRandom(function (err, response) {
        sock.send(JSON.stringify(response));
        console.log(JSON.stringify(response))
    })*/
    var data=
    {
        "plate": "test",
        "timestamp": 0,
        "snapshot": "",
        "direction": "entrance"
    }
    sock.send(JSON.stringify(data));
},4000);
