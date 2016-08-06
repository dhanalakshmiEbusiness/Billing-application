/**
 * Created by Suhas on 2/17/2016.
 */
var mongoose = require('mongoose'),
        config = require('../../config/config');
var busLotStatusModel = require('../models/busLotStatusModel');
Schema = mongoose.Schema;/*
console.log("save")*/
/*busLotStatusModel.remove({}, function(err) {
        generateBusLotStatusData();
});*/

function generateBusLotStatusData(){
        /*console.log("save")*/
        for(var i=1;i<68;i++){
                /*console.log("save")*/
                var busLotStatusModelObj = new busLotStatusModel();
                busLotStatusModelObj.status=0;
                busLotStatusModelObj.bayId="a1";
                busLotStatusModelObj.batteryStatus="1.1";
                busLotStatusModelObj.save(function(result){
                        console.log(busLotStatusModelObj)
                })
        }
}
generateBusLotStatusData();