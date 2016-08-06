/**
 * Created by Suhas on 2/12/2016.
 */
var constants = require('../../config/constants');
var mongoose = require('mongoose'),
        config = require('../../config/config'),
        loadingOccupancyModel = require('../models/loadingOccupancyInfo'),
        arrayPrototypes=require('../utilities').arrayMethods;
Schema = mongoose.Schema;
mongoose.connect(config.db);

var dateArray;
Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
}
loadingOccupancyModel.remove({}, function(err) {
        console.log("removed notification document");
        dateArray = function getDates(){
                var dateArray = new Array();
                var  stopDate= new Date();
                var currentDate = new Date();
                currentDate.setDate(stopDate.getDate()-3);
                while (currentDate <= stopDate) {
                        dateArray.push(currentDate)
                        currentDate = currentDate.addDays(1);
                }
                createLoadingOccupancyModel(dateArray)
        }();
});

function createLoadingOccupancyModel(dateArray){
        var areaColorCode=['red','green','blue'];
        var loadingOccupancyConstants = constants.constants.LOADING_OCCUPANCY;
        for(var date=0;date<dateArray.length;date++){
                for(var hour=0;hour<23;hour++){
                        var minutesArr = [5,10,15,20,25,30,40,45]
                        for(var min=0;min<minutesArr.length;min++){
                                var loadingOccupancyObj = new loadingOccupancyModel();
                                var dateSet= dateArray[date];
                                dateSet.setHours(hour);
                                dateSet.setMinutes(minutesArr[min]);
                                var dateTimeOfIncident = new Date(dateSet);
                                var laneIndexVal  =Math.round(Math.floor(Math.random() * 3) + 1)
                                /*loadingOccupancyObj.berth = Math.round(Math.floor(Math.random() * 9) + 1);
                                loadingOccupancyObj.interchange = "Woodlands"
                                loadingOccupancyObj.area = "lane"+laneIndexVal;
                                loadingOccupancyObj.occupancy=Math.round(Math.floor(Math.random() * 90) + 0);
                                loadingOccupancyObj.timestamp=1466756601222 ;
                                loadingOccupancyObj.receivedDateTime = dateTimeOfIncident;
                                loadingOccupancyObj.laneIndex = laneIndexVal;*/
                                /***************************ss**************************/
                                try{

                                        loadingOccupancyObj.berth= Math.round(Math.floor(Math.random() * 9) + 1);
                                        loadingOccupancyObj.priorityQueueAlertThreshold= 0;
                                        loadingOccupancyObj.area = areaColorCode[laneIndexVal-1];
                                        loadingOccupancyObj.occupancy= Math.round(Math.floor(Math.random() * 90) + 0);
                                        loadingOccupancyObj.timestamp = 1466756601222;
                                        loadingOccupancyObj.receivedDateTime=dateTimeOfIncident;
                                        loadingOccupancyObj.laneIndex=loadingOccupancyConstants.LANE_INDEX_MAPPING[loadingOccupancyObj.area];
                                        loadingOccupancyObj.redQueueBusNumber=loadingOccupancyConstants.BERTH_ROUTE_NUMBER[loadingOccupancyObj.berth][0];
                                        loadingOccupancyObj.greenQueueBusNumber=loadingOccupancyConstants.BERTH_ROUTE_NUMBER[loadingOccupancyObj.berth][1];
                                        loadingOccupancyObj.blueQueueBusNumber= loadingOccupancyConstants.BERTH_ROUTE_NUMBER[loadingOccupancyObj.berth][2];
                                        loadingOccupancyObj.save(function(err,result){
                                                if(err){
                                                        console.log(err)
                                                }
                                                console.log("")
                                        })
                                }
                                catch(err){
                                        console.log(err.stack)
                                }

                                        }

                                }
                        }
};