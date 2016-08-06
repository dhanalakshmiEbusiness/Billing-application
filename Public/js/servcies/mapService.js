/**
 * Created by zendynamix on 08-03-2016.
 */
smrt.factory('mapService', function ($rootScope,$http) {
    var  polygonArray=[];
    var  polygonLoadingBayArray=[];
    var  mapObjectArray=[];
    var  mapBerthObjectArray=[];
    var  busLotStatusArray=[];
    var  parkingBayArrayplots=[];
    var parkingbayObjectArrayPlots=[];
    var mapShowStatus=false;
    var getPolygonDetails=function(){
        return $http.get('/smrt/polygon/plots');
    }

    var getIncialLoadingBayPlots=function(){
        return $http.get('/smrt/loadingBayPolygon/plots');
    }

    var setPolygonArray=function(arrayPlots){
        polygonArray=arrayPlots;
    }
    var getPolygonArray=function(){
        return polygonArray;
    }

    var setLoadingPolygonArray=function(LoadingBayPlots){
        polygonLoadingBayArray=LoadingBayPlots;
    }
    var getLodingPolygonArray=function(){
        return polygonLoadingBayArray;
    }

    var getMapShowStatus = function(){
        return mapShowStatus;
    }
    var setMapShowStatus = function(flag){
        mapShowStatus=flag;
        notifyMapStatus(flag)
    }
    var setMapObjectArray=function(mapobjectArrayFromController){
        mapObjectArray=mapobjectArrayFromController;
    }
    var getMapObjectArray=function(){
        return mapObjectArray;
    }

    function notifyMapStatus(flag){
        $rootScope.$broadcast('notifyMapStatus',flag);
    }
    function setParkingBayData(parkingBayArray){

        parkingBayArrayplots=parkingBayArray;
    }
    function getParkingBayData(){
        return parkingBayArrayplots;
    }
    function setParkingbayObjectArray(parkingbayObjectArray){
        parkingbayObjectArrayPlots=parkingbayObjectArray;

    }
    function getParkingbayObjectArray(){
        return parkingbayObjectArrayPlots;

    }
    return {
        getPolygonDetails:getPolygonDetails,
        setPolygonArray:setPolygonArray,
        getPolygonArray:getPolygonArray,
        setLoadingPolygonArray:setLoadingPolygonArray,
        getLodingPolygonArray:getLodingPolygonArray,
        getIncialLoadingBayPlots:getIncialLoadingBayPlots,
        getMapShowStatus:getMapShowStatus,
        setMapShowStatus:setMapShowStatus,
        setMapObjectArray:setMapObjectArray,
        getMapObjectArray:getMapObjectArray,
        setParkingBayData:setParkingBayData,
        getParkingBayData:getParkingBayData,
        setParkingbayObjectArray:setParkingbayObjectArray,
        getParkingbayObjectArray:getParkingbayObjectArray

};
});
