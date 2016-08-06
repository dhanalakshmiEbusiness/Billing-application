/**
 * Created by zendynamix on 23-02-2016.
 */

var express = require('express'),
    router = express.Router();
var mongoose = require('mongoose'),
    config = require('../../config/config');
mongoose.connect(config.db);
loadingOccupancyPublisher = require('../models/loadingOccupancyInfo');
var random = require('mongoose-simple-random');
var zmq = require('zmq')
var zmqPortPart = 'tcp://127.0.0.1:4203'
/*var zmqPortPart = 'tcp://212.47.240.62:4003'*/
var sock = zmq.socket('push');
sock.connect(zmqPortPart);

module.exports = function (app) {
    app.use('/', router);
};
setInterval(function () {
    var data=
    {
            timestamp: 1466756601222,
            occupancy: 60,
            area: 'red',
            priorityQueueAlertThreshold: 0,
            blueQueueBusNumber: '966',
            greenQueueBusNumber: '963',
            redQueueBusNumber: '187',
            berth:5,
            __v: 0
    }
    sock.send(JSON.stringify(data));
    /*loadingOccupancyPublisher.findOneRandom(function (err, response) {
        console.log(response);
        sock.send(JSON.stringify(response));
    })*/
}, 4000);
