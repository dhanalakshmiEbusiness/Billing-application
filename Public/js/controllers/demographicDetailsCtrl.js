/**
 * Created by Suhas on 2/15/2016.
 */
taxiFleetManager.controller("demographicDetailsCtrl", function ($scope,authInterceptor,$rootScope,
                                                    demographicDetailService,$state,configService) {
        $scope.male=0;
        $scope.female=0;
        $scope.demographicRelatedDetails={
                graphDetails:{
                        xAxisDay:['6-10','11-20','21-30','31-40','41-50','51-60','61-70','71-100'],
                        yAxisDay:[{data:[0,0,0,0,0,0,0,0]}],
                        secondsSelected:30,
                        secondsSelectedForDropDown:"Last 30 Sec",
                        maleCount:0,
                        femaleCount:0,
                        graphDetailsFlag:true,
                        adultCount:0,
                        elderCount:0,
                },
                status:{
                        showGenderCount:false
                }
        }
        socket.on('configSettingsOnStart',function(data){
                if($scope.demographicRelatedDetails.status.showGenderCount){
                        $scope.setSecondsForDemographicGraph(data.demographicRelatedData.secondsSelected)
                }
                $scope.$apply();
        });
        function updateAgeGraph(data){
                var chart = $("#demographicGraph .columnChart").highcharts();
                if(chart){
                        chart.series[0].setData([data[0]['0-10'],data[0]['11-20'],data[0]['21-30'],
                        data[0]['31-40'],data[0]['41-50'],data[0]['51-60'],data[0]['61-70'],data[0]['71-100']]);
                }
                $scope.demographicRelatedDetails.graphDetails.maleCount=data[0]['male'];
                $scope.demographicRelatedDetails.graphDetails.femaleCount=data[0]['female'];
                $scope.demographicRelatedDetails.graphDetails.adultCount=data[0]['adultCount'];
                $scope.demographicRelatedDetails.graphDetails.elderCount=data[0]['elderCount'];
        }
        $scope.setSecondsForDemographicGraph = function(seconds){
                $scope.demographicRelatedDetails.graphDetails.secondsSelected=seconds;
                if(seconds!=30){
                        $scope.demographicRelatedDetails.graphDetails.secondsSelectedForDropDown="Last "+(seconds/60)+" min";
                }else{
                        $scope.demographicRelatedDetails.graphDetails.secondsSelectedForDropDown="Last 30 sec";
                }

                socket.emit('setDemographicConfigurationForSeconds',seconds);
        }
        $rootScope.$on('personNotifiedForASelectedPeriodOfTime',function(data){
                var demographicData = demographicDetailService.getGraphData();
                updateAgeGraph(demographicData);
        })
        function getDemographicShowGenderStatus(){
                configService.getDemographicGenderShowStatus().then(function(res){
                        $scope.demographicRelatedDetails.status.showGenderCount=res.data.showGenderCount
                        if(!$scope.demographicRelatedDetails.status.showGenderCount){
                                socket.removeListener('personNotifiedForASelectedPeriodOfTime');
                                socket.removeListener('configSettingsOnStart');
                        }
                })
        }
        function init(){
                demographicDetailService.startPushingDemographicDetails(30);
                getDemographicShowGenderStatus();
        }
        init();

})