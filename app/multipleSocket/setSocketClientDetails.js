/**
 * Created by Suhas on 2/16/2016.
 */
var ClientSocketDetails = require('./socketClientDetails')
var setSecondsForDemographicGraph = function(seconds,connId){
        var clientDetails = ClientSocketDetails.getSocketArrayDetails();
        console.log(clientDetails.length)
        for(var i=0;i<clientDetails.length;i++){
                var clientConId = clientDetails[i].id;
                if(connId==clientConId){
                        console.log("Changed the second Details Of Client  "+clientConId+" to "+seconds);
                        clientDetails[i].details.demographicRelatedData.secondsSelected = seconds;
                        ClientSocketDetails.setSocketArrayDetails(clientDetails[i]);
                        ClientSocketDetails.removeSocketObj(i);
                }

        }
}

module.exports={
        setSecondsForDemographicGraph:setSecondsForDemographicGraph
}