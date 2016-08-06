/**
 * Created by Suhas on 2/23/2016.
 */
smrt.controller("busEntryExitCtrl", function ($scope,authInterceptor,busEntryExitService,configService,constantService) {
        var busExitTimerId;
        var busEntryTimerId;
        $scope.busEntryExitDetails = {
                busEntry:[],
                busExit:[],
                busEntryCountPageNo:1,
                busExitCountPageNo:1,
                busEntryPageSelected:1,
                busExitPageSelected:1,
                busEntryClearFlag:false,
                busExitClearFlag:false,
                busArrivalFlag:1,
                busExitFlag:1,
                busDepatureFlag:1,
                busEntryCompleteCount:1,
                busExitCompleteCount:1,
                busEntryDataReceiveStatus:false,
                busExitDataReceiveStatus:false,
                entryTimer:'',
                exitTimer:'',
                constants:''
        }
        socket.on('busEntryExitData',function(data){
                updateBusEntryExitTable(data);
                getBusEntryExitCount();
                $scope.$apply();
        })
        function updateBusEntryExitTable(data){
                if(data.direction===$scope.busEntryExitDetails.constants.BUS_NUMBER_PLATE_DETECTION.BUS_ENTRANCE && $scope.busEntryExitDetails.busEntryPageSelected == 1){
                        $scope.busEntryExitDetails.busEntryClearFlag=false;
                        if($scope.busEntryExitDetails.entryTimer!=''){
                                clearTimeout($scope.busEntryExitDetails.entryTimer)
                        }
                        isBusEntryDataStabsReceiverTimer();
                        $scope.busEntryExitDetails.busEntryDataReceiveStatus = true;
                        $scope.entranceDate = new Date();
                        var busEntryData ={
                                'plateNumber':data.plate,
                                'date':data.receivedDateTime
                        }
                        if($scope.busEntryExitDetails.busEntry.length>=10){
                                $scope.busEntryExitDetails.busEntry.pop()
                                $scope.busEntryExitDetails.busEntry.unshift(busEntryData);
                        }else{
                                $scope.busEntryExitDetails.busEntry.unshift(busEntryData);
                        }
                }
                else if(data.direction===$scope.busEntryExitDetails.constants.BUS_NUMBER_PLATE_DETECTION.BUS_DEPARTURE && $scope.busEntryExitDetails.busExitPageSelected == 1){
                        $scope.exitDate = new Date();
                        $scope.busEntryExitDetails.busExitClearFlag=false;
                        if($scope.busEntryExitDetails.exitTimer!=''){
                           clearTimeout($scope.busEntryExitDetails.exitTimer)
                        }
                        isBusExitDataStabsReceiverTimer();
                        $scope.busEntryExitDetails.busExitDataReceiveStatus = true;
                        var busExitData ={
                                'plateNumber':data.plate,
                                'date':data.receivedDateTime
                        }
                        if($scope.busEntryExitDetails.busEntry.length>=10){
                                $scope.busEntryExitDetails.busExit.pop()
                                $scope.busEntryExitDetails.busExit.unshift(busExitData);
                        }else{
                                $scope.busEntryExitDetails.busExit.unshift(busExitData);
                        }
                }
        }
        function getBusEntryExitCount(){
                busEntryExitService.getBusEntryExitCount().then(function(result){
                        if(result.data.length>0){
                                var busEntryCount = result.data[0].EntryCount;
                                $scope.busEntryExitDetails.busEntryCompleteCount=Math.round((busEntryCount/10));
                                var busExitCount = result.data[0].ExitCount;
                                $scope.busEntryExitDetails.busExitCompleteCount=Math.round((busExitCount/10));
                                if(busEntryCount>100){
                                        $scope.busEntryExitDetails.busEntryCountPageNo=10;
                                }else{
                                        $scope.busEntryExitDetails.busEntryCountPageNo=Math.round((busEntryCount/10))
                                }
                                if(busExitCount>100){
                                        $scope.busEntryExitDetails.busExitCountPageNo=10;
                                }else{
                                        $scope.busEntryExitDetails.busExitCountPageNo=Math.round((busExitCount/10))
                                }
                        }else{
                                /*$scope.busEntryExitDetails.busEntryCountPageNo=0;
                                $scope.busEntryExitDetails.busExitCountPageNo=0;*/
                        }
                })
        }
        function getBusEntryElement(skip,limit){
                busEntryExitService.getBusEntryDataSkipAndLimit(skip,limit,$scope.busEntryExitDetails.constants.BUS_NUMBER_PLATE_DETECTION.BUS_ENTRANCE).then(function(res){
                        var busEntryExitArray = res.data;
                        $scope.busEntryExitDetails.busEntry=[];
                        for(var i=0;i<busEntryExitArray.length;i++){
                                var busRelatedData = busEntryExitArray[i];
                                busRelatedData.date=busEntryExitArray[i].receivedDateTime;
                                busRelatedData.plateNumber=busEntryExitArray[i].plate;
                                $scope.busEntryExitDetails.busEntry.unshift(busRelatedData);
                        }

                })
        }
        function getBusExitElement(skip,limit){
                busEntryExitService.getBusEntryDataSkipAndLimit(skip,limit,$scope.busEntryExitDetails.constants.BUS_NUMBER_PLATE_DETECTION.BUS_DEPARTURE).then(function(res){
                        var busEntryExitArray = res.data;
                        $scope.busEntryExitDetails.busExit=[];
                        for(var i=0;i<busEntryExitArray.length;i++){
                                var busRelatedData = busEntryExitArray[i];
                                busRelatedData.date=busEntryExitArray[i].receivedDateTime;
                                busRelatedData.plateNumber=busEntryExitArray[i].plate;
                                $scope.busEntryExitDetails.busExit.unshift(busRelatedData);
                        }
                })
        }
        $scope.setPageNoForArrival = function(pageNo){
                /*if(pageNo<=$scope.busEntryExitDetails.busExitCountPageNo){*/
                $scope.busEntryExitDetails.busEntryPageSelected=pageNo;
                        var skip =((pageNo-1)*10)
                        var limit=10;
                        getBusEntryElement(skip,limit);
               /* }*/
        }
        $scope.setPageNoForDeparture = function(pageNo){
                /*if(pageNo<=$scope.busEntryExitDetails.busExitCountPageNo){*/
                $scope.busEntryExitDetails.busExitPageSelected=pageNo;
                        var skip =((pageNo-1)*10)
                        var limit=10;
                        getBusExitElement(skip,limit);
               /* }*/
        }
        $scope.range = function(n) {
                return new Array(n);
        };
        $scope.clearBusArrival=function(){
                $scope.busEntryExitDetails.busExitFlag=0;
                busEntryExitService.removeBusArrival().then(function(result){
                        $scope.busEntryExitDetails.busEntry =[];
                        $scope.busEntryExitDetails.busEntryCountPageNo=0;
                        $scope.busEntryExitDetails.busEntryClearFlag=true;
                })

        }
        $scope.clearBusDeparture=function(){
                busEntryExitService.removeBusDeparture().then(function(result){
                        $scope.busEntryExitDetails.busExit=[];
                        $scope.busEntryExitDetails.busExitCountPageNo=0;
                        $scope.busEntryExitDetails.busExitClearFlag=true;
                })

        }
        function getBusArrivalTabStatus(){
                configService.getSettingsDetails().then(function(res){
                        var settingsDetails= res.data;
                        $scope.busEntryExitDetails.busExitFlag=settingsDetails.busEntryExitStatus.clearBusArrivalStatus;
                })
        }
        function getBusDepatureTabStatus(){
                configService.getSettingsDetails().then(function(res){
                        var settingsDetails= res.data;
                        $scope.busEntryExitDetails.busDepatureFlag=settingsDetails.busEntryExitStatus.clearBusDepartureStatus;
                })
        }
        $scope.getPreviousPageData = function(type,pageSelected){
                if(type=='dep'){
                        $scope.setPageNoForDeparture(pageSelected-1)
                }else{
                        $scope.setPageNoForArrival(pageSelected-1)
                }
        }
        $scope.getNextPageData = function(type,pageSelected){
                var navigatePageNo = pageSelected+1;
                if(type=='dep' && navigatePageNo<$scope.busEntryExitDetails.busExitCompleteCount){
                        $scope.setPageNoForDeparture(pageSelected+1)
                }else if(type=='arr' && navigatePageNo<$scope.busEntryExitDetails.busEntryCompleteCount){
                        $scope.setPageNoForArrival(pageSelected+1)
                }
        }
        function init(){
                getBusEntryElement(0,10);
                getBusExitElement(0,10)
                getBusEntryExitCount();
                getBusArrivalTabStatus();
                getBusDepatureTabStatus();
        }

        $scope.$on('$destroy', function (event) {
                socket.removeListener('busEntryExitData')
        });
        function isBusEntryDataStabsReceiverTimer(){
                $scope.busEntryExitDetails.entryTimer = setTimeout(function()
                {
                        setBusEntryDataStatusReceiverTimerFalse();
                },1000*60);
        }
        function isBusExitDataStabsReceiverTimer(){
                $scope.busEntryExitDetails.exitTimer = setTimeout(function()
                {
                        setBusExitDataStatusReceiverTimerFalse();
                },1000*60);
        }
        function setBusEntryDataStatusReceiverTimerFalse(){
                $scope.busEntryExitDetails.busEntryDataReceiveStatus = false;
        }
        function setBusExitDataStatusReceiverTimerFalse(){
                $scope.busEntryExitDetails.busExitDataReceiveStatus = false;
                $scope.$apply();
        }
        function getConstants(){
                constantService.getConstants().then(function(result){
                        $scope.busEntryExitDetails.constants = result.data;
                        init();
                });
        }
        getConstants();
})