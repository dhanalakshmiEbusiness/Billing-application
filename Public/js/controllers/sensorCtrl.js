/**
 * Created by zendynamix on 28-05-2016.
 */

taxiFleetManager.filter('split', function() {
    return function(input, splitChar, splitIndex) {
        // do some bounds checking here to ensure it has that index
        return input.split(splitChar)[splitIndex];
    }
});
taxiFleetManager.controller('sensorDetectionCtrl', function ($scope) {

    socket.on('sensorDetectionData',function(data){
        $scope.sensorDetectionList=data;
        $scope.$apply();
    })

});
