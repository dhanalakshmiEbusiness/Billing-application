/**
 * Created by zendynamix on 08-03-2016.
 */

var  request = require("request"),
    https = require('https'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    plotModel = mongoose.model('mapPlots');
    loadingBayPlotModel = mongoose.model('mapLoadingBayPlots');
    retriveDataDb=require('../dataAccessModule');

    module.exports = function (app){
    app.use('/', router);
};

router.get('/smrt/polygon/plots',function (req,res){
    plotModel.find({},function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result)
    })
})

router.get('/smrt/loadingBayPolygon/plots',function (req,res){
    loadingBayPlotModel.find({},function(err,result){
        if(err){
            res.send(err);
        }
        res.send(result)
    })
})


router.get('/smrt/incial/status/plots',function (req,res){
        request("http://119.73.147.2/smrt/parkingbaystatus.php", function (error, response, body) {
            res.send(JSON.parse(body));
        });

})



