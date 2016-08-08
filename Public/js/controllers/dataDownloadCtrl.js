/**
 * Created by MohammedSaleem on 09/03/16.
 */

taxiFleetManager.controller("dataDownload", function ($scope) {
    var datePicker=$(".datepicker");

    datePicker.datepicker({
        dateFormat: "dd-mm-yy",
        dayNamesMin: [ "S", "M", "T", "W", "T", "F", "S" ]
    });

    datePicker.datepicker("setDate", new Date());

});