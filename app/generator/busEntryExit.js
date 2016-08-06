/**
 * Created by Suhas on 2/23/2016.
 */
var mongoose = require('mongoose'),
        config = require('../../config/config');
var busExitEntryModel = require('../models/busEntryExistModel');
/*var anme = __dirname+'../';*/
/*var constant = require(__dirname+'/../const');*/
Schema = mongoose.Schema;
mongoose.connect(config.db);
busExitEntryModel.remove({}, function (err) {
        console.log("removed busEntryExit Simulator Data generated document");
        createBusEntryExitModel();
});
function createBusEntryExitModel() {
        var num = 100;
        console.log(num)
        var lat = [1.350228, 1.353864, 1.353864];
        var lang = [103.984889, 103.986498, 103.986498];
        var plateNumber = ['ADFN3R2', 'ADFN3R4','ADFN3R5','ADFN3R7','ADFN3R8'];
        var direction = ['entrance','exit'];
        for (var i = 0; i < num; i++) {
                /*console.log(constant)*/
                var createBusDetectionDataModel = new busExitEntryModel();
                        var busData = {};
                createBusDetectionDataModel.plate = plateNumber[Math.round(Math.floor(Math.random() * 5) + 0)];
                createBusDetectionDataModel.direction = direction[Math.round(Math.floor(Math.random() * 2) + 0)];
                createBusDetectionDataModel.snapshot = 'hi';
                createBusDetectionDataModel.timestamp = 1;
                createBusDetectionDataModel.receivedDateTime = new Date();
                createBusDetectionDataModel.save(function (err, result) {
                        if (err) {
                                console.log(err)
                        }

                })
                        }

};