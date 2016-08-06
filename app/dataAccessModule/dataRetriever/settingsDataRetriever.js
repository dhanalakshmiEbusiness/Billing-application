/**
 * Created by Suhas on 3/3/2016.
 */
var     mongoose = require('mongoose'),
        settingsModel = mongoose.model('settingModel');
var getElderlyThreshold = function(){
        /*settingsModel.findOne({"SettingsConfiguration.id":1},function(err,result){
                if(err)
                        res.send(err)
                return result.SettingsConfiguration.threshold.elderlyLoadingOccupancy;
        })*/
        console.log("hi")
        return 30;
}
module.export={
        getElderlyThreshold:getElderlyThreshold
}