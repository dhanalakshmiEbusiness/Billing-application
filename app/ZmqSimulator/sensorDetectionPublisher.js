/**
 * Created by zendynamix on 28-05-2016.
 */

var express = require('express'),
    router = express.Router();
    var mongoose = require('mongoose'),
    config = require('../../config/config');
mongoose.connect(config.db);
sensorDetectionPublisher = require('../models/sensorsDectectionModel');
var random = require('mongoose-simple-random');
var zmq = require('zmq')
var zmqPortPart = 'tcp://127.0.0.1:4206'
var sock = zmq.socket('push');
sock.connect(zmqPortPart);

module.exports = function (app) {
    app.use('/', router);
};
setInterval(function () {
    sensorDetectionPublisher.findOneRandom(function (err, response) {
        console.log(response);
        sock.send(JSON.stringify(response));
    })
}, 5000);
