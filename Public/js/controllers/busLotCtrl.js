/**
 * Created by Suhas on 2/17/2016.
 */
taxiFleetManager.controller("busLotCtrl", function ($scope, authInterceptor,configService,busLotService,$rootScope,mapService) {
    var busLotParkingTimerId;

    $scope.busLotStatusDetails = {
        busLotStatusData: [],
        busLotStatusDetailsFlag: false,
        busOccupiedCount: 0,
        busEmptyCount: 0,
        busParkingRefresherStatus:true,
        isBusParkingDataRecieved:false
    };

    //...... Slider initialization......
    $scope.slickConfig = {
        dots: true,
        slide:'li',
        infinite: false,
        enabled: false,
        swipe: true,
        dotsClass: 'parkingNav',
        customPaging: function(slider, i) {
            return '';
        }
    };
    $rootScope.$on('notifyBusParkingData',function(data){
        plotBusParkingData();
        $scope.busParkingDate = new Date();
        $scope.busLotStatusDetails.isBusParkingDataRecieved = true;
        $scope.$apply();
    });
    function plotBusParkingData(){

        if(busLotParkingTimerId){
            clearTimeout(busLotParkingTimerId)
        }
        isBusParkingDataStatusReceiverTimer();
        var busLotParkingData = busLotService.getMapParkingData();
        if(busLotParkingData){
            var data = busLotParkingData.parkingData;
            var emptyCount = 0, occupiedCount = 0;
            var lane=$(".parkingLanes ul li");
            var laneLength= $scope.busLotStatusDetails.busLotStatusData.length;
            if(laneLength>0){
                lane.removeClass("_0");
                lane.removeClass("_1");
                lane.removeClass("_2");
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status ===0) {
                        emptyCount = emptyCount + 1;
                    }
                    if (data[i].status ===1) {
                        occupiedCount = occupiedCount + 1;
                    }
                    if (i === data.length - 1) {
                      $scope.busLotStatusDetails.busOccupiedCount = occupiedCount;
                        $scope.busLotStatusDetails.busEmptyCount = emptyCount;
                    }
                    $(".parkingLanes ul li#"+(data[i].bayId)).addClass("_"+(data[i].status).toString());
                }
            }
            else{
                $scope.busLotStatusDetails.busLotStatusData = data;

                //..... to enable slider.......
                if(!$scope.admin){
                    $scope.slickConfig.enabled = true;
                }

                for (var i = 0; i <data.length; i++) {
                    if (data[i].status == 0) {
                        emptyCount = emptyCount + 1;
                    }
                    if (data[i].status == 1) {
                        occupiedCount = occupiedCount + 1;
                    }
                    if (i === data.length-1) {
                        $scope.busLotStatusDetails.busOccupiedCount = occupiedCount;
                        $scope.busLotStatusDetails.busEmptyCount = emptyCount;
                    }
                }


            }
            $scope.busLotStatusDetails.busLotStatusDetailsFlag = false;/*
            $scope.busLotStatusDetails.busParkingRefresherStatus=true;*/
        }


    }
    function getBusParkingData(){
        $scope.busLotStatusDetails.busLotStatusDetailsFlag=true;
        busLotService.getBusLotData().then(function(res){
        })
    }
    function getBusParkingRefresherStatus(){
        configService.getBusParkingStatusSimulatorStatus().then(function(res){
            $scope.busLotStatusDetails.busParkingRefresherStatus=res.data;
        })
    }
    function getBusParkingDataForFirstTime(){
        plotBusParkingData();
    }
    $scope.setMapStatus = function(flag){
        mapService.setMapShowStatus(flag);
    }
    function init(){
        getBusParkingRefresherStatus();
        getBusParkingData();
        getBusParkingDataForFirstTime();
    }
    init();
    $scope.$on('$destroy', function (event) {
        /*socket.removeListener('busLotDataPusher')*/
    });
    function isBusParkingDataStatusReceiverTimer(){
        busLotParkingTimerId = setTimeout(function(){ isBusParkingDataStatusFalse(); },1000*60);
    }
    function isBusParkingDataStatusFalse(){
        $scope.busLotStatusDetails.isBusParkingDataRecieved = false;
        $scope.$apply();
    }
});