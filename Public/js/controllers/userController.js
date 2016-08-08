/**
 * Created by Suhas on 3/8/2016.
 */
taxiFleetManager.controller("userCtrl", function ($scope,$state,authInterceptor,userService,authInterceptor,$window) {

        $scope.userData = {
                newUserData:{},
                userArray:[],
                createNewUserStatus:'',
                pageCapacity:10,
                pageSelected:1,
                userCountArray:[],
                userFormDetails:{
                        formTitle:"New Accounts",
                        buttonType:"Save"
                },
                delete:{
                        userId:0,
                        userIndex:0,
                        userName:''
                },
                userDetails:{
                      isAdmin:false
                }
        }
        $scope.saveNewUser = function(){
                userService.createNewUser($scope.userData.newUserData).then(function(res,err){

                                $scope.userData.createNewUserStatus = res.data;
                                getTotalUserCount();
                        $state.reload();
                        // $window.location.reload();
                })
        }
        function getAllUsersData(){
                userService.getAllUsers().then(function(userArray){
                        $scope.userData.userArray=userArray.data;
                })
        }
        $scope.deleteUser = function(){
               var  id = $scope.userData.delete.userId,
               index = $scope.userData.delete.userIndex;
                userService.deleteUser(id).then(function(res){
                        getTotalUserCount();
                        if (index > -1) {
                                $scope.userData.userArray.splice(index, 1);
                        }
                })
        }
        function getTotalUserCount(){
                userService.getUserCount().then(function(res){
                        $scope.userData.userCountArray = range(Math.round((res.data.userCount/$scope.userData.pageCapacity)))
                        getUserDataForPagination($scope.userData.pageSelected)
                })
        }
        function range(n) {
                return new Array(n);
        };
        function getUserDataForPagination(pageNo){
                var pageCapacity = $scope.userData.pageCapacity;
                var start = (pageNo-1)*pageCapacity;
                var limit =$scope.userData.pageCapacity
                userService.getUserDetailsByRange(start,limit).then(function(res){
                        $scope.userData.userArray=res.data;
                })
        }
        $scope.getUserDataForPage = function(pageNo){
                $scope.userData.pageSelected=pageNo;
                getUserDataForPagination(pageNo);
        }
        $scope.editUserDetails = function(userData){
                $scope.userData.newUserData = userData;
                $scope.userData.userFormDetails.formTitle="Update Account";
                $scope.userData.userFormDetails.buttonType="Update"
        }
        $scope.updateUserDetails = function(){
                userService.updateUserDetails($scope.userData.newUserData).then(function(res){
                        getTotalUserCount();
                        $scope.userData.newUserData = {};
                })
        }
        $scope.setUserIdForDelete = function(userId,index,name){
                $scope.userData.delete.userId = userId;
                $scope.userData.delete.userName = name;
                $scope.userData.delete.userIndex = index;
        }
        $scope.clearFormData = function(){$scope.userData.newUserData = {};
                $scope.userData.userFormDetails.formTitle="New Account";
                $scope.userData.userFormDetails.buttonType="Save"
        }
        function getLoggedUserDetails(){
                $scope.userData.userDetails.isAdmin=authInterceptor.getIsAdminStatus()
        }
        function init(){
                /*getAllUsersData();*/
                getTotalUserCount();
                getUserDataForPagination(1)
                getLoggedUserDetails();
        }
        init();
})