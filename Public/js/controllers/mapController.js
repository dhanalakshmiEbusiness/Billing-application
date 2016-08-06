/**
 * Created by zendynamix on 08-03-2016.
 */
smrt.controller("mapController", function ($scope,$location,mapService,busLotService,authInterceptor,$rootScope) {
    var geoJsonArray = [];
    $scope.layers = [{
        source: {
            type: "ImageStatic",
            url: "../images/map_v_0.0.1.png",
            imageSize: [1920, 1080]
        }
    }];
    angular.extend($scope, {
        center: {
            coord: [960,540],
            zoom: 2.2
        },
        defaults: {
            view: {
                projection: 'pixel',
                extent: [0, 0, 1920, 1080]
            }

        },
        staticlayer: $scope.layers
    });
    $scope.mapStatus=false;
    $rootScope.$on('notifyBusParkingData',function(data){
        var mapData = busLotService.getMapParkingData();
        if(mapData ){/*&& $scope.mapStatus*/
            if($scope.mapStatus){

                structureData(mapData);
            }
        }
    });
    function structureData(data){
        $scope.layers =  [{
            source: {
                type: "ImageStatic",
                url: "../images/map_v_0.0.1.png",
                imageSize: [1920, 1080]
            }
        }];
        addPolygonParkingBay(data.parkingData)
        addPolygonUnloadingBay(data.unloadingBayData)

    }
    function formPolygonObjectForUnloadingBay() {
        $scope.polygonArray=[];
        $scope.polygonLoadinBarArray =mapService.getLodingPolygonArray();
        for(var k=0;k<$scope.polygonLoadinBarArray.length;k++){
            var obj = {
                object: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [[
                                    [
                                        $scope.polygonLoadinBarArray[k].point1.x,
                                        1080-$scope.polygonLoadinBarArray[k].point1.y
                                    ],
                                    [
                                        $scope.polygonLoadinBarArray[k].point2.x,
                                        1080-$scope.polygonLoadinBarArray[k].point2.y
                                    ],
                                    [

                                        $scope.polygonLoadinBarArray[k].point3.x,
                                        1080-$scope.polygonLoadinBarArray[k].point3.y
                                    ],
                                    [

                                        $scope.polygonLoadinBarArray[k].point4.x,
                                        1080-$scope.polygonLoadinBarArray[k].point4.y
                                    ],

                                    [
                                        $scope.polygonLoadinBarArray[k].point1.x,
                                        1080-$scope.polygonLoadinBarArray[k].point1.y
                                    ]

                                ]
                                ]
                            }
                        }
                    ]
                }
            }
            geoJsonArray.push(obj);

            if(k==$scope.polygonLoadinBarArray.length-1){
                mapService.setMapObjectArray(geoJsonArray);
            }
        }
    }
    function formPolygonObjectForParkingBay() {
        var geoJsonArrayParkingBay=[];
        $scope.polygonParkingArray =mapService.getParkingBayData();
        for(var k=0;k<$scope.polygonParkingArray.length;k++){
            var obj = {
                object: {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [[
                                    [
                                        $scope.polygonParkingArray[k].point1.x,
                                        1080-$scope.polygonParkingArray[k].point1.y
                                    ],
                                    [
                                        $scope.polygonParkingArray[k].point2.x,
                                        1080-$scope.polygonParkingArray[k].point2.y
                                    ],
                                    [

                                        $scope.polygonParkingArray[k].point3.x,
                                        1080-$scope.polygonParkingArray[k].point3.y
                                    ],
                                    [

                                        $scope.polygonParkingArray[k].point4.x,
                                        1080-$scope.polygonParkingArray[k].point4.y
                                    ],

                                    [
                                        $scope.polygonParkingArray[k].point1.x,
                                        1080-$scope.polygonParkingArray[k].point1.y
                                    ]

                                ]
                                ]
                            }
                        }
                    ]
                }
            }
            geoJsonArrayParkingBay.push(obj);
            if(k==$scope.polygonParkingArray.length-1){
                mapService.setParkingbayObjectArray(geoJsonArrayParkingBay);
            }
        }
    }
    function addPolygonUnloadingBay(modifiedStatusArray) {
        var busStatusArray=modifiedStatusArray;
        geoJsonArray=mapService.getMapObjectArray();
        var fillColor;
        for (var j = 0; j < geoJsonArray.length; j++) {
            if(busStatusArray[j].status==2){
                fillColor="rgba(165, 112, 44,0.2)"
            }
            else if(busStatusArray[j].status==1){
                /*1  bus avalable blue*/
                fillColor="rgba(0, 178, 165,0.2)"
            }
            else if(busStatusArray[j].status==0){
                /*0 no bus grey*/
                fillColor="rgba( 26, 30, 43,0.2)"
            }
            var obj = {
                source: {
                    type: 'GeoJSON',
                    geojson: geoJsonArray[j]
                },
                style: {
                    fill: {
                        color: fillColor
                    }/*,
                     stroke: {
                     color: "black",
                     width: 2

                     }*/

                }

            }

            $scope.layers.push(obj);
        }

    }
    function addPolygonParkingBay(modifiedStatusArray) {
        var busStatusArray=modifiedStatusArray;
        geoJsonArray=mapService.getParkingbayObjectArray();
        var fillColor;
        for (var j = 0; j < geoJsonArray.length; j++) {
            if(busStatusArray[j].status===2){
                fillColor="rgba(165, 112, 44,0.2)"
            }
            else if(busStatusArray[j].status===1){
                /*1  bus avalable blue*/
                fillColor="rgba(0, 178, 165,0.2)"
            }
            else if(busStatusArray[j].status===0){
                /*0 no bus grey*/
                fillColor="rgba( 26, 30, 43,0.2)"
            }
            var obj = {
                source: {
                    type: 'GeoJSON',
                    geojson: geoJsonArray[j]
                },
                style: {
                    fill: {
                        color: fillColor
                    }/*,
                     stroke: {
                     color: "black",
                     width: 2

                     }*/

                }

            }

            $scope.layers.push(obj);
        }

    }
    function getLoadingBayPolygonDetails(){
        mapService.getIncialLoadingBayPlots().then(function(res){
            var resData = res.data;
            var newPolygonArray=resData[0].mapPlotInformation.polygonArray;
            mapService.setLoadingPolygonArray(resData[0].mapPlotInformation.polygonArray);
            formPolygonObjectForUnloadingBay();
        })
    }
    function getMapDataForFirstTime(){
        var mapData = busLotService.getMapParkingData();
        if(mapData){
            structureData(mapData);
        }
    }
    $rootScope.$on('notifyMapStatus',function(data){
        $scope.mapStatus=mapService.getMapShowStatus();
        if($scope.mapStatus){
            getMapDataForFirstTime();
        }
    });
    function getMapStatus(){
        $scope.mapStatus=mapService.getMapShowStatus();
    }
    $scope.setMapStatus= function(flag){
        $scope.mapStatus=true;
        mapService.setMapShowStatus(flag);
    }
    //parkingBayDetails
    function getParkingBayPolygonDetails(){
        mapService.getPolygonDetails().then(function(res){
            var response = res.data;
            mapService.setParkingBayData(response[0].mapPlotInformation.polygonArray);

            formPolygonObjectForParkingBay();
        })

    }
    function init(){
        getLoadingBayPolygonDetails();
        getParkingBayPolygonDetails();
        /*getMapDataForFirstTime();*/
        getMapStatus();
    }
    init();
    $scope.$on('$destroy', function (event) {
        /*socket.removeListener('busEntryExitData')*/
    });
});

