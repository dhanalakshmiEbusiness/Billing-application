/**
 * Created by Suhas on 3/7/2016.
 */
var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        settingsModel = mongoose.model('settingModel'),
        dataAccessModule=require('../dataAccessModule'),
        smsAdapter=require('../smsNotifier')
        module.exports = function (app){
                app.use('/', router);
        };
        router.post('/smrt/elderly/sendNotification',function (req,res){
                var  data = req.body;
                smsAdapter.oneWaySms.sendNotificationSMS(data.phoneNo,data.msg,true);
                res.send("msg Sent")
        })

