  var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';
  dbHost=process.env.DB_HOST_NAME,
  dbPort=process.env.DB_PORT,
  busParkingGatewayURL= process.env.BUS_PARKING_GATWAY_URL;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'taxiFleetManager'
    },
    port: 4200,
    db: 'mongodb://localhost/taxiFleetManager-development',
    settingStatus:{
      simulatorStatus:false
    },
    zmq:{
      sendHost:"127.0.0.1",
      recHost:"*",
      //host:'127.0.0.1',
      port:'4201',
      dataHandlerDirectoryPath:"./app/dataAccessModule/saveDataToDb/",
      queue:[
        {name:'loadingOccupancyInfoData',portNo:'4203',type:'pull'},
        {name:'busEntryExitInfoData',portNo:'4204',type:'pull'},
        {name:'bus_ParkingQueueInfoData',portNo:'4207',type:'pull'}]
    },
    busParkingDataReceiverApi:"http://118.201.198.248:8000/smrt/parkingbaystatus.php"
  },

  integration: {
    root: rootPath,
    app: {
      name: 'taxiFleetManager'
    },
    port: 4200,
    db: 'mongodb://163.172.131.83:28018/taxiFleetManager',
    settingStatus:{
      simulatorStatus:true
    },
    zmq:{
      sendHost:"212.47.249.75",
      recHost:"*",
      port:'4201',
      queue:[
        {name:'loadingOccupancyInfoData',portNo:'4203',type:'pull'},
        {name:'busEntryExitInfoData',portNo:'4204',type:'pull'},
        {name:'bus_ParkingQueueInfoData',portNo:'4207',type:'pull'}]
    },
          busParkingDataReceiverApi:"http://118.201.198.248:8000/smrt/parkingbaystatus.php"
  },

  cpIntegration: {
    root: rootPath,
    app: {
      name: 'taxiFleetManager'
    },
    port: 4200,
    db: 'mongodb://163.172.131.83:28018/taxiFleetManager-cp',
    settingStatus:{
      simulatorStatus:false
    },
    zmq:{
      sendHost:"212.47.240.62",
      recHost:"*",
      port:'4201',
      queue:[
        {name:'loadingOccupancyInfoData',portNo:'4203',type:'pull'},
        {name:'busEntryExitInfoData',portNo:'4204',type:'pull'},
        {name:'bus_ParkingQueueInfoData',portNo:'4207',type:'pull'}]
    },
    busParkingDataReceiverApi:"http://118.201.198.248:8000/smrt/parkingbaystatus.php"
  },

  test: {
    root: rootPath,
    app: {
      name: 'taxiFleetManager'
    },
    port: 4200,
    db: 'mongodb://localhost/taxiFleetManager-test',
    zmq:{
      host:'localhost',
      port:'4201'

    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'taxiFleetManager'
    },
    port: 4200,
    db: 'mongodb://localhost/taxiFleetManager-production',
    settingStatus:{
      simulatorStatus:false
    }
  },
  docker: {
    root: rootPath,
    app: {
      name: 'taxiFleetManager'
    },
    port: 4200,
    db: 'mongodb://'+dbHost+':'+dbPort+'/taxiFleetManager-cp',
    settingStatus:{
      simulatorStatus:false
    },
    zmq:{
      sendHost:"localhost",
      recHost:"*",
      queue:[
        {name:'loadingOccupancyInfoData',portNo:'4203',type:'pull',recHost:"*",sendHost:"127.0.0.1"},
        {name:'busEntryExitInfoData',portNo:'4204',type:'pull',recHost:"*",sendHost:"127.0.0.1"},
        {name:'bus_ParkingQueueInfoData',portNo:'4207',type:'pull',recHost:"*",sendHost:"127.0.0.1"}]
    },
    busParkingDataReceiverApi:busParkingGatewayURL
  }
};

module.exports = config[env];
