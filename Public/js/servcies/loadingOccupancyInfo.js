/**
 * Created by Suhas on 2/13/2016.
 */
var smrtService= angular.module('smrtService',[])
smrt.factory("loadingOccupancyInfoService",function($http,$rootScope,$state){
        var loadingOccupancyDetails;
        var elderlyQueueDetails;
        var elderlyQueueDetailsByAggregation;
        var routeNoArray=[];
        var type={
                loadingOccupancyType:''
        }
        /* socket.on('loadingOccupancyInfo',function(data){
                loadingOccupancyDetails=data
                alertLoadingOccupancyInfo(data);
        })*/
        var getLoadingOccupancyDetails = function(){
                return loadingOccupancyDetails;
        }
        function alertLoadingOccupancyInfo(data){
                $rootScope.$broadcast('loadingOccupancyInfoAlert',data);
        }
        /*socket.on('elderlyQueueInfo',function(data){
                elderlyQueueDetails=data
                alertElderlyQueueInfo(data);
        })*/
        var getElderlyQueueInfoDetails = function(){
                return elderlyQueueDetails;
        }
        function alertElderlyQueueInfo(data){
                $rootScope.$broadcast('ElderlyQueueInfo',data);
        }
        function alertElderlyQueueInfoByAggregation(){
                $rootScope.$broadcast('ElderlyAggregationQueueInfo',data);
        }
        var getElderlyLoadingOccupancyDetailsForAggregation = function(){
                return elderlyQueueDetailsByAggregation;
        }
        var getHistoricalData = function(data){
                return $http.get('/loadingOccupancy/historicalData/'+data.seriesSelected+'/'+data.bertIndex);
        }
        var getElderlyHistoricalData = function(data){
                return $http.get('/elderlyLoadingOccupancy/historicalData/'+data.seriesSelected+'/'+data.bertIndex);
        }
        var setRouteNoArray = function(routeNoArray1){
                routeNoArray = routeNoArray1;
        }
        var getRouteNoByBethIndex = function(berthIndex,callBack){
                var berthRelatedRouteArray = new Array(3);
                berthRelatedRouteArray.fill('')
                if(routeNoArray.length>0){
                        for(var i=0;i<routeNoArray.length;i++){
                                var routeObj = routeNoArray[i];
                                var laneIndex =routeNoArray[i].laneId;
                                var routeNo = routeNoArray[i].routeNo;
                                if(routeObj.berthId==berthIndex){
                                        berthRelatedRouteArray[laneIndex-1]=routeNo;
                                }
                                if(i==routeNoArray.length-1){
                                        callBack(berthRelatedRouteArray);
                                }

                        }
                }else{
                        callBack(berthRelatedRouteArray);
                }
        }
        var getRouteNoForLoadingOccupancyQueue = function(){
                 $http.get('/smrt/settings/loadingOccupancy/berthRouteNo').then(function(result){
                         routeNoArray = result.data;
                         return result;
                 })
        }
        return{
                getLoadingOccupancyDetails:getLoadingOccupancyDetails,
                getElderlyQueueInfoDetails:getElderlyQueueInfoDetails,
                getElderlyLoadingOccupancyDetailsForAggregation:getElderlyLoadingOccupancyDetailsForAggregation,
                getHistoricalData:getHistoricalData,
                getElderlyHistoricalData:getElderlyHistoricalData,
                getRouteNoByBethIndex:getRouteNoByBethIndex,
                setRouteNoArray:setRouteNoArray,
                getRouteNoForLoadingOccupancyQueue:getRouteNoForLoadingOccupancyQueue
        }
})