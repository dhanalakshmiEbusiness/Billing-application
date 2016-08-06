/**
 * Created by Suhas on 3/1/2016.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
var random = require('mongoose-simple-random');
var settingSchema = new Schema({/*SettingsConfiguration.loadingOccupancy*/
        "SettingsConfiguration":{
                id:Number,
                "threshold":{
                        elderlyLoadingOccupancy:Number,
                        thresholdTimeOut:Number/*in milli seconds*/
                },
                demographicDetails:{
                        showGenderCount:Boolean,
                        isAggregation:Boolean,
                        aggregationRefreshTime:Number
                },
                loadingOccupancy:[
                        {
                                berthId:Number,
                                laneId:Number,
                                berthCapacity:Number,
                                routeNo:String,
                                speciallyChallengedCapacity:Number
                        }
                    ],
                smsNotification:{
                        phoneNo:Number,
                        smsSendingStatus:Boolean
                },
                unloadingBay:{
                        routeNo:Array
                },
                busParkingDetails:{
                        refreshTime:Number,
                        refreshStatus:Boolean
                },
                settingsData:{
                        showClearDataButtonForDeparture:Boolean,
                        showClearDataButtonForArrival:Boolean,
                        showSimulatorPage:Boolean
                },
                busEntryExitStatus:{
                        clearBusArrivalStatus:Boolean,
                        clearBusDepartureStatus:Boolean
                },
                physicallyChallengedOccupancy:{
                        refreshTime:Number,
                        isAggregationStatus:Boolean,
                        aggregationPeriod:Number
                },
                loadingOccupancyAggregation:{
                        refreshTime:Number,
                        isAggregationStatus:Boolean,
                        aggregationPeriod:Number

                }
        }
},{collection: "settingsDoc"})
module.exports = mongoose.model('settingModel',settingSchema);