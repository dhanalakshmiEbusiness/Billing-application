/**
 * Created by Suhas on 2/12/2016.
 */
var loadingOccupancyInfoDataHandler = require('./loadingOccupancyInfoDataHandler.js'),
    demographicInfoDataHandler = require('./demographicInfoDataHandler.js'),
    bus_ParkingQueueInfoDataHandler = require('./bus_ParkingQueueInfoDataHandler.js'),
    busEntryExistInfoDataHandler=require('./busEntryExistInfoDataHandler.js'),
    elderlyQueueInfoDataHandler=require('./elderlyQueueInfoDataHandler.js'),
    sensorDetectionInfoDataHandler=require('./sensorDetectionInfoDataHandler.js'),
    busParKingQueueInfoDataHandler=require('./busParKingQueueInfoDataHandler.js');
module.exports={
        loadingOccupancyInfoDataHandler:loadingOccupancyInfoDataHandler,
        demographicInfoDataHandler:demographicInfoDataHandler,
        bus_ParkingQueueInfoDataHandler:bus_ParkingQueueInfoDataHandler,
        busEntryExistInfoDataHandler:busEntryExistInfoDataHandler,
        elderlyQueueInfoDataHandler:elderlyQueueInfoDataHandler,
        sensorDetectionInfoDataHandler:sensorDetectionInfoDataHandler,
        busParKingQueueInfoDataHandler:busParKingQueueInfoDataHandler
}