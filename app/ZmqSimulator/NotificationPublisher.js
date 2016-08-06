/**
 * Created by zendynamix on 13-01-2016.
 */
var express = require('express'),
    router = express.Router();
var mongoose = require('mongoose'),
  config = require('../../config/config');
mongoose.connect(config.db);
peopleDetectionPublisher = require('../models/peopleDetectionDataModel');
var random = require('mongoose-simple-random');
var zmq = require('zmq')
var zmqPortPart = 'tcp://127.0.0.1:4202'
var sock = zmq.socket('push');
sock.connect(zmqPortPart);

module.exports = function (app) {
  app.use('/', router);
};
setInterval(function () {
  peopleDetectionPublisher.findOneRandom(function (err, response) {
    console.log(response);
    sock.send(JSON.stringify(response));
  })
}, 5000);
