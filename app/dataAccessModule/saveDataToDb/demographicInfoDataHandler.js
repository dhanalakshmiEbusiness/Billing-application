/**
 * Created by Suhas on 2/15/2016.
 */
var mongoose = require('mongoose'),
        peopleDetectionDataModel = mongoose.model('peopleDetectionModel');
var saveData = function(data){
        var peopleDetectionDataModelObj = new peopleDetectionDataModel();
        peopleDetectionDataModelObj.demographicInformation=data.demographicInformation;
        peopleDetectionDataModelObj.demographicInformation.receivedDateTime=new Date();
        /*console.log(peopleDetectionDataModelObj.demographicInformation.personDetectionEvent)*/
        peopleDetectionDataModelObj.save(function(err,result){
                if(result){
                        console.log("people detection Data Saved")
                }
        })
}
module.exports={
        saveData:saveData
}
/*module.exports=saveData;*/
