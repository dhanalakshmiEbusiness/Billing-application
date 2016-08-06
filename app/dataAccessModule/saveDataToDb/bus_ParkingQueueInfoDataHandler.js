/**
 * Created by Suhas on 6/23/2016.
 */
var mongoose = require('mongoose'),
    busParkingDataModel = mongoose.model('busLotStatusModel'),
    socketIo = require('../../../config/socketIo').getSocketIoServer();
var dataPusher=require('../../dataPusher');
var saveData = function(data){
    var busParkingDataModelObj = new busParkingDataModel();
    busParkingDataModelObj.busParkingArray=data.status;
    busParkingDataModelObj.receivedDateTime=new Date();
    busParkingDataModelObj.save(function(result){
        console.log("Bus Parking Data Saved");
        sendBusParkingData(busParkingDataModelObj.busParkingArray);
    })
}
function sendBusParkingData(data){
    var busParkingLotArray=new Array();
    var busUnloadingLotArray=new Array();
    var completeBusParkingStatus=new Array();
    if (data === undefined) return;
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
module.exports={
    saveData:saveData
}