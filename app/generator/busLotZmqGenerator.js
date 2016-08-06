/**
 * Created by Suhas on 6/23/2016.
 */
/**
 * Created by Suhas on 3/1/2016.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config');
var busParkingSimulatorModel = require('../models/zmqBusParkingModel.js');
Schema = mongoose.Schema;
mongoose.connect(config.db);
   /* busParkingSimulatorModel.remove({}, function(err) {
        console.log("previous data forcefully removed")
        generatebusParkingDocument();
    });*/

generatebusParkingDocument();
function generatebusParkingDocument(){
    var busParkingArray = [
        {
            date: "20160623",
            time: "170901",
            bayid: "A1",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170849"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "A2",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170843"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "A3",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170851"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "A4",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170852"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "A5",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170900"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "A6",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170357"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "A7",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170900"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_1",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165934"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_2",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165410"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_3",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170544"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_4",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170810"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_5",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170504"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_6",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170847"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_7",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170242"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_8",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170104"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_9",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165553"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_10",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "164340"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_11",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170307"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_12",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170452"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_13",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170633"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_14",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170149"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_15",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170030"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_16",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170641"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_17",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165656"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZA_18",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "164641"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_19",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170835"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_20",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170515"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_21",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170244"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_22",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170105"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_23",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170142"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_24",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170611"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_25",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170822"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_26",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170543"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_27",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170228"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_28",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165915"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_29",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170706"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_30",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170626"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_31",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170324"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_32",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165658"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZB_33",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170821"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_34",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165741"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_35",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170247"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_36",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170435"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_37",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "151535"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_38",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170711"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_39",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165651"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_40",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "164918"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_41",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170629"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_42",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170433"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_43",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "164856"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_44",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165007"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_45",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165141"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_46",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "163409"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_47",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165912"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_48",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170620"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_49",
            status: "0",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170837"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_50",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "165239"
        },
        {
            date: "20160623",
            time: "170901",
            bayid: "ZC_51",
            status: "1",
            batterylevel: "0.00",
            updatedate: "20160623",
            updatetime: "170212"
        }
    ]

    var busParkingSimulatorModelObj = new busParkingSimulatorModel;
    busParkingSimulatorModelObj.recivedDateTime = new Date();
    busParkingSimulatorModelObj.busParkingArray =busParkingArray;
    busParkingSimulatorModelObj.save(function(err,result){
        if(err){
            console.log(err)
            console.log("zmqSimulatorBusParkingArray configuration saved")
            process.exit(0);
        }else{
            console.log(result)
        }

    })
};