/**
 * Created by Suhas on 2/12/2016.
 */
var mongoose = require('mongoose'),
config = require('../../config/config');
var peopleDetectionDataModel = require('../models/peopleDetectionDataModel');
Schema = mongoose.Schema;
mongoose.connect(config.db);
var dateArray;
Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf())
        dat.setDate(dat.getDate() + days);
        return dat;
}
peopleDetectionDataModel.remove({}, function(err) {
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
                createPeopleDetectionDataModel(dateArray)
        }();
});

function createPeopleDetectionDataModel(dateArray){
       /* var num = 100;
        console.log(num)*/
        var lat=[1.350228,1.353864,1.353864];
        var lang=[103.984889,103.986498,103.986498];
        var gender = ['MALE','FEMALE'];
        for(var date=0;date<dateArray.length;date++){
                for(var hour=0;hour<23;hour++){
                        var minutesArr = [5,10,15,20,25,30,40,45]
                        for(var min=0;min<minutesArr.length;min++){
                                var createPeopleDetectionDataModel = new peopleDetectionDataModel();
                                var cameraExtrinsics = {
                                        "cameraId" : Math.round(Math.floor(Math.random() * 5) + 1),
                                        "cameraName" : "Under Route-"+(date%5)+date+" NorthboundBridge",
                                        "cameraDirection" : "Towards Northbound Lanes",
                                        "cameraLatitude" : lat[date%5],
                                        "cameraLongitude" : lang[date%5],
                                        "cameraHeight" : 30  // in feet from ground
                                };
                                var cameraIntrinsics = {
                                        "cameraFocalLength" : 35, // in mm
                                        "cameraAngle" : 20, // in degrees wrt horizontal plane
                                        "imageWidth" : "1920",
                                        "imageHeight" : "1080",
                                        "frameRate" : 25 // Frames per second
                                };
                                var peopleDetectionLength = Math.round(Math.floor(Math.random() * 5) + 1);
                                var peopleDetectionArray = [];
                                for(var j = 0;j<peopleDetectionLength;j++){
                                        var peopleData = {};
                                        peopleData.age=Math.round(Math.floor(Math.random() * 100) + 5);
                                        peopleData.gender=gender[Math.round(Math.floor(Math.random() * 2) + 0)];
                                        peopleDetectionArray.push(peopleData)
                                        if(j==peopleDetectionLength-1){
                                                var dateSet= dateArray[date];
                                                dateSet.setHours(hour);
                                                dateSet.setMinutes(minutesArr[min]);
                                                /*
                 dateSet.setMinutes(min);*/
                                                var dateTimeOfIncident = new Date(dateSet);
                                                createPeopleDetectionDataModel.demographicInformation.dateTime = dateTimeOfIncident;
                                                createPeopleDetectionDataModel.demographicInformation.receivedDateTime = dateTimeOfIncident;
                                                createPeopleDetectionDataModel.demographicInformation.personDetectionEvent = peopleDetectionArray;
                                                createPeopleDetectionDataModel.demographicInformation.cameraIntrinsics = cameraIntrinsics;
                                                createPeopleDetectionDataModel.demographicInformation.cameraExtrinsics = cameraExtrinsics;
                                                createPeopleDetectionDataModel.save(function(err,result){
                                                        if(err){
                                                                console.log(err)
                                                        }
                                                        console.log("Saving Data")
                                                })
                                        }
                                }
                        }
                }

        }

};
