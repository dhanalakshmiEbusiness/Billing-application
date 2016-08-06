/**
 * Created by zendynamix on 07-03-2016.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config');
var PassportLocal = require('../models/Passport_LocalUsers');
Schema = mongoose.Schema;
mongoose.connect(config.db);
PassportLocal.findOneAndRemove({"username": 'admin'}, function(err){
    if(err) {
        console.log(err)
    }else{
            console.log("removed previous admin document   ")
            generateUserCredencials();
        }

});

function generateUserCredencials(){
    var userObj = new PassportLocal();
    userObj.username="admin";
    userObj.password="$2a$10$6RzGhDQLEdi0SZQlpEj7Ce/b0brIab5j3Q26vwhwjkdUjMcxVRhdy";
    userObj.email="admin@gmail.com";
    userObj.firstName="admin";
    userObj.lastName="smrt";
    userObj.isAdmin=true;
    userObj.save(function(err,result){
        if(err)
            console.log(err)
        console.log("Credencials generated")
        process.exit(0);
    })
};


