/**
 * Created by Suhas on 2/15/2016.
 */
smrt.factory("demographicDetailService",function($http,$rootScope){
        var demographicRelatedData = {
                selectedSeconds:30,
                ageGraphData:[]
        }
        var getSelectedSeconds = function(){
                return demographicRelatedData.selectedSeconds;
        }
        var setSelectedSeconds = function(seconds){
                demographicRelatedData.selectedSeconds=seconds;
        }
        var startPushingDemographicDetails = function(){
                /*$http.get('/smrt/peopleDetectionData/startDataPush');*/
        }
        socket.on('personNotifiedForASelectedPeriodOfTime',function(data){
                triggerDemographyInfo(data);
                demographicRelatedData.ageGraphData=data
        })
        function triggerDemographyInfo(data){
                $rootScope.$broadcast('personNotifiedForASelectedPeriodOfTime',data);
        }
        var getGraphData = function(){
                return demographicRelatedData.ageGraphData;
        }
        return{
                startPushingDemographicDetails:startPushingDemographicDetails,
                getSelectedSeconds:getSelectedSeconds,
                setSelectedSeconds:setSelectedSeconds,
                getGraphData:getGraphData
        }
})