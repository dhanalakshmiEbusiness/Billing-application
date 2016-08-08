prerequisites
mongodb      :      v3.0.3
nodejs       :      v 4.3.2
zmq          :      2.14.0

Instructions to run the application
1: Navigate to the folder where application is present and type the command
  npm install
2: Please check  config.js which is in config folder of the  application to change the configuration of  following :
* Database where the application is pointing to
* ZMQ port numbers
3: To create a new environment if needed for the application, add a new entry of the configuration in config.js  as shown below 
 EnvironmentName: {
 root: rootPath,
 app: {
 name: name of the application // eg:'SMRT'
      },
port: port number where the application is  running,//eg:4000
db: mongodb url where the application points to//eg:'mongodb://Test:test@ds011268.mongolab.com:11268/taxifleetmanager'
zmq:{
sendHost:Ip address of the server,//eg:"51.12.211.11",
recHost:"*",
examplePortName1: ZMQ port number of examplePortName1 ,//eg:port:'3001'
examplePortName2:ZMQ port number of examplePortName2 ,//eg:portNotification:'3004'
 }
},
};


sample Configuration:

development: {
  root: rootPath,
  app: {
    name: 'smrt'
  },
  port: 4200,// application port
  db: 'mongodb://localhost/smrt-development',
  zmq:{
    sendHost:"127.0.0.1",
    recHost:"*",
    port:'4201',
    demographicInfoData:'4202',
    loadingOccupancyInfoData:'4203',
    busEntryExistInfoData:'4204',
    elderlyQueueInfoData:'4205'
  }
}


4: Navigate to the folder app ->generator in the application and run the following generators by typing the command :
NODE_ENV=EnvironmentName node userCredencials.js 

As per the sample above 
NODE_ENV=development node userCredencials.js 
* userCredencials.js : which will provide the default credencials of the application to login 
  username:admin
  password:adminsmrt123


* settingsGenerator.js:which will provide default setting required to generate the data for the dashboard and live view of the application

NODE_ENV=EnvironmentName node settingsGenerator.js 
As per the sample above 
NODE_ENV=development node settingsGenerator.js 

5:Finally to run the application navigate to the application folder and type the command
NODE_ENV=ConfigurationName node app.js
As per the sample above 
NODE_ENV=development node app.js








