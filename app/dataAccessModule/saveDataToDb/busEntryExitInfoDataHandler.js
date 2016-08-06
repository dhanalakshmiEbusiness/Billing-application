/**
 * Created by Suhas on 2/23/2016.
 */
var mongoose = require('mongoose'),
        busEntryExitModel = mongoose.model('busEntryExitInfo'),
        dataPusher=require('../../dataPusher');
var saveData = function(data){
        var busEntryExitModelObj = new busEntryExitModel();
        /*busEntryExitModelObj.busEntryExitInformation=data.busEntryExitInformation;*/
        busEntryExitModelObj.receivedDateTime=new Date();
        if(data.timestamp){
                busEntryExitModelObj.timestamp=parseInt(data.timestamp);
        }
        if(data.snapshot){
                busEntryExitModelObj.snapshot=data.snapshot;
        }

        busEntryExitModelObj.direction=data.direction;
        busEntryExitModelObj.plate=data.plate;
        dataPusher.busEntryExitDataPusher.pushData(busEntryExitModelObj);
        busEntryExitModelObj.save(function(err,result){
                if(result){
                        console.log(" Bus Entry Exit detection Data Saved ")
                }
        })
}
module.exports={
        saveData:saveData
}