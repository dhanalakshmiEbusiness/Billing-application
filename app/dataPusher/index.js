/**
 * Created by Suhas on 2/12/2016.
 */
var loadingOccupancyDetails = require('./loadingOccupancyDetails.js'),
    busDetectionDetails = require('./busDetectionInfo.js'),
    demographyRelatedDataPush = require('./demographicDetails.js'),
    busLotDataPusher = require('./busLotStatus.js'),
    busEntryExitDataPusher = require('./busEntryExit.js'),
    elderlyQueueInfoDataPusher = require('./elderlyQueueInfo.js'),
    unloadingBayDataPusher = require('./unloadingBayDetail.js');
    sensorDetectionDataPusher= require('./sensorDetectionDetail.js');
module.exports={
        loadOccupancyDetails:loadingOccupancyDetails,
        busDetectionDetails:busDetectionDetails,
        demographyRelatedDataPush:demographyRelatedDataPush,
        busLotRelatedDataPush:busLotDataPusher,
        busEntryExitDataPusher:busEntryExitDataPusher,
        elderlyQueueInfoDataPusher:elderlyQueueInfoDataPusher,
        unloadingBayDataPusher:unloadingBayDataPusher,
        sensorDetectionDataPusher:sensorDetectionDataPusher
}