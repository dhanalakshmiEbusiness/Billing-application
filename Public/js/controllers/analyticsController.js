/**
 * Created by MohammedSaleem on 17/02/16.
 */

smrt.controller("analyticsController", function ($scope,loadingOccupancyInfoService,busEntryExitService,busLotService,settingsService) {
    $scope.historicalGraphDataValues = {/*$scope.historicalGraphDataValues.bertIndex*/
        parameterLabel:'LOADING BERTH',
        parameterSelected:'busEntryExit',
        seriesSelected:15,
        seriesLabel:15,
        seriesParameter:'min',
        bertIndex:1/*,
        'loadingBerth':{
            services:loadingOccupancyInfoService,
            chartUpdateType:updateMultipleSeriesOfAGraph,
            yAxis:'Occupancy (in %)',
            legendProperties:{
                value:['Queue'],
                incremental:true
            },
            primaryChartLabel:"Queue Occupancy",
            secondaryChartLabel:"Elderly Area Occupancy"
        }*/,
        'elderlyLoadingBerth':{
            services:loadingOccupancyInfoService,
            chartUpdateType:updateSingleSeriesOfAGraph,
            yAxis:'Occupancy (in %)',
            legendProperties:{
                value:['Berth'],
                incremental:true
            },
            primaryChartLabel:"Queue Occupancy",
            secondaryChartLabel:"Elderly Area Occupancy"
        },
        'busEntryExit':{
            services:busEntryExitService,
            chartUpdateType:updateMultipleSeriesOfAGraph,
            yAxis:"No Of Taxi's",
            legendProperties:{
                value:['Taxi Entry','Taxi Exit'],
                incremental:false
            },
            primaryChartLabel:"Taxi Entry And  Exit",
            secondaryChartLabel:"Elderly Area Occupancy"
        },
        'busParking':{
            services:busLotService,
            chartUpdateType:updateSingleSeriesOfAGraph,
            yAxis:'Count (Occupied)',
            legendProperties:{
                value:['Taxi Parking'],
                incremental:true
            },
            primaryChartLabel:"Taxi Parking",
            secondaryChartLabel:"Maintainence Bay"
        },
        bertIndexFlag:true,
        elderlyGraphFlag:false,
        chartDetails:{
            label:"Line Graph",
            type:'line',
            graphSeriesColors:['#d6e586', '#7edd83', '#f9b343', '#e87294', '#5bc3c2'],
            chart1Label:"Taxi Entry And  Exit",
            chart2Label:"Elderly Area Occupancy",
            chart1Data:'',
            chart2Data:''
        },
        loaderStatus:{
            chartOne:false,
            chartTwo:false
        },
        scaleMeasurement:"Count",
        scaleIndexFlag:"false"
    }

    $scope.tab="unloading";

    $scope.changeTab= function (val) {
        $scope.tab=val;
    };

    $scope.timeX=['8:00', '9:30', '11:00', '12:30', '14:00','15:30','17:00','18:30','8:00', '9:30', '11:00', '12:30', '14:00','15:30','17:00','18:30'];
    $scope.timeY=[{
            name: 'lane1',
            data:[80, 60, 70, 65, 75,55,35,75,80, 60, 70, 65, 75,55,35,75]
        },{
            name: 'lane2',
            data:[50, 30, 20, 55, 45,65,30,65,60, 40, 20, 45, 85,35,25,45]
        },{
            name: 'lane3',
            data:[30, 40, 60, 45, 55,45,65,35,40, 20, 50, 35, 45,65,55,35]
        }];
    var array= new Array(60);
    array.fill(null);
    /*$scope.queueX=['8:00', '9:00', '10:00', '11:00', '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];*/
    $scope.queueY=[{
        name: 'Queue1',
        data: array
    },{
        name: 'Queue2',
        data: array
    },{
        name: 'Queue3',
        data: array
    }];

    /*$scope.eldersX=['8:00', '9:00', '10:00', '11:00', '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00'];
     */$scope.eldersY=[{
        data: array
    }];

    $scope.ageX=['6-15', '16-25', '26-35', '36-45', '46-65','66-100'];
    $scope.ageY=[{
        data: [80, 60, 70, 65, 75, 55]
    }];


    $scope.additionalFeatures={
        tooltip: {
            shared: false,
            valueSuffix: '',
            formatter: function() {
                var seriesTitle=this.point.series.yAxis.axisTitle.textStr;
                var xSeriesTitle=this.point.series.xAxis.axisTitle.textStr;
                var scale="";
                var xAxisScale=''
                if(seriesTitle=="Occupancy (in %)"){/*Speed(km/hr)*/
                    scale="%"
                }
                else if(seriesTitle=="Count"){/*Flow(vehicles/hr)*/
                    scale=""
                }
                else if(seriesTitle=="Count (Occupied)"){/*Flow(vehicles/hr)*/
                    scale=""
                }
                if(xSeriesTitle=="Time"){/*Speed(km/hr)*/
                    xAxisScale="Hours"
                }
                else if(xSeriesTitle=="Date"){/*Flow(vehicles/hr)*/
                    xAxisScale=""
                }

                var actualTime="";
                 if(this.point.actualTime==null|| this.point.actualTime=="undefined"){
                 actualTime=this.key;
                 }
                 else{
                 actualTime= this.point.actualTime;
                 }

                return xSeriesTitle+': <b>' + actualTime + ' '+xAxisScale+', </b> <br> '+this.point.series.yAxis.axisTitle.textStr+': <b>' + this.y + ' '+ scale +'</b>';
            }
        }
    };


    $scope.barColors=['#4894cf'];
    $scope.setParameterForHistoricalData= function(parameterSelected,status){
        $scope.historicalGraphDataValues.parameterSelected=parameterSelected;
        $scope.historicalGraphDataValues.busEntryExit.status=status;
        $scope.historicalGraphDataValues.chartDetails.chart1Label=$scope.historicalGraphDataValues
            [$scope.historicalGraphDataValues.parameterSelected].primaryChartLabel;
        $scope.historicalGraphDataValues.chartDetails.chart2Label=$scope.historicalGraphDataValues
            [$scope.historicalGraphDataValues.parameterSelected].secondaryChartLabel;
        getDataForHistoricalGraph();
    }
    $scope.setSeriesLengthForHistoricalData= function(seriesSelected,seriesScale){
        $scope.historicalGraphDataValues.seriesSelected=seriesSelected;
        $scope.historicalGraphDataValues.seriesParameter = seriesScale;
        getDataForHistoricalGraph();
    }
    $scope.setBerthIndexForHistoricalData= function(bertIndex){
        $scope.historicalGraphDataValues.bertIndex=bertIndex;
        getDataForHistoricalGraph();

    }
    $scope.chartTypeUpdate = function (type, container, graph) {
        //var chart=$(container).find(graph).highcharts();
        var chart = $(container).find(graph).each(function () {
            var chart = $(this).highcharts();
            var seriesLen = chart.series.length;
            for (i = 0; i < seriesLen; i++) {
                chart.series[i].update({
                    type: type
                });
            }
        });
    };
    $scope.setGraphTitle = function(chartLabel,chartType){
        $scope.historicalGraphDataValues.chartDetails.type=chartType;
        $scope.historicalGraphDataValues.chartDetails.label=chartLabel;
    }
    $scope.setScaleForHistoricalData = function(){
        var chart1 = $("#historicalChart .flashGraph").highcharts();
        var chart2 = $("#elderlyChart .flashGraph").highcharts();
        var chart1Data = $scope.historicalGraphDataValues.chartDetails.chart1Data;
        var chart2Data = $scope.historicalGraphDataValues.chartDetails.chart2Data;
        for(var i=0;i<chart1Data.length;i++){
            chart1Data[i]=Math.round(chart1Data[i]*1.72);
            if(i==chart1Data.length-1){
                $scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].chartUpdateType(chart1,chart1Data);
            }
        }
        for(var j=0;i<chart2Data.length;i++){
            chart2Data[j]=Math.round(chart2Data[j]*1.72);
            if(j==chart2Data.length-1){
                $scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].chartUpdateType(chart2,chart1Data);
            }
        }
    }
    function getDataForHistoricalGraph(){
        var data={
            seriesSelected:$scope.historicalGraphDataValues.seriesSelected,
            bertIndex:$scope.historicalGraphDataValues.bertIndex,
            status:$scope.historicalGraphDataValues.busEntryExit.status,
        }
        $scope.historicalGraphDataValues.loaderStatus.chartOne=true;
        $scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].services.
        getHistoricalData(data).then(function(result){
            if(result){
                $scope.historicalGraphDataValues.loaderStatus.chartOne=false;
                updateHistoricalGraph(result.data);
            }
        })
        if($scope.historicalGraphDataValues.parameterSelected==='loadingBerth'){
            $scope.historicalGraphDataValues.loaderStatus.chartTwo=true;
            getDataForElderly();
            $scope.historicalGraphDataValues.bertIndexFlag=true;
            $scope.historicalGraphDataValues.elderlyGraphFlag=true;
        }else{
            $scope.historicalGraphDataValues.bertIndexFlag=false;
            $scope.historicalGraphDataValues.elderlyGraphFlag=false;
        }
    }
    function divideTimeRangeIn60Part(noOfMinutes) {
        var labels=[];
        var interval = 60;
        var totalSeconds = noOfMinutes*60;
        var inc= totalSeconds/interval;
        var rightNow = moment()
        //var nowString = rightNow.format('MMMM Do YYYY, h:mm:ss a');
        var timeFormat = 'h:mm:ss';
        if($scope.historicalGraphDataValues.seriesParameter==='month'){
            timeFormat='D/M/YYYY'
        }
        var inPast = rightNow.subtract(totalSeconds, 'seconds')
        for (var i = 0; i<interval ; i++){
            var label = inPast.add(inc,'second').format(timeFormat)
            labels.push(label);
            if(i==interval-1){
                $scope.eldersX = labels;
                $scope.queueX=labels;
            }
        }
        return labels;
    }
    function getDataForElderly(){
        var data={
            seriesSelected:$scope.historicalGraphDataValues.seriesSelected,
            bertIndex:$scope.historicalGraphDataValues.bertIndex
        }
        loadingOccupancyInfoService.getElderlyHistoricalData(data).then(function(result){
            $scope.historicalGraphDataValues.loaderStatus.chartTwo=false;
            updateElderlyHistoricalGraph(result.data);
        })
    }
    function updateHistoricalGraph(data){
        var chart1 = $("#historicalChart .flashGraph").highcharts();
        var chart2 = $("#elderlyChart .flashGraph").highcharts();
        if($scope.historicalGraphDataValues.parameterSelected==='busParking'){
            $scope.historicalGraphDataValues.elderlyGraphFlag=true;
            $scope.historicalGraphDataValues.scaleIndexFlag=true;
            if(chart1){
                $scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].chartUpdateType(chart1,data.busParking.occupied);
                $scope.historicalGraphDataValues.chartDetails.chart1Data =data.busParking.occupied;
            }
            if(chart2){
                $scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].chartUpdateType(chart2,data.unloadingBayData.occupied);
                $scope.historicalGraphDataValues.chartDetails.chart2Data =data.unloadingBayData.occupied;
            }
        }else{
            $scope.historicalGraphDataValues.scaleIndexFlag=false;
            if (chart1) {
                $scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].chartUpdateType(chart1,data);
                $scope.historicalGraphDataValues.chartDetails.chart1Data =data;
            }
        }

    }
    function updateElderlyHistoricalGraph(data){
        var chart = $("#elderlyChart .flashGraph").highcharts();
        if (chart) {
            updateSingleSeriesOfAGraph(chart,data)
        }
    }
    function updateSingleSeriesOfAGraph(chart,data){
        var labelX = divideTimeRangeIn60Part($scope.historicalGraphDataValues.seriesSelected);
        /*chart.showLoading()*/
        var xAxisTitle = 'Time';
        if($scope.historicalGraphDataValues.seriesParameter==='month'){
            xAxisTitle='Date';
        }
        chart.xAxis[0].setTitle({ text:xAxisTitle});
        /*chart.showLoading('Loading');*/
        chart.yAxis[0].setTitle({ text:$scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].yAxis });
        chart.yAxis[0].update({type: "datetime"});
        chart.xAxis[0].setCategories(labelX);
        for(var i=0;i<chart.series.length;i++){
            while (chart.series.length > 0) {
                chart.series[i].remove();
            }
        }
        if(chart.series.length==0){
            chart.addSeries({data:data});/*,colour:$scope.historicalGraphDataValues.chartDetails.graphSeriesColors[0]*/
        }
        $scope.chartTypeUpdate($scope.historicalGraphDataValues.chartDetails.type,'.flashGraphMain','.flashGraph')

    }
    function updateMultipleSeriesOfAGraph(chart,data){
        var labelX = divideTimeRangeIn60Part($scope.historicalGraphDataValues.seriesSelected);
        var xAxisTitle = 'Time';
        if($scope.historicalGraphDataValues.seriesParameter==='month'){
            xAxisTitle='Date';
        }
        chart.xAxis[0].setTitle({ text:xAxisTitle});
        chart.yAxis[0].setTitle({ text:$scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].yAxis });
        chart.xAxis[0].setCategories(labelX);
        chart.yAxis[0].update({type: "datetime"});
        for(var i=0;i<chart.series.length;i++){
            while (chart.series.length > 0) {
                chart.series[i].remove();
            }
        }
        loadingOccupancyInfoService.getRouteNoByBethIndex($scope.historicalGraphDataValues.bertIndex,function(routeArray){
            if(chart.series.length==0){
                for(var j=0;j<data.length;j++){
                    var k = j+1;
                    var label='';
                    var labelPre = '';
                    if($scope.historicalGraphDataValues.parameterSelected==='loadingBerth'){
                        /*labelPre="(routeNo:"+routeArray[j]+")";*/
                    }
                    if($scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].legendProperties.incremental){
                        label=$scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].legendProperties.value+" "+k+labelPre;
                    }else{
                        label=$scope.historicalGraphDataValues[$scope.historicalGraphDataValues.parameterSelected].legendProperties.value[j]+labelPre
                    }
                    chart.addSeries({name:label,data: data[j]});/*,colour:$scope.historicalGraphDataValues.chartDetails.graphSeriesColors[j]*/
                }

            }
            $scope.chartTypeUpdate($scope.historicalGraphDataValues.chartDetails.type,'.flashGraphMain','.flashGraph')
        });

    }
    function getRouteNoForLoadingOccupancy(){
        settingsService.getRouteNoForLoadingOccupancyQueue().then(function(result){
            loadingOccupancyInfoService.setRouteNoArray(result.data)
            getDataForHistoricalGraph();
        })
    }
    function init(){
        divideTimeRangeIn60Part($scope.historicalGraphDataValues.seriesSelected);
        getRouteNoForLoadingOccupancy();
    }
    init();
});




