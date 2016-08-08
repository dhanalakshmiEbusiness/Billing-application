/**
 * Created by zendynamix on 31-10-2015.
 */
taxiFleetManager.factory('authInterceptor', function ($rootScope,$window,$q) {
  var isLoggedIn=false;
  var isAdmin=false;
  var getIsLoggedInStatus = function(){
    if ($window.sessionStorage.token) {
      isLoggedIn=true;
    }else{
      isLoggedIn=false;
    }
    return isLoggedIn
  }
  var setIsAdminStatus = function(flag){
    isAdmin=flag
  }
  var getIsAdminStatus = function(){
    return isAdmin
  }
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
      }
      return $q.reject(rejection);
    },
    getIsLoggedInStatus:getIsLoggedInStatus,
    setIsAdminStatus:setIsAdminStatus,
    getIsAdminStatus:getIsAdminStatus
  };
});



smrt.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
