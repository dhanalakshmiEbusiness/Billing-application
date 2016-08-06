/**
 * Created by MohammedSaleem on 11/11/15.
 */

var dependencies = ['ui.router','flashSliderUI','flashGraphUI','flashSliderGraphUI','flashCircularGraphUI'];
var necApi = angular.module("taxiQueue", dependencies);


necApi.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.
        state('app', {
            url: "/app",
            templateUrl: 'templates/app.html'
        }).
        state('app.sample', {
            url: "/sample",
            templateUrl: 'templates/sample.html'
        });

    $urlRouterProvider.otherwise("/app/sample");
});
