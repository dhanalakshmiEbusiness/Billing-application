/**
 * Created by MohammedSaleem on 10/03/16.
 */

taxiFleetManager.controller("simulatorCtrl", function ($scope,settingsService) {

    $scope.settIngSCtatus={
        elderlyQueueSimulatorStatus:false,
        demographySimulatorStatus:false,
        loadingSimulatorStatus:false,
        startAllSimulator:false,
        busScheduleSimulatorStatus:false,
        stopAllSimulator:false,
        showClearButtonAtDeparture:true,
        showClearButtonAtArrival:true,

    };
    /*settingsService.getBusLotStatusSimulatorStatus().then(function(res){
     $scope.settIngSCtatus.busLotSimulatorStatus =res.data;
     });*/
    settingsService.getDemographicSimulatorStatus().then(function(res){
        $scope.settIngSCtatus.demographySimulatorStatus =res.data;
    });
    settingsService.getLoadingOccupancySimulatorStatus().then(function(res){
        $scope.settIngSCtatus.loadingSimulatorStatus =res.data;
    });
    settingsService.getBusScheduleSimulatorStatus().then(function(res){
        $scope.settIngSCtatus.busScheduleSimulatorStatus =res.data;
    });
    settingsService.getElderlyQueueSimulatorStatus().then(function(res){
        $scope.settIngSCtatus.elderlyQueueSimulatorStatus =res.data;
    });
    function getStatusForStopAndStart(){
        if($scope.settIngSCtatus.demographySimulatorStatus&&
            $scope.settIngSCtatus.loadingSimulatorStatus&&
            $scope.settIngSCtatus.busScheduleSimulatorStatus&&
            $scope.settIngSCtatus.elderlyQueueSimulatorStatus){
            $scope.settIngSCtatus.startAllSimulator = true;
            $scope.settIngSCtatus.stopAllSimulator = false;
        }
    }
    $scope.setSimulatorForElderlyQueue = function(flag){
        if(!flag){
            settingsService.stopElderlyQueueSimulator();
            $scope.settIngSCtatus.startAllSimulator = false;
        }else{
            settingsService.startElderlyQueueSimulator();
            $scope.settIngSCtatus.stopAllSimulator =false;
        }
        getStatusForStopAndStart();
    };
    $scope.setSimulatorForLoadingOccupancy = function(flag){
        if(!flag){
            settingsService.stopLoadingOccupancySimulator();
            $scope.settIngSCtatus.startAllSimulator = false;
        }else{
            settingsService.startLoadingOccupancySimulator();
            $scope.settIngSCtatus.stopAllSimulator = false;
        }
        getStatusForStopAndStart();
    };
    $scope.setSimulatorForDemographic = function(flag){
        if(!flag){
            settingsService.stopDemographicSimulator();
            $scope.settIngSCtatus.startAllSimulator = false;
        }else{
            settingsService.startDemographicSimulator();
            $scope.settIngSCtatus.stopAllSimulator = false;
        }
        getStatusForStopAndStart();
    };
    $scope.setSimulatorForBusSchedule = function(flag){
        if(!flag){
            settingsService.stopBusScheduleSimulator();
            $scope.settIngSCtatus.startAllSimulator = false;
        }else{
            settingsService.startBusScheduleSimulator();
            $scope.settIngSCtatus.stopAllSimulator = false;
        }
        getStatusForStopAndStart();
    }
    $scope.startAllSimulator = function(flag){
        $scope.settIngSCtatus.startAllSimulator= true;
        $scope.settIngSCtatus.stopAllSimulator =false;
        settingsService.startAllSimulator();
        $scope.settIngSCtatus.elderlyQueueSimulatorStatus =true;
        $scope.settIngSCtatus.demographySimulatorStatus =true;
        $scope.settIngSCtatus.loadingSimulatorStatus =true;
        $scope.settIngSCtatus.startAllSimulator=true;
        $scope.settIngSCtatus.busScheduleSimulatorStatus=true;
    };
    $scope.stopAllSimulator = function(){
        $scope.settIngSCtatus.startAllSimulator= false;
        $scope.settIngSCtatus.stopAllSimulator= true;
        settingsService.stopAllSimulator();
        $scope.settIngSCtatus.elderlyQueueSimulatorStatus =false;
        $scope.settIngSCtatus.demographySimulatorStatus =false;
        $scope.settIngSCtatus.loadingSimulatorStatus =false;
        $scope.settIngSCtatus.startAllSimulator=false
        $scope.settIngSCtatus.busScheduleSimulatorStatus=false;
    };
    function init(){
        getStatusForStopAndStart();
    }
    init();
});