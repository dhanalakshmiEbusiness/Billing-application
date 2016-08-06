/**
 * Created by zendynamix on 08-03-2016.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config');
var polygonDetails = require('../models/mapPlotModel');
Schema = mongoose.Schema;
mongoose.connect(config.db);
if(process.argv.indexOf("-force")>0){
    polygonDetails.remove({}, function(err) {
        console.log("previous data removed")
        generatePolygonPlots();
    });
}else{
    polygonDetails.find({}, function(err,result){
        if(err) {
            console.log(err)
        }
        if(result && result.length>0){
            console.log("data Present")
            process.exit(0);

        }else{
            generatePolygonPlots();
        }

    });
}
function generatePolygonPlots(){
    var polygonObj = new polygonDetails();
    polygonObj.mapPlotInformation.dateTime=new Date();
    var polygonDetialsArray=[
        {
        point1:{x:118,y:384},
        point2:{x:138,y:371},
        point3:{x:182,y:453},
        point4:{x:160,y:463},
        },
        {
            point1:{x:145,y:384},
            point2:{x:167,y:372},
            point3:{x:211,y:453},
            point4:{x:188,y:465}
        },
        {

            point1:{x:174,y:384},
            point2:{x:196,y:372},
            point3:{x:241,y:453},
            point4:{x:219,y:465}
        },
        {

            point1:{x:204,y:384},
            point2:{x:228,y:371},
            point3:{x:271,y:453},
            point4:{x:248,y:466}
        },
        {

            point1:{x:234,y:384},
            point2:{x:256,y:371},
            point3:{x:300,y:455},
            point4:{x:277,y:466}
        },

        {

            point1:{x:253,y:367},
            point2:{x:277,y:355},
            point3:{x:337,y:468},
            point4:{x:315,y:483}
        },

        {

            point1:{x:282,y:365},
            point2:{x:304,y:354},
            point3:{x:368,y:472},
            point4:{x:344,y:482}
        },

        {

            point1:{x:312,y:366},
            point2:{x:333,y:355},
            point3:{x:396,y:468},
            point4:{x:374,y:483}
        },

        {

            point1:{x:339,y:368},
            point2:{x:364,y:352},
            point3:{x:426,y:468},
            point4:{x:403,y:483}
        },

        {

            point1:{x:370,y:366},
            point2:{x:392,y:354},
            point3:{x:453,y:470},
            point4:{x:433,y:482}
        },

        {

            point1:{x:400,y:364},
            point2:{x:422,y:353},
            point3:{x:484,y:470},
            point4:{x:461,y:482}
        },

        {

            point1:{x:429,y:364},
            point2:{x:451,y:353},
            point3:{x:512,y:470},
            point4:{x:490,y:482}
        },

        {

            point1:{x:459,y:364},
            point2:{x:482,y:353},
            point3:{x:541,y:472},
            point4:{x:520,y:481}
        },

        {

            point1:{x:488,y:364},
            point2:{x:508,y:352},
            point3:{x:570,y:468},
            point4:{x:547,y:480}
        },

        {

            point1:{x:515,y:364},
            point2:{x:540,y:353},
            point3:{x:601,y:470},
            point4:{x:579,y:481}
        },

        {

            point1:{x:546,y:364},
            point2:{x:569,y:353},
            point3:{x:631,y:470},
            point4:{x:609,y:481}
        },

        {

            point1:{x:575,y:364},
            point2:{x:598,y:353},
            point3:{x:660,y:470},
            point4:{x:637,y:481}
        },

        {

            point1:{x:604,y:364},
            point2:{x:626,y:353},
            point3:{x:691,y:470},
            point4:{x:668,y:481}
        },
        {

            point1:{x:666,y:365},
            point2:{x:688,y:352},
            point3:{x:751,y:470},
            point4:{x:728,y:482},
        },
        {

            point1:{x:695,y:365},
            point2:{x:718,y:352},
            point3:{x:779,y:470},
            point4:{x:757,y:482}
        },
        {

            point1:{x:723,y:365},
            point2:{x:746,y:352},
            point3:{x:808,y:470},
            point4:{x:786,y:482}
        },
        {

            point1:{x:754,y:365},
            point2:{x:777,y:352},
            point3:{x:840,y:470},
            point4:{x:816,y:482}
        },
        {

            point1:{x:783,y:365},
            point2:{x:805,y:352},
            point3:{x:867,y:470},
            point4:{x:846,y:482}
        },
        {

            point1:{x:812,y:365},
            point2:{x:835,y:352},
            point3:{x:896,y:470},
            point4:{x:874,y:482}
        },
        {

            point1:{x:841,y:365},
            point2:{x:864,y:352},
            point3:{x:927,y:470},
            point4:{x:902,y:482}
        },

        {

            point1:{x:870,y:365},
            point2:{x:894,y:352},
            point3:{x:956,y:470},
            point4:{x:932,y:482}
        },

        {

            point1:{x:900,y:365},
            point2:{x:922,y:352},
            point3:{x:985,y:470},
            point4:{x:963,y:482}
        },

        {

            point1:{x:928,y:365},
            point2:{x:952,y:352},
            point3:{x:1014,y:470},
            point4:{x:992,y:482}
        },


        {

            point1:{x:959,y:365},
            point2:{x:981,y:352},
            point3:{x:1043,y:470},
            point4:{x:1021,y:482}
        },

        {

            point1:{x:987,y:365},
            point2:{x:1010,y:352},
            point3:{x:1072,y:470},
            point4:{x:1050,y:482}
        },
        {

            point1:{x:1017,y:365},
            point2:{x:1040,y:352},
            point3:{x:1104,y:470},
            point4:{x:1079,y:482}
        },
        {

            point1:{x:1047,y:365},
            point2:{x:1069,y:352},
            point3:{x:1132,y:470},
            point4:{x:1110,y:482}
        },
        {

            point1:{x:1077,y:365},
            point2:{x:1101,y:352},
            point3:{x:1162,y:470},
            point4:{x:1138,y:482}
        },
        {

            point1:{x:1138,y:365},
            point2:{x:1161,y:354},
            point3:{x:1223,y:470},
            point4:{x:1200,y:482}
        },
        {

            point1:{x:1167,y:365},
            point2:{x:1190,y:354},
            point3:{x:1252,y:470},
            point4:{x:1229,y:482}
        },
        {

            point1:{x:1196,y:365},
            point2:{x:1218,y:354},
            point3:{x:1281,y:470},
            point4:{x:1258,y:482}
        },
        {

            point1:{x:1225,y:365},
            point2:{x:1247,y:354},
            point3:{x:1310,y:470},
            point4:{x:1289,y:482}
        },
        {

            point1:{x:1254,y:365},
            point2:{x:1277,y:354},
            point3:{x:1340,y:470},
            point4:{x:1317,y:482}
        },
        {

            point1:{x:1283,y:365},
            point2:{x:1306,y:354},
            point3:{x:1368,y:470},
            point4:{x:1346,y:482}
        },
        {

            point1:{x:1315,y:365},
            point2:{x:1335,y:354},
            point3:{x:1398,y:470},
            point4:{x:1376,y:482}
        },
        {

            point1:{x:1344,y:365},
            point2:{x:1366,y:354},
            point3:{x:1428,y:470},
            point4:{x:1404,y:482}
        },
        {

            point1:{x:1372,y:365},
            point2:{x:1394,y:354},
            point3:{x:1456,y:470},
            point4:{x:1434,y:482}
        },
        {

            point1:{x:1400,y:365},
            point2:{x:1425,y:354},
            point3:{x:1486,y:470},
            point4:{x:1462,y:482}
        },
        {

            point1:{x:1430,y:365},
            point2:{x:1454,y:354},
            point3:{x:1517,y:470},
            point4:{x:1494,y:482}
        },
        {
            point1:{x:1459,y:365},
            point2:{x:1482,y:354},
            point3:{x:1545,y:470},
            point4:{x:1522,y:482}
        },
        {

            point1:{x:1489,y:365},
            point2:{x:1510,y:354},
            point3:{x:1573,y:470},
            point4:{x:1551,y:482}
        },



        {

            point1:{x:1530,y:384},
            point2:{x:1552,y:373},
            point3:{x:1596,y:455},
            point4:{x:1575,y:467}
        },

        {

            point1:{x:1560,y:384},
            point2:{x:1582,y:376},
            point3:{x:1626,y:456},
            point4:{x:1600,y:469}
        },


        {

            point1:{x:1589,y:387},
            point2:{x:1613,y:375},
            point3:{x:1655,y:457},
            point4:{x:1634,y:467}
        },
        {
            point1:{x:1619,y:384},
            point2:{x:1641,y:376},
            point3:{x:1683,y:456},
            point4:{x:1663,y:467}
        }
        ,
        {

            point1:{x:1646,y:384},
            point2:{x:1672,y:376},
            point3:{x:1715,y:457},
            point4:{x:1693,y:467}
        },


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
/*generatePolygonPlots();*/

