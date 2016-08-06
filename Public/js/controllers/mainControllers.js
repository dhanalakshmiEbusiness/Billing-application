
smrt.controller("mainController", function ($scope,$location,$interval) {

    $scope.currentRout= function (path) {
        var loc=$location.path();
        return loc.includes(path)
    };

    $scope.xAxisDay=['6-10','11-20','21-30','31-40','41-50','51-60','61-70','71-100'];
    $scope.yAxisDay=[{data:[40,30,80,90,60,40,30,10]}];

    $scope.currentDate= null;
    $interval(function () {
        $scope.currentDate=new Date();
    },1000)


});



