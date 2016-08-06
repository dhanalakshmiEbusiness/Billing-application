/**
 * Created by zendynamix on 25-02-2016.
 */

var express = require('express'),
    router = express.Router();
var mongoose = require('mongoose'),
    config = require('../../config/config');
mongoose.connect(config.db);
elderlyQueueInfoDetectionPublisher = require('../models/elderlyQueueModel');
var random = require('mongoose-simple-random');
var zmq = require('zmq')
var zmqPortPart = 'tcp://212.47.240.62:4205'
var sock = zmq.socket('push');
sock.connect(zmqPortPart);

module.exports = function (app) {
    app.use('/', router);
};
setInterval(function () {
    elderlyQueueInfoDetectionPublisher.findOneRandom(function (err, response) {
        sock.send(JSON.stringify(response));
        console.log("Elderly Data Pushed")
    })
}, 1000);

