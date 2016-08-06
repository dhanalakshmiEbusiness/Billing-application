/**
 * Created by Suhas on 2/22/2016.
 */
smrt.factory("settingsService",function($http,$window){
        var settingDetails;
        var startLoadingOccupancySimulator = function(){
                $http.get('/smrt/loadingOccupancy/startDataPush');
        }
        var stopLoadingOccupancySimulator = function(){
                $http.get('/smrt/loadingOccupancy/stopDataPush');
        }
        var getLoadingOccupancySimulatorStatus = function(){
                return $http.get('/smrt/loadingOccupancy/status');
        }
        var startDemographicSimulator = function(){
                $http.get('/smrt/peopleDetectionData/startDataPush');
        }
        var stopDemographicSimulator = function(){
                $http.get('/smrt/peopleDetectionData/stopDataPush');
        }
        var getDemographicSimulatorStatus = function(){
                return $http.get('/smrt/peopleDetectionData/status');
        }
        var startBusScheduleSimulator = function(){
                $http.get('/smrt/busEntryExitData/startDataPush');
        }
        var stopBusScheduleSimulator = function(){
                $http.get('/smrt/busEntryExitData/stopDataPush');
        }
        var getBusScheduleSimulatorStatus = function(){
                return $http.get('/smrt/busEntryExitData/status');
        }
        var startElderlyQueueSimulator = function(){
                $http.get('/smrt/elderlyQueue/startDataPush');
        }
        var stopElderlyQueueSimulator = function(){
                $http.get('/smrt/elderlyQueue/stopDataPush');
        }
        var getElderlyQueueSimulatorStatus = function(){
                return $http.get('/smrt/elderlyQueue/status');
        }
        var stopAllSimulator = function(){
                $http.get('/smrt/peopleDetectionData/stopDataPush');
                $http.get('/smrt/loadingOccupancy/stopDataPush');
                $http.get('/smrt/busEntryExitData/stopDataPush');
                $http.get('/smrt/elderlyQueue/stopDataPush');
        }
        var startAllSimulator = function(){
                $http.get('/smrt/peopleDetectionData/startDataPush');
                $http.get('/smrt/loadingOccupancy/startDataPush');
                $http.get('/smrt/busEntryExitData/startDataPush');
                $http.get('/smrt/elderlyQueue/startDataPush');
        }
        var getSettingsDetails = function(){
                return $http.get('/smrt/settings/getSettingDetails')
        }
        var getSettingDetailsVal = function(){
                return settingDetails;
        }
        var setSettingDetailsVal = function(val){
                settingDetails=val;
        }
        var getAdminStatusByToken = function(){
                if($window.sessionStorage.token){
                        var data = {
                                token:$window.sessionStorage.token
                        }
                        return $http.post('/smrt/userDetails/get/adminStatus',data);
                }else{
                        return false
                }

        }
        var getRouteNoForLoadingOccupancyQueue = function(){
                return $http.get('/smrt/settings/loadingOccupancy/berthRouteNo')
        }

        return{
                stopDemographicSimulator:stopDemographicSimulator,
                startDemographicSimulator:startDemographicSimulator,
                getDemographicSimulatorStatus:getDemographicSimulatorStatus,
                stopLoadingOccupancySimulator:stopLoadingOccupancySimulator,
                startLoadingOccupancySimulator:startLoadingOccupancySimulator,
                getLoadingOccupancySimulatorStatus:getLoadingOccupancySimulatorStatus,
                startAllSimulator:startAllSimulator,
                stopAllSimulator:stopAllSimulator,
                startBusScheduleSimulator:startBusScheduleSimulator,
                stopBusScheduleSimulator:stopBusScheduleSimulator,
                getBusScheduleSimulatorStatus:getBusScheduleSimulatorStatus,
                startElderlyQueueSimulator:startElderlyQueueSimulator,
                stopElderlyQueueSimulator:stopElderlyQueueSimulator,
                getElderlyQueueSimulatorStatus:getElderlyQueueSimulatorStatus,
                getSettingsDetails:getSettingsDetails,
                getSettingDetailsVal:getSettingDetailsVal,
                setSettingDetailsVal:setSettingDetailsVal,
                getAdminStatusByToken:getAdminStatusByToken,
                getRouteNoForLoadingOccupancyQueue:getRouteNoForLoadingOccupancyQueue
        }
})