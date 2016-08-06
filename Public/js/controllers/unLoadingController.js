/**
 * Created by Suhas on 3/9/2016.
 */
smrt.controller("unloadingCtrl", function ($scope,authInterceptor,unloadingBayService,$rootScope,busLotService) {
        var unLoadingBayTimerId;
        $scope.unloadingBayDetails = {
                unloadingBayArray:[],
                statusCount:{
                        empty:0,
                        occupied:0
                },
                isUnloaderDataRecieved:false
        }
        $rootScope.$on('notifyBusParkingData',function(data){
                mapUnloadingBayStatus();
                $scope.unloadingBertDate = new Date();
                $scope.unloadingBayDetails.isUnloaderDataRecieved = true;
                $scope.$apply();
        });
        /*socket.on('busLotDataPusher',function(data){
                mapUnloadingBayStatus(data);
                $scope.$apply();
        });*/
        function mapUnloadingBayStatus(){
                if(unLoadingBayTimerId){
                     clearTimeout(unLoadingBayTimerId)
                }
                isUnLoadingDataStatusReceiverTimer();

                $scope.unloadingBayDetails.statusCount.occupied=0;
                $scope.unloadingBayDetails.statusCount.empty=0
                /*var busParkingData = data;*/
                var busParkingData = busLotService.getMapParkingData();
                if(busParkingData){
                        var statusArray = busParkingData.unloadingBayData;
                        for(var i=0;i<statusArray.length;i++){
                                var statusObj = statusArray[i];
                                var bayId = statusArray[i].bayId;
                                var index = parseInt(bayId.substring(1, 2));
                                var data={
                                        status:parseInt(statusObj.status),
                                        bayId:bayId
                                }
                                if(parseInt(statusObj.status)==0){
                                        $scope.unloadingBayDetails.statusCount.empty++;
                                }else if(parseInt(statusObj.status)==1){
                                        $scope.unloadingBayDetails.statusCount.occupied++;
                                }
                                $scope.unloadingBayDetails.unloadingBayArray[index-1] = data;
                        }
                }
        }
        function getUnloadingBayDetailsForFirstTime(){
                busLotService.getBusLotData().then(function(res){
                        /*mapUnloadingBayStatus(res.data)*/
                })
        }
        function getDataForParking(){
                mapUnloadingBayStatus();
        }
        function init(){
                getUnloadingBayDetailsForFirstTime();
                getDataForParking();
        }
        init();
        function isUnLoadingDataStatusReceiverTimer(){
                unLoadingBayTimerId = setTimeout(function(){ setUnLoadingDataReceiverStatusFalse(); },1000*60);
        }
        function setUnLoadingDataReceiverStatusFalse(){
                $scope.unloadingBayDetails.isUnloaderDataRecieved = false;
                $scope.$apply();
        }
})