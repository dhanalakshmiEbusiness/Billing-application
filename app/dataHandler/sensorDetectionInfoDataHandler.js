/**
 * Created by Suhas on 2/23/2016.
 */
var dataSaveToDb=require('../dataAccessModule').save;


var handler = function(data){
    dataSaveToDb.sensorDetectionInfoDataHandler.saveData(data)
}
module.exports={
    handler:handler
}