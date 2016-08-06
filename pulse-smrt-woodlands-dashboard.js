const fs = require('fs');
const path = require('path');
const action = process.argv[2];

const description = JSON.parse(fs.readFileSync("description.json").toString());
const configurationSchema = description.configuration;

function parseConfiguration(filename, schema) {
  const input = JSON.parse(fs.readFileSync(filename).toString());
  const configuration = {};
  for (var i in schema) {
    if (input[i] === undefined) {
      if (schema[i].default === undefined) {
        console.error("Configuration entry " + i + " missing.");
        process.exit(-1);
      }
      configuration[i] = schema[i].default;
    } else {
      configuration[i] = input[i];
    }
  }
  return configuration;
}

const configuration = parseConfiguration(process.argv[3], configurationSchema);

if (action === "check-requirements") {
  // TODO: check if the url provided are accessible
  try {
    const mongoose = require('mongoose');
    mongoose.connect(configuration.mongodbUrl, {}, function(error) {
      "use strict";
      if (error === undefined) {
        process.exit(0);
      } else {
        console.log("Cannot connect to provided database URL: " + configuration.mongodbUrl);
        process.exit(-1);
      }
    });
  } catch (err) {
    console.log(err);
    console.log("Cannot connect to provided database URL: " + configuration.mongodbUrl);
    process.exit(-1);
  }
} else if (action === "generate-configuration") {
  const config = {
    root: path.normalize(__dirname),
      app: {
      name: 'smrt'
    },
    port: configuration.port,
    db: configuration.mongodbUrl,
    settingStatus:{
      simulatorStatus:false
    },
    zmq: {
      /* sendHost:"127.0.0.1", */
      recHost: "*",
      /* port:'4201', */
      /* demographicInfoData:'4202', */
      loadingOccupancyInfoData: configuration.queueLevelDetectorPort,
      busEntryExistInfoData: configuration.numberPlateRecognitionPort,
      /* elderlyQueueInfoData:'4205', */
      /* sensorDetectionInfoData:'4206', */
      busParKingQueueInfoData: configuration.parkingSensorsPort
    },
  };
  const content = "module.exports = " + JSON.stringify(config) + "\n";
  fs.writeFileSync("config/config.js", content);
}
