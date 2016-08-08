/**
 * Created by Suhas on 3/9/2016.
 */
taxiFleetManager.factory("unloadingBayService",function($http,$rootScope){
        var unloadingBayStatus = [];/*
        socket.on('unloadingBayData',function(data){
                console.log(data)
                unloadingBayStatus=data;
                triggerUnloadingBayStatus(data);
        });*/
        function triggerUnloadingBayStatus(data){
                $rootScope.$broadcast('unloadingBayStatusInfo',data);
        }
        function getUnloadingBayStatus(){
                return unloadingBayStatus
        }
        var getUnloadingBayDetails = function(){
                /*return $http.get('/smrt/unloadingBayDetails/getData')*/
        }
        return{
                getUnloadingBayStatus:getUnloadingBayStatus,
                getUnloadingBayDetails:getUnloadingBayDetails
        }
})