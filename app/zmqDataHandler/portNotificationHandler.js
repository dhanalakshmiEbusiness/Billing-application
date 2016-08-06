/**
 * Created by rranjan on 1/15/16.
 */
  "use strict"
var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  SocketIo = require('../../config/socketIo').getSocketIoServer();

module.exports = function (app) {
  app.use('/', router);
};
var handle = function(message) {
}
module.exports= handle;
