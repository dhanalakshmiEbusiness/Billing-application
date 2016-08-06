/**
 * Created by Suhas on 2/17/2016.
 */
var mongoose = require('mongoose'),
        busLotStatusModel = mongoose.model('busLotStatusModel');
var saveData = function(data){
        var busLotStatusModelObj = new busLotStatusModel();
        busLotStatusModelObj.receivedDateTime=new Date();
        busLotStatusModelObj.busParkingArray=data;
        busLotStatusModelObj.save(function(err,result){
                console.log("bus Lot Status save")
        })
}
module.exports={
        saveData:saveData
}