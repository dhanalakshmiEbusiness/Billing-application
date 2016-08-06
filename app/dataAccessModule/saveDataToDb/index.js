/**
 * Created by Suhas on 2/12/2016.
 */
var loadingOccupancyInfoDataHandler = require('./loadingOccupancyInfoDataHandler.js'),
    demographicInfoDataHandler = require('./demographicInfoDataHandler.js'),
    busLotStatusDataHandler = require('./busLotStatus.js'),
    busEntryExitInfoDataHandler=require('./busEntryExitInfoDataHandler.js'),
    elderlyQueueInfoDataHandler=require('./elderlyQueueInfoDataHandler.js'),
    sensorDetectionInfoDataHandler=require('./sensorDetectionInfoDataHandler.js'),
    bus_ParkingQueueInfoDataHandler=require('./bus_ParkingQueueInfoDataHandler.js');
module.exports={
        loadingOccupancyInfoDataHandler:loadingOccupancyInfoDataHandler,
        demographicInfoDataHandler:demographicInfoDataHandler,
        busLotStatusDataHandler:busLotStatusDataHandler,
        busEntryExitInfoDataHandler:busEntryExitInfoDataHandler,
        elderlyQueueInfoDataHandler:elderlyQueueInfoDataHandler,
        sensorDetectionInfoDataHandler:sensorDetectionInfoDataHandler,
        bus_ParkingQueueInfoDataHandler:bus_ParkingQueueInfoDataHandler
}