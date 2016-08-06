/**
 * Created by Suhas on 7/28/2016.
 */
smrt.factory("constantService",function($http){
        var getConstants = function init(){
                return $http.get('/smrt/constants')
        }
        return{
                getConstants:getConstants
        }
})