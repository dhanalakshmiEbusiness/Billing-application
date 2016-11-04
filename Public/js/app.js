

var dependencies = ['ui.router'];
var taxiFleetManager = angular.module("taxiFleetManager", dependencies);


taxiFleetManager.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.
        state('admin', {
            url: "/admin",
            templateUrl: 'Unsecure/admin.html'
        })
    $urlRouterProvider.otherwise("/admin");
});

