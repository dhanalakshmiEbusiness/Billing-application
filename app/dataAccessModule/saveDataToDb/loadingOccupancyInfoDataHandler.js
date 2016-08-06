/**
 * Created by Suhas on 2/12/2016.
 */
var constants = require('../../../config/constants');
var mongoose = require('mongoose'),
    loadingOccupancyModel = mongoose.model('loadingOccupancyInfo'),
    elderlyOccupancyHandler = require('./elderlyQueueInfoDataHandler'),
    dataPusher = require('../../dataPusher/loadingOccupancyDetails.js'),
    socketIo = require('../../../config/socketIo').getSocketIoServer();
var pushEveryTick = false;
var saveData = function(data){
    if(data.area !== undefined && data.area === "priority"){
        elderlyOccupancyHandler.saveData(data)
    }else{
        var loadingOccupancyModelObj = new loadingOccupancyModel();
        loadingOccupancyModelObj.berth= data.berth;
        loadingOccupancyModelObj.redQueueBusNumber= data.redQueueBusNumber;
        loadingOccupancyModelObj.greenQueueBusNumber= data.greenQueueBusNumber;
        loadingOccupancyModelObj.blueQueueBusNumber= data.blueQueueBusNumber;
        loadingOccupancyModelObj.priorityQueueAlertThreshold= data.priorityQueueAlertThreshold;
        loadingOccupancyModelObj.area = data.area;
        loadingOccupancyModelObj.occupancy= data.occupancy;
        loadingOccupancyModelObj.timestamp = data.timestamp;
        loadingOccupancyModelObj.receivedDateTime=new Date();
        loadingOccupancyModelObj.laneIndex=constants.constants.LOADING_OCCUPANCY.LANE_INDEX_MAPPING[data.area];
        /*if(pushEveryTick){*/
        socketIo.emit('pushEveryTickLoadingOccupancy',loadingOccupancyModelObj)
        /* }*/
        loadingOccupancyModelObj.save(function(err,result){
            if(result){
                console.log("loading occupancy Data Saved")
            }
        })
    }

}
var setDataPushType = function(flag){
   /* if(!flag){
        pushEveryTick=false;
    }else{
        pushEveryTick=true;
    }*/
}
module.exports={
    saveData:saveData,
    setDataPushType:setDataPushType
}