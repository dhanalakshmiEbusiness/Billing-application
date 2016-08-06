/**
 * Created by zendynamix on 28-05-2016.
 */

var mongoose = require('mongoose'),
    socketIo = require('../../config/socketIo').getSocketIoServer();
var pushData = function(data){
    socketIo.emit('sensorDetectionData',data);
    /*console.log("data pusher bus entry exit")*/
}
module.exports={
    pushData:pushData
}
