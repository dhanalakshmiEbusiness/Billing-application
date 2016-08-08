/*var zmq = require('zmq');*/
var express = require('express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose');
/*var dataSeeder = require('dataSeeder');*/
mongoose.connect(config.db);

var dataSeeder = require("data-seeder");
var scriptSeeder = dataSeeder.run({scriptDirPath:__dirname+'/app/setupScripts/',mongo:false});
  scriptSeeder.then(function(){
      var db = mongoose.connection;
      db.on('error', function (){
        throw new Error('unable to connect to database at ' +config.db);
      });
      var models = glob.sync(config.root + '/app/models/*.js');
      models.forEach(function (model) {
        require(model);
      });
      var app = express();
      var server = require('http').Server(app);
      server.listen(config.port, function () {
        console.log('Express server listening on port ' + config.port);
      });
      require('./config/socketIo').init(server )
      require('./config/express')(app,config);
      /*require('./config/zmqPushPull').zmqPushPull(config);*/
      require('zmqConnector').zmqConnector(__dirname+'/app/dataAccessModule/saveDataToDb/',config.zmq);
})
.catch(function(error){
  console.warn(error.stack)
  });




