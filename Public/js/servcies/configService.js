/**
 * Created by Suhas on 2/25/2016.
 */
taxiFleetManager.factory("configService",function($http){
        var simulatorStaus = true;
        var getBusParkingRefreshTime = function(){
                return $http.get('/smrt/busLotStatus/getRefreshTime')
        }
        var setBusParkingRefreshTime = function(refreshTime){
                return $http.get('/smrt/settings/setBusParkingRefreshTime/'+refreshTime)
        }
        var startBusParkingStatusSimulator = function(){
                $http.get('/smrt/busLotStatus/startDataPush');
        }
        var stopBusParkingStatusSimulator = function(){
                $http.get('/smrt/busLotStatus/stopDataPush');
        }
        var getBusParkingStatusSimulatorStatus = function(){
                return $http.get('/smrt/busLotStatus/status');
        }
        var startLoadingBayAggregation = function(){
                $http.get('/smrt/loadingOccupancy/startAggregation');
                $http.get('/smrt/elderlyQueue/startAggregate');
        }
        var stopLoadingBayAggregation = function(){
                $http.get('/smrt/loadingOccupancy/stopAggregation');
                $http.get('/smrt/elderlyQueue/stopAggregate');
        }
        var getAggregationStatus = function(){
                return $http.get('/smrt/loadingOccupancy/aggregationStatus');
        }
        var getAggregationRefreshTime = function(){
                return $http.get('/smrt/loadingOccupancy/getAggregationRefreshTime');
        }
        var setAggregationRefreshTime = function(refreshTime){
                $http.get('/smrt/loadingOccupancy/setAggregationRefreshTime/'+refreshTime);
                $http.get('/smrt/elderlyQueue/setAggregationRefreshTime/'+refreshTime);
        }
        var getAggregationTime = function(){
                return $http.get('/smrt/loadingOccupancy/getAggregationTime');
        }
        var setAggregationTime = function(aggregationTime){
                $http.get('/smrt/loadingOccupancy/setAggregationTime/'+aggregationTime);
                $http.get('/smrt/elderlyQueue/setAggregationTime/'+aggregationTime);
        }
        var getElderlyOccupancyThreshold = function(){
                return $http.get('/smrt/settings/getElderlyLoadingOccupancyThreshold');
        }
        var setElderlyOccupancyThreshold = function(threshold){
                return $http.get('/smrt/settings/setElderlyLoadingOccupancyThreshold/'+threshold);
        }
        var getDemographicGenderShowStatus = function(){
                return $http.get('/smrt/settings/getDemographicShowGenderStatus');
        }
        var setDemographicGenderShowStatus = function(status){
                return $http.get('/smrt/settings/setDemographicShowGenderStatus/'+status);
        }
        var getLoadingBayCapacity = function(){
                return $http.get('/smrt/settings/getLoadingOccupancyCountRatio');
        }
        var setBayCapacityValue = function(bayCapacityObject){
                var bayObject={
                        bayCapacityObject:bayCapacityObject
                }
                return $http.post('/smrt/settings/BayCapacity/',bayObject);
        }
        var getSettingsDetails = function(){
                return $http.get('/smrt/settings/getSettingDetails')
        }
        var setSMSDetails = function(smsDetails){
                return $http.post('/smrt/settings/setSMSNotificationDetails',smsDetails)
        }
        var setAutoSMSStatus = function(staus){
                return $http.get('/smrt/settings/setSMSNotificationDetails/autoSMS/'+staus)
        }
        var setShowSimulatorStatus = function(staus){
                return $http.get('/smrt/settings/setShowSimulatorStatus/'+staus)
        }
        var setBusArrivalStatus = function(status){
                return $http.post('/smrt/settings/setClearEntryExit/'+status);
        }
        var setBusDepartureStatus= function(status){
                return $http.post('/smrt/settings/clearBusDepartureStatus/'+status);
        }
        return{
                getBusParkingRefreshTime:getBusParkingRefreshTime,
                setBusParkingRefreshTime:setBusParkingRefreshTime,
                startBusParkingStatusSimulator:startBusParkingStatusSimulator,
                stopBusParkingStatusSimulator:stopBusParkingStatusSimulator,
                getBusParkingStatusSimulatorStatus:getBusParkingStatusSimulatorStatus,
                startLoadingBayAggregation:startLoadingBayAggregation,
                stopLoadingBayAggregation:stopLoadingBayAggregation,
                getAggregationStatus:getAggregationStatus,
                getAggregationRefreshTime:getAggregationRefreshTime,
                setAggregationRefreshTime:setAggregationRefreshTime,
                getAggregationTime:getAggregationTime,
                setAggregationTime:setAggregationTime,
                getElderlyOccupancyThreshold:getElderlyOccupancyThreshold,
                setElderlyOccupancyThreshold:setElderlyOccupancyThreshold,
                getDemographicGenderShowStatus:getDemographicGenderShowStatus,
                setDemographicGenderShowStatus:setDemographicGenderShowStatus,
                getLoadingBayCapacity:getLoadingBayCapacity,
                setBayCapacityValue:setBayCapacityValue,
                getSettingsDetails:getSettingsDetails,
                setSMSDetails:setSMSDetails,
                setAutoSMSStatus:setAutoSMSStatus,
                setShowSimulatorStatus:setShowSimulatorStatus,
                setBusArrivalStatus:setBusArrivalStatus,
                setBusDepartureStatus:setBusDepartureStatus
        }
})