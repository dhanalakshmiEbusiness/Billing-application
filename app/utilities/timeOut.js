/**
 * Created by Suhas on 3/2/2016.
 */
var timeout_handles = [];
function setTimeOut(id,date,notificationPeriod,threshold,code,time,phoneNo){
       /* if( id in timeout_handles )
        {
                clearTimeout( timeout_handles[id] )
        }*/
        /*console.log("timer for bert "+(id+1)+" started");*/
        /*var bertIndex=1,
        date = new Date(),
        threshold = 20,
        notificationPeriod=10;*/
        var bertIndex = id+1;
        function callBack(){
                code(bertIndex,date,notificationPeriod/1000,threshold,phoneNo)
        };
        /*var callBack = code;*/
        timeout_handles[id] = setTimeout(callBack,time);
        return timeout_handles;
}
var clearIntervalForGivenId = function(id){
        /*console.log("timer for bert "+(id+1)+" stopped");*/
        clearTimeout(timeout_handles[id])
        timeout_handles[id]='';
        return timeout_handles;
}
var isTimeOutRunning = function(id){
        var flag = false;
        if(timeout_handles.length==0 || !timeout_handles[id] || timeout_handles[id] == ""){  /*id in timeout_handles &&*/
                console.log("bert of "+(id+1)+"timer empty");
                flag = true;
        }else if(timeout_handles.length>0 && id in timeout_handles && timeout_handles[id] != ""){
                console.log("bert of "+(id+1)+"not empty ")
                flag=false;
        }
        console.log(flag)
        return flag;
}
module.exports={
     setTimeOut:setTimeOut,
     clearIntervalForGivenId:clearIntervalForGivenId,
     isTimeOutRunning:isTimeOutRunning
}