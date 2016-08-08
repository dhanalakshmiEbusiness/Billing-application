/**
 * Created by Suhas on 2/25/2016.
 */
taxiFleetManager.controller("configController", function ($scope,configService,authInterceptor) {
        //$( "#slider" ).slider();

        $scope.configDetails = {
                busParkingDetails:{
                        refreshedTime:5,
                        refreshTimeUnit:'Sec',
                        refreshTimeInMilliSeconds:2*1000,
                        busParkingRefresherStatus:false

                },
                loadingBayDetails:{
                        aggregationTime:5,
                        aggregationRefreshTime:15,
                        aggregationRefreshTimeInMilliSeconds:5*60*1000,
                        isAggregation:false,
                        aggregationTimeUnit:'Sec',
                        aggregationRefreshTimeUnit:'Sec',
                        loadingBayCapacity:[
                                {berthId:1, berthCapacity:100},
                                {berthId:2, berthCapacity:100},
                                {berthId:3, berthCapacity:100},
                                {berthId:4, berthCapacity:100},
                                {berthId:5, berthCapacity:100},
                                {berthId:6, berthCapacity:100},
                                {berthId:7, berthCapacity:100},
                                {berthId:8, berthCapacity:100},
                                {berthId:9, berthCapacity:100}
                        ],
                        laneCapacity:[100,100,100,50]
                },
                threshold:{
                        elderly:20
                },
                demographicDetails:{
                        showGender:false
                },
                smsDetails:{
                        phoneNo:911234567890,
                        smsSendingStatus:false
                },
                simulator:{
                        show:false
                },
                clearArrival:{
                        show:true
                },
                clearDepature:{
                        show:true
                },
                physicallyChallengeDetails:{
                        isAggregation:false,
                        aggregationRefreshTime:5,
                        aggregationPeriod:120,
                        aggregationRefreshTimeUnit:'Sec',
                        aggregationTimeUnit:'Sec',
                        aggregationRefreshTimeInMilliSeconds:1000,
                },
                userDetails:{
                        isAdminStatus:false
                }
        }
        /*****function called on submit on config*******/
        $scope.submitConfigData = function(){
                setBusParkingRefreshTime();
                setLoadingBayRefreshTime();
                setLoadingBayAggregationTime();
                setElderlyOccupancyThreshold();
                setLoadingBayCapacity();
                setSMSDetails();
                setSimulatorForBusLot($scope.configDetails.busParkingDetails.busParkingRefresherStatus)
                setAggregationForLoadingBay($scope.configDetails.loadingBayDetails.isAggregation);
        }

        /************************Bus-Parking Related************************/
        $scope.changeBusParkingTimeUnit =function(unit){
                $scope.configDetails.busParkingDetails.refreshTimeUnit=unit;
                if(unit==='Sec'){
                        $scope.configDetails.busParkingDetails.refreshedTime=$scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds/1000;
                }else{
                        $scope.configDetails.busParkingDetails.refreshedTime=$scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds/(60*1000);
                }

        }

        /************************ Loading-Bay occupancy  Related************/
        $scope.changeAggregationTimeUnit =function(unit){
                $scope.configDetails.loadingBayDetails.aggregationTimeUnit=unit;
                if(unit==='Sec'){
                        $scope.configDetails.loadingBayDetails.aggregationTime=$scope.configDetails.loadingBayDetails.aggregationTime*60;
                }else{
                        $scope.configDetails.loadingBayDetails.aggregationTime=$scope.configDetails.loadingBayDetails.aggregationTime/60;
                }

        }
        $scope.changeAggregationRefreshTimeUnit =function(unit){
                $scope.configDetails.loadingBayDetails.aggregationRefreshTimeUnit=unit;
                if(unit==='Sec'){
                        $scope.configDetails.loadingBayDetails.aggregationRefreshTime=$scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds/1000;
                }else{
                        $scope.configDetails.loadingBayDetails.aggregationRefreshTime=$scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds/(60*1000);
                }

        }
        /*$scope.setSimulatorForBusLot = function(flag){
                if(!flag){
                        configService.stopBusParkingStatusSimulator();
                }else{
                        configService.startBusParkingStatusSimulator();
                }
        }*/
        function getLoadingBayAggregationRefreshTime(){
                configService.getAggregationRefreshTime().then(function(res){
                        $scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds=parseInt(res.data.loadingOccupancyRefreshTime);
                        $scope.configDetails.loadingBayDetails.aggregationRefreshTime=$scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds/1000;
                });
        }
        function getLoadingBayAggregationTime(){
                configService.getAggregationTime().then(function(res){
                        $scope.configDetails.loadingBayDetails.aggregationTime=parseInt(res.data.loadingOccupancyAggregationTime);
                });
        }
        function getLoadingBayAggregationStatus(){
                configService.getAggregationStatus().then(function(res){
                        $scope.configDetails.loadingBayDetails.isAggregation=res.data;
                })
        }

        /*********--Called on checking or unchecking of aggregation checkbox of configuration page--*********/
        /*$scope.setAggregationForLoadingBay=function(flag){
                if(flag){
                        configService.startLoadingBayAggregation();
                }else{
                        configService.stopLoadingBayAggregation();
                }
        }*/
        /************--function called on submit--************/
        function setBusParkingRefreshTime(){
                if($scope.configDetails.busParkingDetails.refreshedTime!=0){
                        if($scope.configDetails.busParkingDetails.refreshTimeUnit==='Sec'){
                                $scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds = $scope.configDetails.busParkingDetails.refreshedTime*1000;
                                configService.setBusParkingRefreshTime($scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds);
                        }else{
                                $scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds = $scope.configDetails.busParkingDetails.refreshedTime*60*1000;
                                configService.setBusParkingRefreshTime($scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds);
                        }
                }else{
                        $scope.configDetails.busParkingDetails.refreshedTime= 5;
                        if($scope.configDetails.busParkingDetails.refreshTimeUnit==='Sec'){
                                $scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds = $scope.configDetails.busParkingDetails.refreshedTime*1000;
                                configService.setBusParkingRefreshTime($scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds);
                        }else{
                                $scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds = $scope.configDetails.busParkingDetails.refreshedTime/60;
                                configService.setBusParkingRefreshTime($scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds);
                        }
                        }
                }

        function setLoadingBayAggregationTime(){
                if($scope.configDetails.busParkingDetails.refreshedTime!=0){
                        if($scope.configDetails.loadingBayDetails.aggregationTimeUnit==='Sec'){
                                configService.setAggregationTime($scope.configDetails.loadingBayDetails.aggregationTime);
                        }else{
                                $scope.configDetails.loadingBayDetails.aggregationTime = $scope.configDetails.loadingBayDetails.aggregationTime*60;
                                configService.setAggregationTime($scope.configDetails.loadingBayDetails.aggregationTime);
                        }
                }else{
                        if($scope.configDetails.loadingBayDetails.aggregationTimeUnit==='Sec'){
                                $scope.configDetails.loadingBayDetails.aggregationTime = 5;
                                configService.setAggregationTime($scope.configDetails.loadingBayDetails.aggregationTime);
                        }else{
                                $scope.configDetails.loadingBayDetails.aggregationTime = 5/60;
                                configService.setAggregationTime($scope.configDetails.loadingBayDetails.aggregationTime);
                        }
                }
        }
        function setLoadingBayRefreshTime(){
                if($scope.configDetails.loadingBayDetails.aggregationRefreshTime!=0){
                        if($scope.configDetails.loadingBayDetails.aggregationRefreshTimeUnit==='Sec'){
                                $scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds = $scope.configDetails.loadingBayDetails.aggregationRefreshTime*1000;
                                configService.setAggregationRefreshTime($scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds);
                        }else{
                                $scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds = $scope.configDetails.loadingBayDetails.aggregationRefreshTime*60*1000;
                                configService.setAggregationRefreshTime($scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds);
                        }
                }else{
                        $scope.configDetails.loadingBayDetails.aggregationRefreshTime=5;
                        if($scope.configDetails.loadingBayDetails.aggregationRefreshTimeUnit==='Sec'){
                                $scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds = $scope.configDetails.loadingBayDetails.aggregationRefreshTime*1000;
                                configService.setAggregationRefreshTime($scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds);
                        }else{
                                $scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds = $scope.configDetails.loadingBayDetails.aggregationRefreshTime*60*1000;
                                configService.setAggregationRefreshTime($scope.configDetails.loadingBayDetails.aggregationRefreshTimeInMilliSeconds);/*acasc*/
                        }
                }

        }
        /*function getElderlyThresholdOccupancy(){
                configService.getElderlyOccupancyThreshold().then(function(response){
                        $scope.configDetails.threshold.elderly=response.data.elderlyLoadingOccupancy;
                });
        }*/
        function setElderlyOccupancyThreshold(){
                configService.setElderlyOccupancyThreshold($scope.configDetails.threshold.elderly);
        }
        /*function getDemographicShowGenderStatus(){
                configService.getDemographicGenderShowStatus().then(function(res){
                        $scope.configDetails.demographicDetails.showGender=res.data.showGenderCount
                })
        }*/
        $scope.setDemographicGenderCountStatus=function(flag){
                configService.setDemographicGenderShowStatus(flag)
        }
        function setLoadingBayCapacity(){
                configService.setBayCapacityValue($scope.configDetails.loadingBayDetails.laneCapacity);
        }
        function getLoadingBerthSettingsDetails(data){
                /*configService.getLoadingBayCapacity().then(function(res){
                        if(res.data && res.data.length>0){*/
                                for(var i=0;i<data.length;i++){
                                        var berthObj =data[i];
                                        var laneIndex = berthObj.laneId;
                                        $scope.configDetails.loadingBayDetails.laneCapacity[laneIndex-1] =berthObj.berthCapacity;
                                        $scope.configDetails.loadingBayDetails.laneCapacity[3]=berthObj.speciallyChallengedCapacity;
                                }
                      /*  }
                })*/
        }

        /************--function called on controller initialized--************/
        function getSettingDetails(){
                configService.getSettingsDetails().then(function(res){
                        var settingsDetails= res.data;
                        $scope.configDetails.smsDetails = settingsDetails.smsNotification;
                        $scope.configDetails.threshold.elderly=settingsDetails.threshold.elderlyLoadingOccupancy;
                        $scope.configDetails.demographicDetails.showGender=settingsDetails.demographicDetails.showGenderCount;
                        $scope.configDetails.simulator.show=settingsDetails.settingsData.showSimulatorPage;
                        $scope.configDetails.busParkingDetails.refreshTimeInMilliSeconds=settingsDetails.busParkingDetails.refreshTime;
                        $scope.configDetails.clearArrival=settingsDetails.busEntryExitStatus.clearBusArrivalStatus;
                        $scope.configDetails.busParkingDetails.busParkingRefresherStatus=settingsDetails.busParkingDetails.refreshStatus;
                        /****************************************-----elderly Aggregation Details-----****************************************/
                       /* $scope.configDetails.physicallyChallengeDetails.isAggregation=settingsDetails.physicallyChallengeDetails.isAggregation;
                        $scope.configDetails.physicallyChallengeDetails.refreshTimeInMilliSeconds=settingsDetails.physicallyChallengeDetails.refreshTime;
                        $scope.configDetails.physicallyChallengeDetails.aggregationPeriod=settingsDetails.physicallyChallengeDetails.aggregationPeriod;*/


                     /* $scope.configDetails.physicallyChallengeDetails.aggregationRefreshTimeInMilliSeconds=settingsDetails.physicallyChallengeDetails.refreshTime;
                        $scope.configDetails.loadingBayDetails.aggregationRefreshTime=settingsDetails.physicallyChallengeDetails.refreshTime/1000;*/



                        getLoadingBerthSettingsDetails(settingsDetails.loadingOccupancy);
                        $scope.changeBusParkingTimeUnit($scope.configDetails.busParkingDetails.refreshTimeUnit);
                        $scope.changeBusParkingTimeUnit($scope.configDetails.busParkingDetails.refreshTimeUnit);
                })
        }
        function setSMSDetails(){
                configService.setSMSDetails($scope.configDetails.smsDetails)
        }
        $scope.setAutoSMSStatus = function(flag){
                configService.setAutoSMSStatus(flag);
        }
        $scope.setSimulatorFlag = function(){
                configService.setShowSimulatorStatus($scope.configDetails.simulator.show).then(function(res){
                        var flag= $scope.configDetails.simulator.show;
                        var data = {
                                flag:flag
                        }
                        $scope.$emit('simulatorStatus',data);
                })


        }

        $scope.setClearBusArrival=function(){
                console.log($scope.configDetails.clearArrival)
                configService.setBusArrivalStatus($scope.configDetails.clearArrival)
                    .then(function(res){
                            console.log("********Button Removed***********")
                })
        }

        $scope.setClearBusDepature=function(){

                configService.setBusDepartureStatus($scope.configDetails.clearDepature)
                    .then(function(res){
                            console.log("********Button Removed***********")
                    })
        }
        function getAdminStatus(){
                $scope.configDetails.userDetails.isAdminStatus=authInterceptor.getIsAdminStatus()
        }
        function setAggregationForLoadingBay(flag){
                if(flag){
                        configService.startLoadingBayAggregation();
                }else{
                        configService.stopLoadingBayAggregation();
                }
        }
        function setSimulatorForBusLot(flag){
                if(!flag){
                        configService.stopBusParkingStatusSimulator();
                }else{
                        configService.startBusParkingStatusSimulator();
                }
        }
        function init(){
                getLoadingBayAggregationTime();
                getLoadingBayAggregationRefreshTime();
                getLoadingBayAggregationStatus();
                getSettingDetails();
                getAdminStatus();
        }
        init();
})