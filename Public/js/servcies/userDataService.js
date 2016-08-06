/**
 * Created by Suhas on 3/15/2016.
 */
smrt.factory('userDataService',function($http){
        var getDataForDownload = function(data,start,end){
                var url=''
                if(data=='busLot'){
                        url='http://'+location.hostname+':'+location.port+'/smrt/userData/busLotData/'+start+"/"+end;
                }else if(data=='loadingOccupancy'){
                        url='http://'+location.hostname+':'+location.port+'/smrt/userData/loadingOccupancyData/'+start+"/"+end;
                }else if(data=='elderlyOccupancy'){
                        url='http://'+location.hostname+':'+location.port+'/smrt/userData/elderlyOccupancyInfo/'+start+"/"+end;
                }else if(data=='busExit' || data=='busEntry'){
                        url='http://'+location.hostname+':'+location.port+'/smrt/userData/busEntryExit/'+start+"/"+end;
                }
                var win = window.open(url, '_blank');
                win.focus();
                return("sent")
        }
        var getSendHostDetails = function(){
                return $http.get('/smrt/settings/getHostDetails')
        }
        return{
                getDataForDownload:getDataForDownload,
                getSendHostDetails:getSendHostDetails
        }
})