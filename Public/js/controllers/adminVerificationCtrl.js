/**
 * Created by Suhas on 3/22/2016.
 */
smrt.controller('adminAuthenticationCtrl',function($scope,authInterceptor){
        $scope.adminAuthenticationCtrlDetails={
                userDetails:{
                        isAdmin:false
                }
        }
        function getUserStatus(){
                $scope.adminAuthenticationCtrlDetails.userDetails.isAdmin=authInterceptor.getIsAdminStatus();
        }
        function init(){
                getUserStatus();
        }
        init();
})