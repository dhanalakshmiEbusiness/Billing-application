/**
 * Created by Suhas on 3/9/2016.
 */
var request = require("request"),
        https = require('https'),
        dataPusher=require('../../dataPusher'),
        async = require("async");/**/

var url= 'https://api.cag.smartwifi.starhub.com/req.cag';
var options = {
        url: 'http://119.73.147.2/smrt/parkingbaystatus.php?export=json&bayid=A',
        json: true,
        method: 'get'
};
var unloadingBayArray=[];
var getUnloadingBayDetails = function(){
        for(var i=1;i<=6;i++){
                request("http://119.73.147.2/smrt/parkingbaystatus.php?export=json&bayid=A"+i, function (error, response, body){
                        var data = JSON.parse(body);
                        var data1 = {
                                bayId:data[0].bayid,
                                status:data[0].status,
                        }
                        formArray(data1);
                });
        }
}
function formArray(obj){
        var length = unloadingBayArray.length;
        if(length==5){
                unloadingBayArray.push(obj)
                /*dataPusher.unloadingBayDataPusher.pushData(unloadingBayArray);*/
                unloadingBayArray = [];
        }else{
                unloadingBayArray.push(obj)
        }

}

module.exports = {
        getUnloadingBayDetails : getUnloadingBayDetails
}