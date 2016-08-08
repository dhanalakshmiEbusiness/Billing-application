/**
 * Created by zendynamix on 2/29/2016.
 */
taxiFleetManager.factory('notificationService',function($rootScope,$http){
        var elderlyNotifyObj;
        socket.on('elderlyCountNotificationInfo',function(notifyData){
                notifyElderOccupancy(notifyData);
        })
        var notifyElderlyOccupancyAlert = function(alertData){
                notifyElderOccupancy(alertData);
        }
        function notifyElderOccupancy(alertData){
                elderlyNotifyObj = alertData;
                $rootScope.$broadcast('elderlyNotification',alertData)
        }
        var getElderlyNotifyObj = function(){
                return elderlyNotifyObj;
        }
        var getPhoneNoToNotify = function(){
                return $http.get('/smrt/settings/getSettingDetails/phoneNo')
        }
        var sendNotification = function(data){
                return $http.post('/smrt/elderly/sendNotification',data);
        }
        return{
                notifyElderlyOccupancyAlert:notifyElderlyOccupancyAlert,
                getElderlyNotifyObj:getElderlyNotifyObj,
                getPhoneNoToNotify:getPhoneNoToNotify,
                sendNotification:sendNotification
        }
})