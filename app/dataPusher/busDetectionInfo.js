/**
 * Created by Suhas on 2/13/2016.
 */
var mongoose = require('mongoose'),
        busDetectionInfoModel = mongoose.model('busDetectionInfo'),
        socketIo = require('../../config/socketIo').getSocketIoServer();
var busDetectionInfoModelArr = [];
var pushData = function(data){
        /*console.log('pushing data')*/
}
module.exports={
        pushData:pushData
}