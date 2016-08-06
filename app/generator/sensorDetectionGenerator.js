/**
 * Created by zendynamix on 28-05-2016.
 */

var mongoose = require('mongoose'),
    config = require('../../config/config');
var sensorsDetectionModel = require('../models/sensorsDectectionModel');
Schema = mongoose.Schema;
mongoose.connect(config.db);
sensorsDetectionModel.remove({}, function (err) {
    console.log("removed notification document");
    for(var k=0;k<10;k++) {
        generateSensorDetectionDetails();
    }
});

function generateSensorDetectionDetails(){
    var sensorObj = new sensorsDetectionModel();
    var  SensorName=["Bay 1, Camera 1", "Bay 2, Camera 1","Bay 3, Camera 2"];
    var status=["Online","Offline"]
    var arrayObj=[];

        for(var j=0;j<3;j++){
            var obj={};
            obj.SensorName=SensorName[Math.round(Math.floor(Math.random() * 3) + 0)];
            obj.Status=status[Math.round(Math.floor(Math.random() * 2) + 0)];
            obj.receivedDateTime=new Date();
            arrayObj.push(obj)
        }
        sensorObj.sensors=arrayObj;
        sensorObj.save(function(err,result){
            if(err)
                console.log(err)
            console.log("sensor data generated")
        })


};
