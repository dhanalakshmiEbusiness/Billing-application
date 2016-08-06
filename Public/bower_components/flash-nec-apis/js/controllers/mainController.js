/**
 * Created by MohammedSaleem on 10/05/16.
 */

necApi.controller('mainController', function ($scope,$location) {

    $scope.currentRout= function (path) {
        var loc=$location.path();
        return loc.includes(path)
    };


    $scope.test=['red', 'blue', 'green', '#e87294', '#5bc3c2'];

    $scope.x = ['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'];
    $scope.y = [
        {
            data: [3, 2, 5, 7, 4, 3, 5,7,9,12,14,9,20,25,17,22,13,27,22,15,11,10,16,9],
            name: "TERMINAL 1"
        },
        {
            data: [4, 3, 4, 6, 5, 7, 4,8,12,14,17,19,11,16,18,20,25,29,30,20,27,24,25,26],
            name: "TERMINAL 2"
        },
        {
            data: [5, 17, 8, 2, 12, 27, 14,18,2,4,7,19,13,22,18,27,29,32,20,12,29,28,20,28],
            name: "TERMINAL 3"
        }
    ];
    $scope.yA = [
        {
            data: [3, 2, 5, 7, 4, 3, 5,7,9,12,14,9,20,25,17,22,13,27,22,15,11,10,16,9],
            name: "TERMINAL 1"
        }
    ];

    $scope.topCat=[['Household', 19],['Grocery', 14],['Pet Supplies', 16],['Cosmetics', 30]];



});