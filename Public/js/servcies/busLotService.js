/**
 * Created by Suhas on 3/9/2016.
 */
taxiFleetManager.factory("busLotService",function($http,$rootScope,$window,$q){
        var parkingData;
        var getBusLotData = function(){
                return $http.get('/smrt/busLotStatus/getData')
        }
        socket.on('busLotDataPusher', function (data) {
                triggerBusParkingData(data)
                parkingData=data;
        })
        var getMapParkingData = function(){
                return parkingData;
        }
        function triggerBusParkingData(data){
                $rootScope.$broadcast('notifyBusParkingData',data)
        }
        var getHistoricalData=function(data){
                return $http.get('/busParking/historicalData/'+data.seriesSelected)
        }
        return{
                getBusLotData:getBusLotData,
                getMapParkingData:getMapParkingData,
                getHistoricalData:getHistoricalData
        }
})
