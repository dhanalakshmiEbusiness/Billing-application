/**
 * Created by Suhas on 2/13/2016.
 */
taxiFleetManager.controller("loadingOccupancyCtrl", function ($scope,authInterceptor,$rootScope,
  loadingOccupancyInfoService,notificationService,configService,$location){
        $scope.currentRout= function (path) {
                var loc=$location.path();
                return loc.includes(path)
        };
        var timerId;
        $scope.laneOccupancyRelatedData={
                occupancy:[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
                elderlyOccupancy:[0,0,0,0,0,0,0,0,0],
                threshold:{
                        elderlyLoadingOccupancy:50
                },
                loadingOccupancyType:"%",
                berthCapacityDefaultVal:[1,1,1,1],
                berthCapacityCount:[1,1,1,1],
                berthCapacity:[1,1,1,1],
                routeNo:[[],[],[],[],[],[],[],[],[]],
                popUpDetails:{
                        elderlyDetails:{
                                berthId:1,
                                image:['','','','','','','','','']
                        }
                },
                loadingDataStabsReceiverTimerId:'',
                isUnloaderDataRecieved:false
        };
        /*$rootScope.$on('loadingOccupancyInfoAlert',function(data){
                var loadingOccupancyData = loadingOccupancyInfoService.getLoadingOccupancyDetails();
                $scope.laneOccupancyRelatedData.occupancy = loadingOccupancyData;
        });*/
        socket.on('loadingOccupancyInfo',function(data){
                $scope.laneOccupancyRelatedData.occupancy = data;
                $scope.$apply();
        })
        $rootScope.$on('ElderlyQueueInfo',function(data){
                var elderQueueInfoValue = loadingOccupancyInfoService.getElderlyQueueInfoDetails();
                updateElderQueueOccupancy(elderQueueInfoValue);
        });
        $rootScope.$on('ElderlyAggregationQueueInfo',function(data){
                /*var elderQueueInfoValue = loadingOccupancyInfoService.getElderlyLoadingOccupancyDetailsForAggregation();
                updateElderQueueOccupancyFromAggregatedData(elderQueueInfoValue);
                $scope.$apply();*/
        });
        socket.on('elderlyAggregationQueueInfo',function(data){
                var elderQueueInfoValue = data;
                updateElderQueueOccupancyFromAggregatedData(elderQueueInfoValue);
                $scope.$apply();
        })
        $scope.alertLoadingOccupancy = function(val){
                var threshold = 70/*$scope.laneOccupancyRelatedData.threshold.elderlyLoadingOccupancy*/;
                var classAnimate='';
                if(val>threshold){
                        classAnimate='animate';
                }
                return classAnimate;

        }
        $scope.colorOfDiv = function(val){
                var divColor=''
                if(val<=30){
                        divColor='less';
                }else if(val<70 && val>30){
                        divColor='normal';
                }else{
                        divColor='more';
                }
                return divColor;
        }
        function updateElderQueueOccupancy(data){
                var thresholdOccupancy =$scope.laneOccupancyRelatedData.threshold.elderlyLoadingOccupancy;
                for(var i=0;i<data.length;i++){
                        $scope.laneOccupancyRelatedData.elderlyOccupancy[data[i]._id.berthIndex-1]= data[i].queueOccupancy;
                }
        }
        socket.on('pushEveryTickLoadingOccupancy',function(data){
                $scope.loadingOccupancyDate = new Date();
                pushEveryTickLoadingOccupancyData(data);
                $scope.$apply();
        })
        socket.on('pushEveryTickElderlyOccupancy',function(data){
               pushEveryTickElderlyData(data);
                $scope.$apply();
        })
        function pushEveryTickLoadingOccupancyData(data){
                $scope.laneOccupancyRelatedData.isUnloaderDataRecieved = true;
                if(timerId){
                        clearTimeout(timerId);
                }
                isLoadingDataStabsReceiverTimer();
                $scope.laneOccupancyRelatedData.occupancy[data.laneIndex-1][data.berth-1]=data.occupancy;
                $scope.laneOccupancyRelatedData.routeNo[data.berth-1][0]=data.redQueueBusNumber;
                $scope.laneOccupancyRelatedData.routeNo[data.berth-1][1]=data.blueQueueBusNumber;
                $scope.laneOccupancyRelatedData.routeNo[data.berth-1][2]=data.greenQueueBusNumber;
        }
        function pushEveryTickElderlyData(data){
                var elderlyOccupancyData = data.queueLevelInformation.elderlyQueueLevel;
                var berthIndex = elderlyOccupancyData.berthIndex;
                var occupancy = elderlyOccupancyData.occupancy;
                var image = elderlyOccupancyData.image
                $scope.laneOccupancyRelatedData.elderlyOccupancy[berthIndex-1]=occupancy;
                $scope.laneOccupancyRelatedData.popUpDetails.elderlyDetails.image[berthIndex-1]=image;
        }
        $scope.loadingOccupancyUnitType=function (unitType){
                $scope.laneOccupancyRelatedData.loadingOccupancyType=unitType;
                if(unitType==="%"){
                        $scope.laneOccupancyRelatedData.berthCapacity=
                            $scope.laneOccupancyRelatedData.berthCapacityDefaultVal
                }
                else{
                        $scope.laneOccupancyRelatedData.berthCapacity=
                            $scope.laneOccupancyRelatedData.berthCapacityCount
                }

        }
        $scope.$on('$destroy', function (event) {
                socket.removeListener('pushEveryTickLoadingOccupancy')
                socket.removeListener('elderlyAggregationQueueInfo')
        });
        function getElderlyOccupancyThreshold(){
                configService.getElderlyOccupancyThreshold().then(function(res){
                        $scope.laneOccupancyRelatedData.threshold.
                            elderlyLoadingOccupancy=res.data.elderlyLoadingOccupancy;
                });
        };
        function getBerthCapacity(){
                configService.getLoadingBayCapacity().then(function(res){
                        var loadingBayCapacity = res.data;
                        for(var i=0;i<loadingBayCapacity.length;i++){
                                var berthIndex =loadingBayCapacity[i].berthId;
                                var laneIndex = loadingBayCapacity[i].laneId;
                                var capacityPerPercentile = loadingBayCapacity[i].berthCapacity/100;
                                var speciallyChallengeCapacity = loadingBayCapacity[i].speciallyChallengedCapacity/100;
                                $scope.laneOccupancyRelatedData.berthCapacityCount[laneIndex-1]=capacityPerPercentile;
                                /*$scope.laneOccupancyRelatedData.routeNo[berthIndex-1][laneIndex-1]=loadingBayCapacity[i].routeNo;*/
                                $scope.laneOccupancyRelatedData.berthCapacityCount[3]=speciallyChallengeCapacity;
                        }
                })
        }
        $scope.elderlyThreshold = function(val){
                var divColor='';
                if(val>=$scope.laneOccupancyRelatedData.threshold.elderlyLoadingOccupancy){
                        divColor='animate';
                }
                return divColor;
        }
        function updateElderQueueOccupancyFromAggregatedData(data){
                if(data){
                        for(var i=0;i<data.length;i++){
                                var berthIndex = data[i]._id.berthIndex;
                                var occupancy = data[i].queueOccupancy;
                                $scope.laneOccupancyRelatedData.elderlyOccupancy[berthIndex-1]=occupancy;
                        }
                }
        }
        function init(){
                getElderlyOccupancyThreshold();
                getBerthCapacity();
        }
        init();
        function isLoadingDataStabsReceiverTimer(){
                timerId = setTimeout(function(){ isLoadingDataStatusfalse(); },1000*60);
        }
        function isLoadingDataStatusfalse(){
                        $scope.laneOccupancyRelatedData.isUnloaderDataRecieved = false;
                $scope.$apply();
        }
});