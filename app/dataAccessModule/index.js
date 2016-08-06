/**
 * Created by Suhas on 2/17/2016.
 */
var save = require('./saveDataToDb'),
        retrieve=require('./dataRetriever');
module.exports={
        save:save,
        retrieve:retrieve
}