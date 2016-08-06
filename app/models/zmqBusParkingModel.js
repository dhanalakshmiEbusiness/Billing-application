/**
 * Created by Suhas on 6/23/2016.
 */
var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var zmqBusLotDataSimulatorDataSchema = new mongoose.Schema({ recivedDateTime: Date,busParkingArray:Array},{collection: "zmqBusLotDataSimulatorDataCollection"});
zmqBusLotDataSimulatorDataSchema.plugin(random);
module.exports =mongoose.model('zmqBusLotDataSimulatorDataModel', zmqBusLotDataSimulatorDataSchema);