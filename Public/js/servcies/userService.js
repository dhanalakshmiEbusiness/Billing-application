/**
 * Created by Suhas on 3/8/2016.
 */
taxiFleetManager.factory("userService", function ($http) {
        var createNewUser = function(userData){
                return $http.post('/signup',userData)
        }
        var getAllUsers = function(){
                return $http.get('/smrt/userDetails/getAll');
        }
        var deleteUser = function(id){
                return $http.get('/smrt/userDetails/delete/'+id);
        }
        var getUserCount = function(){
                return $http.get('/smrt/userDetails/count');
        }
        var getUserDetailsByRange = function(skip,limit){
                return $http.get('/smrt/userDetails/get/'+skip+'/'+limit)
        }
        var updateUserDetails = function(userData){
                return $http.post('/smrt/userDetails/update',userData)
        }
        return{
                createNewUser:createNewUser,
                getAllUsers:getAllUsers,
                deleteUser:deleteUser,
                getUserCount:getUserCount,
                getUserDetailsByRange:getUserDetailsByRange,
                updateUserDetails:updateUserDetails
        }
})