/**
 * Created by zendynamix on 11-03-2016.
 */

var mongoose = require('mongoose'),
    config = require('../../config/config');
var polygonLoadingBayDetails = require('../models/LoadinGBayPlotModel');
Schema = mongoose.Schema;
mongoose.connect(config.db);
polygonLoadingBayDetails.remove({}, function(err) {
    console.log("previous data removed")
});
function generatePolygonPlots(){
    var polygonObj = new polygonLoadingBayDetails();
    polygonObj.mapPlotInformation.dateTime=new Date();
    var polygonDetialsArray=[
        {
            point1:{x:999,y:212},
            point2:{x:1101,y:214},
            point3:{x:1100,y:248},
            point4:{x:998,y:249}
        }
        ,
        {
            point1:{x:1125,y:211},
            point2:{x:1227,y:212},
            point3:{x:1228,y:247},
            point4:{x:1126,y:246}
        }

        ,
        {
            point1:{x:1251,y:212},
            point2:{x:1396,y:212},
            point3:{x:1397,y:246},
            point4:{x:1250,y:246}
        }
        ,

        {
            point1:{x:1423,y:211},
            point2:{x:1527,y:213},
            point3:{x:1527,y:246},
            point4:{x:1425,y:246}
        },
        {
            point1:{x:1551,y:211},
            point2:{x:1655,y:211},
            point3:{x:1655,y:246},
            point4:{x:1552,y:246}
        }
        ,
        {
            point1:{x:1733,y:238},
            point2:{x:1795,y:319},
            point3:{x:1770,y:340},
            point4:{x:1705,y:255}
        }
    ]
    var polygonObjArray=[];
    for(var j=0; j<polygonDetialsArray.length;j++){
        /* console.log(polygonDetialsArray[j].point1.x);
         console.log(polygonDetialsArray[j].point1.y);*/
        var arrayObj={
            id:j,
            point1:{x:polygonDetialsArray[j].point1.x,y:polygonDetialsArray[j].point1.y},
            point2:{x:polygonDetialsArray[j].point2.x,y:polygonDetialsArray[j].point2.y},
            point3:{x:polygonDetialsArray[j].point3.x,y:polygonDetialsArray[j].point3.y},
            point4:{x:polygonDetialsArray[j].point4.x,y:polygonDetialsArray[j].point4.y}
        }
        polygonObjArray.push(arrayObj);
    }
    console.log(polygonDetialsArray.length)
    polygonObj.mapPlotInformation.polygonArray=polygonObjArray;
    console.log(polygonObj)
    polygonObj.save(function(err,result){
        if(err)
            console.log(err)
        console.log("plots generated")
        process.exit(0);
    })

};
generatePolygonPlots();

