/**
 * Created by rranjan on 11/29/15.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    SocketIo = require('./socketIo').getSocketIoServer(),
    dataHandlers = require("../app/dataAccessModule/saveDataToDb");
    var zmq = require('zmq');

var zmqPushPull = function (config) {
    // startPulling("demographicInfoData", "NotificationData");
    startPulling("loadingOccupancyInfoData", "NotificationData");
    startPulling("busEntryExitInfoData", "NotificationData");
    // startPulling("elderlyQueueInfoData", "NotificationData");
    // startPulling("sensorDetectionInfoData", "sensorDetectionInfoData");
    startPulling("bus_ParkingQueueInfoData","busParKingQueueInfoData");
    function startPulling(portName, emitPort) {
        var zmqSocket = zmq.socket('pull');
        var zmqPortPart = 'tcp://' + config.zmq.recHost + ':' //+config.zmq.port
        zmqSocket.bindSync(zmqPortPart + config.zmq[portName], function (err) {
            if (err)console.log(err.stack)
        });
        console.log("adding a listner " + zmqPortPart + config.zmq[portName]);
        zmqSocket.on("message", function (message) {
            try{
                var jsonPayload = JSON.parse(message.toString());
               /* console.log(jsonPayload);*/
                processData(jsonPayload, portName);
            }catch(err){
                console.error("Error while processing the message :")
                if(message){
                    console.log(message.toString())
                }

            }


        })
    }

    function processData(message, portName) {
        /*console.log(message, portName);*/
        var handlerObjectName =portName+"Handler";
        if (portName === "loadingOccupancyInfoData") {
            if (message.area !== undefined && message.area === "priority") {
                return dataHandlers.elderlyQueueInfoDataHandler.saveData(message);
            }
        }
        var handler = dataHandlers[handlerObjectName];
        handler.saveData(message);
    }
};


module.exports = {zmqPushPull: zmqPushPull};






