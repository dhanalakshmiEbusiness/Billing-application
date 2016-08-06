/**
 * Created by zendynamix on 07-03-2016.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config');
var PassportLocal = require('../models/Passport_LocalUsers');
Schema = mongoose.Schema;
/*mongoose.connect(config.db);*/


function generateUserCredencials(callback){
    var userObj = new PassportLocal();
    userObj.username="admin";
    userObj.password="$2a$10$0lwCCtET6CZUJ0k0B3UMy.OQwJ1MJfJpXWgqrseAp1uYALvAOJlsa";
    userObj.email="admin@gmail.com";
    userObj.firstName="admin";
    userObj.lastName="smrt";
    userObj.isAdmin=true;
    userObj.save(function(err,result){
        if(err)
            console.log(err)
        console.log("Default User Credentials generated");
        callback();
        /*process.exit(0);*/
    })
};
module.exports={
    run:function(callback){
    PassportLocal.findOneAndRemove({"username": 'admin'}, function(err){
        if(err) {
            console.log(err)
        }else{
            console.warn("removed previous admin document")
            generateUserCredencials(callback);
        }
    });
}
}