/**
 * Created by Suhas on 6/22/2016.
 */
var express = require('express');
var app = express();
var router = express.Router();
const fs = require('fs');
const fsPath = require('fs');
const filePath = fs.realpathSync(__dirname);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
app.use(router);
app.use(bodyParser.json());app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.get('/', function(req, res){
    res.send('hello world');
});
var server = app.listen(4300,function (){
    var host = server.address().address;
    var port = server.address().port;
    console.log('DashBoard-Control listening at http://'+host+':'+port);
});
app.post('/config',function(req,res){
    var data = req.body;
    saveConfiguration(data);
    startSmrtInstance(data,function(err,data){
        if (err) {
            res.send(err.stack);
        } else {
            res.send("succeeded in saving");
            saveConfiguration(data);
        }
    })
})

function saveConfiguration(data){
    var fileName = data.fileName;
    var obj = data;
    var filePath = data.filePath;
    var dataArray = [];
    fs.access('config.json', fs.F_OK, (err) => {
        if(err){
            var array=[obj]
            dataArray= JSON.stringify(array)
            fs.writeFile('config.json',dataArray, function(err){
                if(err){
                    console.log(err.stack)
                }else{
                    console.log("Copied Config TO config.json")
                }})
        }else{
            fs.readFile('config.json', (err, configFileData) => {
                if (err){
                    console.log(err.stack)
                }else{
                    if(configFileData.length>=0){
                        configFileData.push(obj)
                        dataArray= JSON.stringify(configFileData)
                        fs.writeFile('config.json',dataArray,function(err){
                            if(err){
                                console.log(err.stack)
                            }else{
                                console.log("Copied Config TO config.json")
                            }})
                    }
                }
            });
        }
    })
}

function startSmrtInstance(data1,callback){
    var data = "var path = require('path'),\n" +
        "rootPath = path.normalize(__dirname + '/..'),\n" +
        "env = process.env.NODE_ENV || 'development';\n";
    data+="var config = {\n";
    data+="development: {root: rootPath,app: {name:'"+data1.project+"'},\n";
    data+="port:'"+data1.portNo+"',\n";
    data+="db: 'mongodb://localhost/smrt-development',/*\n";
    data+="db: 'mongodb://163.172.131.83:28018/smrt',*/\n";
    data+="settingStatus:{\n";
    data+="\tsimulatorStatus:false\n";
    data+="},\n";
    data+="zmq:{\n";
    data+="sendHost:'"+data1.sendHost+"',\n";
    data+="recHost:'"+data1.recHost+"',\n";
    data+="port:'"+data1.sendHost+"',\n";
    data+="demographicInfoData:'"+data1.demographicInfoData+"',\n";
    data+="loadingOccupancyInfoData:'"+data1.loadingOccupancyInfoData+"',\n";
    data+="busEntryExistInfoData:'"+data1.busEntryExistInfoData+"',\n";
    data+="elderlyQueueInfoData:'"+data1.elderlyQueueInfoData+"',\n";
    data+="sensorDetectionInfoData:'"+data1.sensorDetectionInfoData+"'\n";
    data+="},\n";
    data+="busParkingDataReceiverApi:'http://118.201.198.248:8000/smrt/parkingbaystatus.php'\n";
    data+="}\n";
    data+="};\n";
    data+="module.exports = config[env];\n";
    fs.writeFile(filePath+'/config/'+data1.configName+'.js', data,'utf-8', function (err,daa) {
        var fileName = data1.configName+'.js';
        StartSmrtInstance(fileName,function(err1,result){
            callback(err1,daa);
        })
    })

}
function StartSmrtInstance(fileName,callBack){/*--config fileName */
    exec('node app.js',function(error, stdout, stderr){

        if (error !== null){
            console.log(`exec error: ${error}`);
            callBack(error,null)
        }else{
            console.log(`stdout:`);
            console.log(`stderr: ${stderr}`);
            callBack()
        }
    });
}