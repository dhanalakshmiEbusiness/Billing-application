/**
 * Created by Suhas on 2/17/2016.
 */

"use strict";
var request = require("request"),
        https = require('https'),
        saveData=require('../'),
        dataPusher=require('../../dataPusher'),
        config=require('../../../config/config');

var url= 'https://api.cag.smartwifi.starhub.com/req.cag';
var options = {
        url: 'http://119.73.147.2/smrt/parkingbaystatus.php',
        json: true,
        method: 'get'
};
var getBusLotData = function(){
        var busLotApi = config.busParkingDataReceiverApi;
        request(busLotApi, function (error, response, body) {
                try {
                        var data = JSON.parse(body);
                        saveData.save.busLotStatusDataHandler.saveData(data);
                }
                catch(err){
                        console.error("Error while processing the message :")
                        if(body){
                                console.log(err.stack)
                        }

                }
                if(data && data.length>0){
                        sendBusParkingData(data);
                }
        });
}
var pushBusLotData = function(data){
        sendBusParkingData(data)
}
function sendBusParkingData(data){
        var busParkingLotArray=new Array();
        var busUnloadingLotArray=new Array();
        var completeBusParkingStatus=new Array();
        for(var i=0;i<data.length;i++){
                var busLotObj = data[i];
                var bayIdName = data[i].bayid;
                var bayIdStringLength =busLotObj.bayid.length;
                if(bayIdStringLength>2){
                         var baySubStringOfParking = busLotObj.bayid.substring(3,5);
                        var parkingBayId = parseInt(baySubStringOfParking);
                        var index = parkingBayId-1;
                        var parkingStatus=parseInt(busLotObj.status);
                        var parkingObj ={
                                bayId:parkingBayId,
                                status:parkingStatus
                        }
                        busParkingLotArray[50-index]=parkingObj;
                        completeBusParkingStatus[5+index]=parkingObj
                        busLotObj.bayid=baySubStringOfParking;
                        /*saveData.save.busLotStatusDataHandler.saveData(busLotObj);*/
                }else if(bayIdStringLength==2){
                        var uBaySubString = busLotObj.bayid.substring(1,2);
                        var uBayId = parseInt(uBaySubString);
                        var index = uBayId-1;
                        var uStatus =parseInt(busLotObj.status);
                        var uData ={
                                bayId:bayIdName,
                                status:uStatus
                        }
                        busUnloadingLotArray[index]=uData;
                        if(index!=6){
                                busParkingLotArray[index]=parkingObj;
                        }

                        /*saveData.save.busLotStatusDataHandler.saveData(busLotObj);*/
                }
                if(i==data.length-1){
                        var baySubStringOfParking = busLotObj.bayid.substring(3,5);
                        var parkingBayId = parseInt(baySubStringOfParking);
                        var index = parkingBayId-1;
                        var parkingStatus=parseInt(busLotObj.status);
                        var parkingObj ={
                                bayId:parkingBayId,
                                status:parkingStatus
                        }
                        busParkingLotArray[50-index]=parkingObj;
                        completeBusParkingStatus[5+index]=parkingObj;
                        var busLotData = {
                                parkingData:busParkingLotArray,
                                unloadingBayData:busUnloadingLotArray,
                                completeBusParkingStatus:completeBusParkingStatus
                        }
                        dataPusher.busLotRelatedDataPush.pushBusParkingDataForMap(busLotData);
                }

        }
}

module.exports = {
        getBusLotData : getBusLotData,
        pushBusLotData:pushBusLotData
}

