/**
 * Created by rranjan on 1/15/16.
 */
"use strict";

var socketIoServer;
var httpServer;
var socketConnectionDetailsCollection = require("../app/multipleSocket"),
    multipleSocket=require('../app/multipleSocket')    ;
var init = function(server){
    httpServer=server;
    socketIoServer = require('socket.io')(server);
    socketIoServer.on('connection', function (newSocket) {
      if(newSocket){
        var socketObj = new Object();
        socketObj.id = newSocket.id;
        socketObj.details = {
          demographicRelatedData:{
            secondsSelected:30
          }
        };
        socketConnectionDetailsCollection.socketClientDetails.setSocketArrayDetails(socketObj);
        var details = {
          demographicRelatedData:{
            secondsSelected:30
          }
        }
        newSocket.emit('configSettingsOnStart',details);
        newSocket.on('disconnect', function(socket) {
          var len = 0;
          var socketArray = socketConnectionDetailsCollection.socketClientDetails.getSocketArrayDetails();
          console.log(socketArray.length)
          for(var i=0;i<socketArray.length; ++i ) {
            var p = socketArray[i];
            if(p.id == newSocket.id){
              socketArray.splice(i,1);
              break;
            }
          }
        });
      }
  });
}
var getSocketIoServer = function(){
   if(!socketIoServer)init(httpServer)
  return socketIoServer;
}
module.exports={
  init:init,
  getSocketIoServer:getSocketIoServer
}
