/**
 * Created by Suhas on 12/5/2015.
 */

taxiFleetManager.controller('loginCtrl', function ($scope, $http, $window, $location, $state, $rootScope, authInterceptor) {
    $scope.checkValidation = function (user) {
        if (user && user.username && user.password) {
            $(".loginBtn .loaderBar").fadeIn(0);
            $http
                .post('/login', user)
                .success(function (data, status, headers, config) {


                    $window.sessionStorage.token = data.token;
                    $rootScope.admin = true;
                    $rootScope.isAdmin = data.isAdmin;
                    authInterceptor.setIsAdminStatus($rootScope.isAdmin)
                    $state.go('app.analyticsAdmin.unloadingBerth')

                })
                .error(function (data, status, headers, config) {
                    $(".loginBtn .loaderBar").fadeOut(0);
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    $scope.isAuthenticated = false;
                    // Handle login errors here
                    $scope.error = 'Error: Invalid user or password';
                    $scope.welcome = '';
                });
        } else if (!user) {
            $scope.message = "Username or password required";
        }


    };


    $scope.logout = function () {
        delete $window.sessionStorage.token;
        $rootScope.admin = false;
        $state.go('admin')
    };


    $scope.signUp = function (user) {
        $http
            .post('/signup', user)
            .success(function (data, status, headers, config) {
                $scope.successMessage = "Successfully registered Please login";
                $state.go('admin')
            })
            .error(function (data, status, headers, config) {
                $scope.error = data;
            });
    };

    $scope.setFlag = function () {
        $rootScope.admin = false;
    };

    $scope.enterToLogin = function (event) {
        if (event.keyCode == 13) {
            $scope.checkValidation($scope.user);
        }
    }
});

