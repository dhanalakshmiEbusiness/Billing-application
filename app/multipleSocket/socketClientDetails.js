/**
 * Created by Suhas on 2/12/2016.
 */
var socketArray = [];
var setSocketArray = function(connectionObj){
        console.log(socketArray.length);
        socketArray.push(connectionObj);
}
var getSocketArray = function(){
        return socketArray
}
var removeSocketObj = function(index){
        socketArray.splice(index, 1);
}
module.exports={
        getSocketArrayDetails:getSocketArray,
        setSocketArrayDetails:setSocketArray,
        removeSocketObj:removeSocketObj
}
