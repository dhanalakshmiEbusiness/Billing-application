/**
 * Created by Suhas on 3/9/2016.
 */
var mongoose = require('mongoose'),
    socketIo = require('../../config/socketIo').getSocketIoServer();
var pushData = function(data){
        socketIo.emit('unloadingBayData',data);
        console.log(data)
}
module.exports={
        pushData:pushData
}