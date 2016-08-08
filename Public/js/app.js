/**
 * Created by MohammedSaleem on 11/11/15.
 */

var dependencies = ['ui.router','slickCarousel','flashSliderUI','flashGraphUI','flashCircularGraphUI','openlayers-directive','simpleJQSlider'];
var taxiFleetManager = angular.module("taxiFleetManager", dependencies);


taxiFleetManager.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.
        state('admin', {
            url: "/admin",
            templateUrl: 'Unsecure/admin.html',
            controller: 'loginCtrl'
        }).
        state('signUp', {
            url: "/signUp",
            templateUrl: 'Unsecure/signUp.html',
            controller: 'loginCtrl'
        }).
        //state('userPage', {
        //    url: "/userPage",
        //    templateUrl: 'Unsecure/user.html'
        //}).
        //state('userPage.signIn', {
        //    url: "/signIn",
        //    templateUrl: 'Unsecure/signIn.html'
        //}).
        //state('userPage.admin', {
        //    url: "/admin",
        //    templateUrl: 'Unsecure/signIn.html'
        //}).
        state('app', {
            url: "/app",
            templateUrl: 'templates/app.html',
            controller: 'appController'
        }).
        state('app.analytics', {
            url: "/analytics",
            templateUrl: 'templates/analytics.html',
            controller: 'analyticsController'
        }).
        state('app.analyticsAdmin', {
            url: "/analyticsAdmin",
            templateUrl: 'templates/analyticsAdmin.html',
            controller: 'analyticsController'
        }).
        state('app.analyticsAdmin.unloadingBerth', {
            url: "/unloadingBerth",
            templateUrl: 'templates/analytics/unloadingBerth.html'
        }).
        state('app.analyticsAdmin.busParking', {
            url: "/busParking",
            templateUrl: 'templates/analytics/busParking.html',
            controller: 'busLotCtrl'
        }).
        state('app.analyticsAdmin.loadingBerth', {
            url: "/loadingBerth",
            templateUrl: 'templates/analytics/loadingBerth.html',
            controller: 'loadingOccupancyCtrl'
        }).
        state('app.analyticsAdmin.busArrival', {
            url: "/busArrival",
            templateUrl: 'templates/analytics/busArrival.html',
            controller: 'busEntryExitCtrl'
        }).
        state('app.analyticsAdmin.busDeparture', {
            url: "/busDeparture",
            templateUrl: 'templates/analytics/busDeparture.html',
            controller: 'busEntryExitCtrl'
        }).
        state('app.analyticsAdmin.sensors', {
            url: "/sensors",
            templateUrl: 'templates/analytics/sensors.html'
        }).

        state('app.analyticsAll', {
            url: "/analyticsAll",
            templateUrl: 'templates/analyticsAll.html',
            controller: 'analyticsAllController'
        }).



        state('app.stats', {
            url: "/stats",
            templateUrl: 'templates/liveStats.html'
        }).
        state('app.stats.historicalStat', {
            url: "/historicalStat",
            templateUrl: 'templates/historicalStat.html',
            controller: 'analyticsController'
        }).
        state('app.stats.predictiveStat', {
            url: "/predictiveStat",
            templateUrl: 'templates/predictiveStat.html',
            controller: 'analyticsController'
        }).



        state('app.settings', {
            url: "/settings",
            templateUrl: 'templates/settings.html',
            controller: 'settingsCtrl'
        }).
        state('app.settings.settingsTabs', {
            url: "/settingsTabs",
            templateUrl: 'templates/settings/settingsTabs.html'
        }).
        state('app.settings.settingsTabs.simulator', {
            url: "/simulator",
            templateUrl: 'templates/settings/simulator.html',
            controller: 'simulatorCtrl'
        }).
        state('app.settings.settingsTabs.config', {
            url: "/config",
            templateUrl: 'templates/settings/config.html'
        }).
        state('app.settings.settingsTabs.users', {
            url: "/users",
            templateUrl: 'templates/settings/users.html'
        }).
        state('app.settings.settingsTabs.data', {
            url: "/data",
            templateUrl: 'templates/settings/smrtData.html',
            controller: 'dataDownload'
        });

    $urlRouterProvider.otherwise("/admin");
});

taxiFleetManager.run(function($rootScope,authInterceptor,settingsService) {
    $rootScope.admin = authInterceptor.getIsLoggedInStatus();
    function getAdminFlag(){
        $rootScope.admin = authInterceptor.getIsLoggedInStatus();
    }
    function getAdminStatus(){
        if($rootScope.admin){
            settingsService.getAdminStatusByToken().then(function(result){
                var isUserAdmin = result.data;
                authInterceptor.setIsAdminStatus(isUserAdmin);
            })
        }
    }
    function init(){
        getAdminFlag();
        getAdminStatus();
    }
    init();
});


taxiFleetManager.directive('repeatDone', function() {
    return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
        }
    }
});