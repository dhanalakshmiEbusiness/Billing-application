/**
 * Created by zendynamix on 08-03-2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var mapPlotsSchema = new mongoose.Schema({
    "mapPlotInformation":{
        "dateTime" : Date,
        "polygonArray":[
            {
                id:Number,
                point1:{x:Number,y:Number},
                point2:{x:Number,y:Number},
                point3:{x:Number,y:Number},
                point4:{x:Number,y:Number}
            }
        ]
    }
    },{collection: "mapPlots"});
module.exports =mongoose.model('mapPlots',mapPlotsSchema);