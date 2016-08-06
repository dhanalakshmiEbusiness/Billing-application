/**
 * Created by MohammedSaleem on 17/02/16.
 */

smrt.controller("appController", function ($scope,$state,$rootScope,busLotService) {
    $scope.admin=$rootScope.admin;

    $scope.notify=false;
    $scope.manageNotif= function () {
        $scope.notify=!$scope.notify;
    };
    function getBusDataForParking(){
        busLotService.getBusLotData();
    }
    function init(){
        getBusDataForParking();
    }
    init();

});