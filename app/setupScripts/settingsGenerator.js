/**
 * Created by Suhas on 3/1/2016.
 */
var mongoose = require('mongoose'),
        config = require('../../config/config');
var settingsModel = require('../models/settingsModel.js');
Schema = mongoose.Schema;
/*mongoose.connect(config.db);*/
/*    if(process.argv.indexOf("-force")>0){
        settingsModel.remove({}, function(err) {
            console.log("previous data forcefully removed")
            generateSettingDocument();
        });
    }else{
        settingsModel.findOne({"SettingsConfiguration.id":1}, function(err,result){
            if(err) {
                console.log(err)
            }
            if(result){
                console.log("data Present")
                /!*process.exit(0);*!/

            }else{
                generateSettingDocument();
            }

        });
    }*/


function generateSettingDocument(callback){
        var routeNo = [ ['902','161','168'],
                        ['858','969','903/903P'],
                        ['965','900/900A','169'],
                        ['962','912','901'],
                        ['926/964','913','911'],
                        ['178/178A','912/912W','913'],
                        ['961','960','911'],
                        ['187','963','966'],
                        ['925','856','950']]

        var settingsModelObj = new settingsModel;
        var phoneNo = 919886213442;
        settingsModelObj.SettingsConfiguration.id=1;
        settingsModelObj.SettingsConfiguration.threshold.elderlyLoadingOccupancy=20;
        settingsModelObj.SettingsConfiguration.threshold.thresholdTimeOut=5*60*1000;


        settingsModelObj.SettingsConfiguration.smsNotification.phoneNo=phoneNo;
        settingsModelObj.SettingsConfiguration.smsNotification.smsSendingStatus=false;


        settingsModelObj.SettingsConfiguration.unloadingBay.routeNo=[1,2,3];


        settingsModelObj.SettingsConfiguration.settingsData.showClearDataButtonForDeparture=true;
        settingsModelObj.SettingsConfiguration.settingsData.showClearDataButtonForArrival=true;
        settingsModelObj.SettingsConfiguration.settingsData.showSimulatorPage=config.settingStatus.simulatorStatus;


        settingsModelObj.SettingsConfiguration.busParkingDetails.refreshTime=30*1000;
        settingsModelObj.SettingsConfiguration.busParkingDetails.refreshStatus=true;


        settingsModelObj.SettingsConfiguration.demographicDetails.isAggregation=true;
        settingsModelObj.SettingsConfiguration.demographicDetails.aggregationRefreshTime=20000;
        settingsModelObj.SettingsConfiguration.demographicDetails.showGenderCount=false;


        settingsModelObj.SettingsConfiguration.loadingOccupancyAggregation.refreshTime=20000;/*in milli seconds*/
        settingsModelObj.SettingsConfiguration.loadingOccupancyAggregation.isAggregationStatus=false;
        settingsModelObj.SettingsConfiguration.loadingOccupancyAggregation.aggregationPeriod=2*60;


        settingsModelObj.SettingsConfiguration.physicallyChallengedOccupancy.refreshTime=20000;/*in milli seconds*/
        settingsModelObj.SettingsConfiguration.physicallyChallengedOccupancy.isAggregationStatus=false;
        settingsModelObj.SettingsConfiguration.physicallyChallengedOccupancy.aggregationPeriod=2*60;

        var loadingOccupancy = [];
        for(var i=1;i<=9;i++){
                for(var j=1;j<=3;j++){
                        var loadingOccupancyObject={
                                berthId:i,
                                laneId:j,
                                berthCapacity:100,
                                routeNo:routeNo[i-1][j-1],
                                speciallyChallengedCapacity:50

                        }
                        loadingOccupancy.push(loadingOccupancyObject);
                }

            }
        settingsModelObj.SettingsConfiguration.loadingOccupancy=loadingOccupancy;
        settingsModelObj.save(function(err,result){
                if(err)
                   console.log(err)
                console.log("settings configuration saved")
            /*process.exit(0);*/
                callback();
        })
};

module.exports={
        run:function(callback){
                settingsModel.remove({}, function(err) {
                        console.warn("Settings previous data forcefully removed")
                        generateSettingDocument(callback);
                });
        }
}