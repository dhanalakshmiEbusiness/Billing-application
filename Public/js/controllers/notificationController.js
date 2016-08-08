/**
 * Created by Suhas on 2/29/2016.
 */
taxiFleetManager.controller('notificationCtrl',function($scope,$rootScope,notificationService){
        $scope.notificationDetails={
                notificationArray:[],
                notificationCount:0,
                smsDetails:{
                        phoneNO:123456789
                }
        }
        $rootScope.$on('elderlyNotification',function(data){
                var elderlyNotifyObj =notificationService.getElderlyNotifyObj();
                pushElderlyDataToNotification(elderlyNotifyObj);

        })
        function pushElderlyDataToNotification(data){
                if($scope.notificationDetails.notificationArray.length>50){
                        $scope.notificationDetails.notificationArray.pop();
                        $scope.notificationDetails.notificationArray.unshift(data)
                }else{
                        $scope.notificationDetails.notificationArray.unshift(data)
                }

        }
        $scope.clearNotification=function(){
                $scope.notificationDetails.notificationArray=[];

        }
        function getSMSPhoneNo(){
                notificationService.getPhoneNoToNotify().then(function(res){
                        $scope.notificationDetails.smsDetails.phoneNO=res.data.phoneNo
                })
        }
        $scope.sendSMSNotification = function(data){
                notificationService.getPhoneNoToNotify().then(function(res){
                        $scope.notificationDetails.smsDetails.phoneNO=res.data.phoneNo
                        var smsDetails = {
                                phoneNo:$scope.notificationDetails.smsDetails.phoneNO,
                                msg:"Around "+data.occupancy+"% occupancy of Physically Challenged at Berth "+data.bertIndex+"."
                        }
                        notificationService.sendNotification(smsDetails)
                })
        }
        function init(){
                getSMSPhoneNo();
        }
        init();
})