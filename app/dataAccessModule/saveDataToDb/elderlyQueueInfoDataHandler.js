/**
 * Created by Suhas on 2/25/2016.
 */
var mongoose = require('mongoose'),
  elderlyQueueInfoModel = mongoose.model('elderlyQueueModel'),
  dataPusher = require('../../dataPusher'),
  socketIo = require('../../../config/socketIo').getSocketIoServer(),
  dataAccessModule = require('../../dataAccessModule'),
  utilities = require('../../utilities'),
  smsNotifier = require('../../smsNotifier');
var pushEveryTick = true;
var timeOut = 200;
var elderlyOccupancyThreshold = 40;
var phoneNo = 0;
var msgFlag = false;

var saveData = function (data) {
  var elderlyQueueInfoModelObj = new elderlyQueueInfoModel();
  /*
   "dateTime": Date, //Date and Time of the Payload genrated
   "receivedDateTime" : Date,
   "elderlyQueueLevel": {
   "berthIndex": Number,
   "occupancy": Number,  // in %
   */elderlyQueueInfoModelObj.queueLevelInformation={};
  elderlyQueueInfoModelObj.queueLevelInformation.elderlyQueueLevel={};
  elderlyQueueInfoModelObj.queueLevelInformation.elderlyQueueLevel.occupancy = data.occupancy;
  elderlyQueueInfoModelObj.queueLevelInformation.elderlyQueueLevel.berthIndex = data.berth;
  elderlyQueueInfoModelObj.queueLevelInformation.receivedDateTime = new Date();
  /*if (pushEveryTick) {
    /!*socketIo.emit('pushEveryTickElderlyOccupancy', elderlyQueueInfoModelObj);*!/
  }*/
  var elderlyOccupancyBerthWise = data.occupancy;
  var berthIndex = data.berth;
  var timeOutDuration = timeOut;
  var tickDate = new Date();
  if (elderlyOccupancyBerthWise > data.priorityQueueAlertThreshold) {
    checkTimer(berthIndex, tickDate, timeOutDuration, data.priorityQueueAlertThreshold,phoneNo)
  }
  else if (elderlyOccupancyBerthWise < data.priorityQueueAlertThreshold) {
    stopElderThresholdCheckup(berthIndex - 1);
  }
  elderlyQueueInfoModelObj.save(function (err, result) {
    if (result) {
      /*console.log("Elderly Queue Data Saved")*/
      if (pushEveryTick) {
        socketIo.emit('pushEveryTickElderlyOccupancy', result);
      }
    }
  })
};

var setDataPushType = function (flag) {
  if (!flag) {
    pushEveryTick = false;
  } else {
    pushEveryTick = true;
  }
};

function checkTimer(berthIndex, date, timeOutDuration, elderlyOccupancyThreshold, phoneNo) {
  console.log("checkTimer");
  var isTimeOutStartedForBerth = utilities.timeOut.isTimeOutRunning(berthIndex - 1);
  if (isTimeOutStartedForBerth) {
    startElderThresholdCheckup(berthIndex, date, timeOutDuration, elderlyOccupancyThreshold, phoneNo);
  }
}

function startElderThresholdCheckup(berthIndex, date, timeOfTimeout, elderlyOccupancyThreshold, phoneNo) {
  console.log("checkTimer");
  utilities.timeOut.setTimeOut(berthIndex - 1, date, timeOfTimeout, elderlyOccupancyThreshold,
    function (bertIndex, date, notificationPeriod, threshold, phoneNo) {
      var start = date;
      var end = date;
      end.setSeconds(end.getSeconds() - 2);
      start.setSeconds(start.getSeconds() + 1000);
      elderlyQueueInfoModel.aggregate(
        [
          {
            $match: {
              /*
               "queueLevelInformation.dateTime":{$gt:end,$lt:start},*/
              "queueLevelInformation.elderlyQueueLevel.berthIndex": bertIndex
            }
          }, {
          $sort: {
            "queueLevelInformation.receivedDateTime": -1
          }
        },
          {
            $group: {
              _id: null,
              date: {"$first": "$queueLevelInformation.receivedDateTime"},
              occupancy: {"$first": "$queueLevelInformation.elderlyQueueLevel.occupancy"}
            }
          }

        ],
        function (err, result) {
          var data = {
            bertIndex: bertIndex,
            occupancy: 0,
            date: date
          }
          if (err) {
            console.log(err);
            return;
          }
          if (result[0].occupancy > threshold) {
            var occupancy = result[0].occupancy;
            var datee = result[0].date;
            data.occupancy = occupancy;
            data.date = datee;
            var msg = "Around " + occupancy + "% occupancy of Physically Challenged at Berth " + bertIndex + ".";
            smsNotifier.oneWaySms.sendNotificationSMS(phoneNo, msg, msgFlag)
            socketIo.emit('elderlyCountNotificationInfo', data);
          }
          utilities.timeOut.clearIntervalForGivenId(bertIndex - 1)

        });
    }, timeOut, phoneNo)
}
function stopElderThresholdCheckup(berthIndex) {
  utilities.timeOut.clearIntervalForGivenId(berthIndex)
}
var setElderlyOccupancyThreshold = function (threshold) {
  elderlyOccupancyThreshold = threshold;
}
var setElderlyOccupancyThresholdTimeOut = function (timeOutInMilliSeconds) {
  timeOut = timeOutInMilliSeconds;
}
var setSMSDetails = function (receiverPhNo, status) {

  phoneNo = receiverPhNo;
  msgFlag = status;
}
module.exports = {
  saveData: saveData,
  setDataPushType: setDataPushType,
  setElderlyOccupancyThreshold: setElderlyOccupancyThreshold,
  setElderlyOccupancyThresholdTimeOut: setElderlyOccupancyThresholdTimeOut,
  setSMSDetails: setSMSDetails
}