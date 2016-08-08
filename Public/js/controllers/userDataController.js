/**
 * Created by Suhas on 3/15/2016.
 */
taxiFleetManager.controller('UserDataCtrl',function($scope,userDataService){
        $scope.userDataDetails={
                downloadDataDetails:{
                        selectedDataType:"busLot",
                        startDate:'',
                        endDate:'',
                        endDateLimit:1
                },
                oneDay:24*60*60*1000,
                alertMessage:"",
                alertMessageFlag:false
}
        $scope.startDownload = function(){
                var data = $scope.userDataDetails.downloadDataDetails.selectedDataType;
                if($scope.userDataDetails.downloadDataDetails.endDate!='' && $scope.userDataDetails.downloadDataDetails.startDate!=''){
                        var endDate = moment($scope.userDataDetails.downloadDataDetails.endDate,'DD-MM-YYYY').toDate();/*.toDate()*/
                        /*endDate.add(1,'days');*/
                        var startDate = moment($scope.userDataDetails.downloadDataDetails.startDate,'DD-MM-YYYY').toDate();/*.toDate()*/
                        var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        if(diffDays<=0){
                                $scope.userDataDetails.alertMessageFlag=true;
                                $scope.userDataDetails.alertMessage=" Date range cannot be more than " +
                                    ""+$scope.userDataDetails.downloadDataDetails.endDateLimit+"  day"
                        }else{
                                $scope.userDataDetails.alertMessageFlag=false;
                                userDataService.getDataForDownload(data,startDate,endDate);
                        }
                }else{
                        $scope.userDataDetails.alertMessageFlag=true;
                        $scope.userDataDetails.alertMessage="Enter Date"
                }
        }
        $scope.setDownloadDataType = function(dataType){
                $scope.userDataDetails.downloadDataDetails.selectedDataType = dataType;
        }
})