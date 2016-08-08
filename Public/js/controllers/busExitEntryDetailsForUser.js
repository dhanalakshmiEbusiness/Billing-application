/**
 * Created by Suhas on 2/24/2016.
 */
taxiFleetManager.controller("busEntryExitUserCtrl", function ($scope,authInterceptor,busEntryExitService) {
        $scope.busEntryExitDetails = {
                busSchedule:[],
                busScheduleCountPageNo:1,
                busSchedulePageSelected:1,
                selectedType:'Arr',
                arrivalStatus:1
        };
        socket.on('busEntryExitData',function(data){
                updateBusEntryExitTable(data);
                $scope.$apply();
        });
        function updateBusEntryExitTable(data){
                var busEntryExitArray = data.busEntryExitInformation.busEntryExitEvent;
                for(var i=0;i<busEntryExitArray.length;i++){
                        var status = busEntryExitArray[i].direction;
                        var busRelatedData = busEntryExitArray[i];
                        busRelatedData.date = data.busEntryExitInformation.receivedDateTime;
                        if(status==='ENTRY' && $scope.busEntryExitDetails.busScheduleCountPageNo == 1
                                && $scope.busEntryExitDetails.selectedType==='Arr'){
                                if($scope.busEntryExitDetails.busSchedule.length>=10){
                                        $scope.busEntryExitDetails.busSchedule.pop()
                                        $scope.busEntryExitDetails.busSchedule.unshift(busRelatedData);
                                }else{
                                        $scope.busEntryExitDetails.busSchedule.unshift(busRelatedData);
                                }

                        }
                        else  if(status==='EXIT' && $scope.busEntryExitDetails.busScheduleCountPageNo == 1
                                && $scope.busEntryExitDetails.selectedType==='Dep'){

                                if($scope.busEntryExitDetails.busSchedule.length>=10){
                                        $scope.busEntryExitDetails.busSchedule.pop()
                                        $scope.busEntryExitDetails.busSchedule.unshift(busRelatedData);
                                }else{
                                        $scope.busEntryExitDetails.busSchedule.unshift(busRelatedData);
                                }
                        }
                }
        }
        function getBusEntryExitCount(){
                busEntryExitService.getBusEntryExitCount().then(function(result){
                        var busEntryCount = result.data.EntryCount;
                        var busExitCount = result.data.ExitCount;
                        if($scope.busEntryExitDetails.selectedType==='Dep'){
                                if(busEntryCount>100){
                                        $scope.busEntryExitDetails.busScheduleCountPageNo=10;
                                }else{
                                        $scope.busEntryExitDetails.busScheduleCountPageNo=Math.round((busEntryCount/10))
                                }
                        }else{
                                if(busExitCount>100){
                                        $scope.busEntryExitDetails.busScheduleCountPageNo=10;
                                }else{
                                        $scope.busEntryExitDetails.busScheduleCountPageNo=Math.round((busExitCount/10))
                                }
                        }
                })
        }
        function getBusEntryExitForSelectedRange(skip,limit,type){
                var typeOfBusDetails;
                if(type=='Arr'){
                        typeOfBusDetails="ENTRY";
                }else{
                        typeOfBusDetails="EXIT";
                }
                busEntryExitService.getBusEntryDataSkipAndLimit(skip,limit,typeOfBusDetails).then(function(res){
                        var busEntryExitArray = res.data;
                        $scope.busEntryExitDetails.busExit=[];
                        for(var i=0;i<busEntryExitArray.length;i++){
                                var busRelatedData = busEntryExitArray[i].busEntryExitInformation.busEntryExitEvent;
                                busRelatedData.date=busEntryExitArray[i].busEntryExitInformation.receivedDateTime;
                                $scope.busEntryExitDetails.busSchedule.unshift(busRelatedData);
                        }
                })
        }
        $scope.setBusScheduleType = function(type){
                if(type=='Arr'){
                        $scope.busEntryExitDetails.arrivalStatus=1;

                }else{
                        $scope.busEntryExitDetails.arrivalStatus=0;
                }

                $scope.busEntryExitDetails.busSchedule=[];
                $scope.busEntryExitDetails.selectedType=type;
                getBusEntryExitForSelectedRange(0,10,type);
        };
        getBusEntryExitForSelectedRange(0,10,$scope.busEntryExitDetails.selectedType);
});