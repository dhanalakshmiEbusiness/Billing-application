/**
 * Created by Suhas on 2/17/2016.
 */
var mongoose = require('mongoose'),
        busLotStatusModel = mongoose.model('busLotStatusModel'),
        socketIo = require('../../config/socketIo').getSocketIoServer();
var pushBusParkingDataForUnloading = function(busLotArr){
        socketIo.emit('unloadingBayData',busLotArr);
}
var pushBusParkingDataForMap = function(busLotArr){
        socketIo.emit('busLotDataPusher',busLotArr);
}
var pushBusParkingDataForParking = function(busLotArr){
        socketIo.emit('busLotParkingDataPusher',busLotArr);
}
module.exports={
        pushBusParkingDataForUnloading:pushBusParkingDataForUnloading,
        pushBusParkingDataForMap:pushBusParkingDataForMap,
        pushBusParkingDataForParking:pushBusParkingDataForParking
}