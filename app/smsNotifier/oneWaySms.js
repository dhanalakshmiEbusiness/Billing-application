/**
 * Created by zendynamix on 3/7/2016.
 */
var request = require("request");
var flag = false;
var msgFlag = false;

function sendNotificationSMS(phoneNo,message,flag){
        console.log(phoneNo)
        if(flag){
           request("http://gateway.onewaysms.sg:10002/api.aspx?apiusername=APIVGH1MNJKQT&apipassword=APIVGH1MNJKQTVGH1M&mobileno=" +
                   ""+phoneNo+"" +"&senderid=NECTraffic&languagetype=1&message="+message, function (error, response, body) {
                        console.log(phoneNo)
                });
        }
}
function autoSmsNotifier(phoneNo,message){
        if(flag){
                sendNotificationSMS(phoneNo,message)
        }
}
function setAutoSMSNotifierFlag(flagVal){
        if(flagVal==="true"){
                flag=true;
        }else{
                flag=false;
        }
        console.log(typeof(flag))
}
module.exports = {
        sendNotificationSMS:sendNotificationSMS,
        autoSmsNotifier:autoSmsNotifier,
        getAutoSMSNotifierFlag:flag,
        setAutoSMSNotifierFlag:setAutoSMSNotifierFlag
};