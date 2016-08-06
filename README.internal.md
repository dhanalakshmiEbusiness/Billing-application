# SMRT #

## Run application using source code


###Prerequisites 

|Software|Version|
|---|---|
|mongodb|v 3.0.3|
|nodejs|v 4.4.7|
|zmq|v 4.2.1|
|git|v 2.9.X |


### Download Source Code
	git clone <repo>

### Configure Application


**Create a new environment if needed. Add a new environment configuration in config.js as shown below:**
> In app/config/config.js

```js

 <EnvironmentName>: {
 root: rootPath,
 app: {
 name: < name of the application > // eg:'SMRT'
      },
port: <port number where the application has to  run>,//eg:4000
db: <mongodb url where the application  has to points >//eg:'mongodb://Test:test@ds011268.mongolab.com:11268/smrt'
zmq:{
sendHost:< Ip address of the server >,//eg:"51.12.211.11",
recHost:"*",
examplePortName1: < ZMQ port number of examplePortName1 > ,//eg:port:'4201'
examplePortName2: <ZMQ port number of examplePortName2 >//eg:demographicInfoData:'4202'
 }
},
};

```


**_Sample Configuration_**

```js

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
      elderlyQueueInfoData:'4205',
      sensorDetectionInfoData:'4206',
      busParKingQueueInfoData:'4207'
  },
   busParkingDataReceiverApi:"http://118.201.198.248:8000/smrt/parkingbaystatus.php"
}


```


### Install Application 

*  Navigate to the folder where application is present and type the command 
       - npm install
*  Please check  config.js which is in the config folder of the  application to change the configuration of the following :
     - Database where the application has to point
     - ZMQ port numbers from where the application has to receive the data
    

### Run Application 
**_Finally to run the application navigate to the application folder and type the command_**

    NODE_ENV=  <ConfigurationName> node app.js 

**_Run using sample Configuration_**
    
    NODE_ENV= development node app.js