/**
 * Created by Suhas on 2/22/2016.
 */
smrt.controller("settingsCtrl", function ($scope,settingsService,settingsService) {
        $scope.settingDetails = {
                showSimulator:false
        }
        $scope.simulator=true;
        $scope.$on('simulatorStatus',function(data){
                getSettingsDetails();
        })
        function getSettingsDetails(){
                settingsService.getSettingsDetails().then(function(res){
                        settingsService.setSettingDetailsVal(res.data);
                        $scope.simulator = res.data.settingsData.showSimulatorPage;
                })
        }
        function init(){
                getSettingsDetails();
        }
        init();
});