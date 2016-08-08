/**
 * Created by Suhas on 2/23/2016.
 */
taxiFleetManager.factory("busEntryExitService",function($http){
        var getBusEntryExitCount = function(){
                return $http.get('/smrt/busEntryExitData/count')
        }
        var getBusEntryDataSkipAndLimit = function(skip,limit,type){
                return $http.get('/smrt/busEntryExitData/skip/'+skip+'/limit/'+limit+'/type/'+type);
        }
        var removeBusArrival=function(){
                return $http.get('/smrt/remove/busArrival');
        }
        var removeBusDeparture=function(){
                return $http.get('/smrt/remove/departure');
        }
        var getHistoricalDataOfBusEntryOrExit = function(data){
                return $http.get('/busEntryExit/historicalData/'+data.status+'/'+data.seriesSelected);
        }
        var getHistoricalData = function(data){/*1st element in Array is ENTRY  ,2nd element in Array in DEPARTURE*/
                return $http.get('/busEntryExit/historicalData/both/'+data.seriesSelected);
        }
        return {
                getBusEntryExitCount:getBusEntryExitCount,
                getBusEntryDataSkipAndLimit:getBusEntryDataSkipAndLimit,
                removeBusArrival:removeBusArrival,
                removeBusDeparture:removeBusDeparture,
                getHistoricalDataOfBusEntryOrExit:getHistoricalDataOfBusEntryOrExit,
                getHistoricalData:getHistoricalData
        };
})