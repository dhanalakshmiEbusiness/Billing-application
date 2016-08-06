/**
 * Created by Suhas on 2/23/2016.
 */
var mongoose = require('mongoose'),
    socketIo = require('../../config/socketIo').getSocketIoServer();
var pushData = function(data){
        socketIo.emit('busEntryExitData',data);
        /*console.log("data pusher bus entry exit")*/
}
module.exports={
        pushData:pushData
}