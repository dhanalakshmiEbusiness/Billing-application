/**
 * Created by zendynamix on 07-10-2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PassPortLocalUserSchema = new mongoose.Schema(
    {
      username: String,
      password: String,
      email: String,
      firstName: String,
      lastName: String,
      isAdmin:Boolean
    },{collection: "PassportLocalUser"});

module.exports =mongoose.model('PassportLocalUser',PassPortLocalUserSchema);
