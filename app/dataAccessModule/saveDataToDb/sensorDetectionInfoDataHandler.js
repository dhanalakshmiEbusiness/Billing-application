/**
 * Created by zendynamix on 28-05-2016.
 */

var mongoose = require('mongoose'),
    sensorDetection = mongoose.model('sensorDetection'),
    dataPusher=require('../../dataPusher');
var saveData = function(data){
    var sensorDetectionObj = new sensorDetection();
    console.log(data.sensors.length)
    var arrayObj=[];
    for(var j=0;j<data.sensors.length;j++){
        var obj={};
        obj.SensorName=data.sensors[j].SensorName;
        obj.Status=data.sensors[j].Status;
        obj.receivedDateTime=new Date();
        arrayObj.push(obj)
    }

    sensorDetectionObj.sensors=arrayObj;
    dataPusher.sensorDetectionDataPusher.pushData(arrayObj);
    sensorDetectionObj.save(function(err,result){
        if(result){
            console.log(" sensor detection saved ")
        }
    })
}
module.exports={
    saveData:saveData
}