/**
 * Created by MohammedSaleem on 17/05/16.
 */

(function () {

    var areaGraph= angular.module('flashGraphUI',[]);

    var link= function (scope, element, attribute) {

        // ...... Setting some default values ......

        if(!scope.legendHorAlign){
            scope.legendHorAlign="left";
        }
        if(!scope.legendVerAlign){
            scope.legendVerAlign="top";
        }
        if(!scope.prefixY){
            scope.prefixY="";
        }
        if(!scope.suffixY){
            scope.suffixY="";
        }
        if(!scope.seriesWidth){
            scope.seriesWidth=2;
        }
        if(!scope.seriesMarker){
            scope.seriesMarker=false;
        }
        if(!scope.colors){
            scope.colors=['#33b154', '#87aff5', '#f9b343', '#e87294', '#5bc3c2'];
        }
        if(!scope.gridWidthX){
            scope.gridWidthX=1;
        }
        if(!scope.gridWidthY){
            scope.gridWidthY=1;
        }
        if(scope.noGrid){
            scope.gridWidthX=0;
            scope.gridWidthY=0;
        }
        if(!scope.tickWidth){
            scope.tickWidth=1;
        }
        if(!scope.baseLineX){
            scope.baseLineX=1;
        }
        if(!scope.gridLineColor){
            scope.gridLineColor='#dddddd';
        }
        if(!scope.labelColor){
            scope.labelColor='#838f9d';
        }
        if(!scope.labelSize){
            scope.labelSize=12;
        }
        if(!scope.fontFamily){
            scope.fontFamily='robotoregular';
        }
        if(!scope.titleX){
            scope.titleX='';
        }
        if(!scope.titleY){
            scope.titleY='';
        }

        // ..... Adjust the margin of the graph .....

        if(scope.noMargin){
            scope.marginLeft=0;
            scope.marginRight=0;
            scope.marginTop=0;
            scope.marginBottom=0;
        }
        else {
            if(scope.labelY && !scope.marginLeft){
                scope.marginLeft=60;
            }
            if(!scope.labelY && !scope.marginLeft){
                scope.labelY=false;
                scope.marginLeft=10;
            }
            if(!scope.marginRight){
                scope.marginRight=15;
            }
            if(scope.legend && !scope.marginTop){
                scope.marginTop=60;
            }
            if(!scope.legend && !scope.marginTop){
                scope.marginTop=20;
            }
            if(scope.labelX && !scope.marginBottom){
                scope.marginBottom=30;
            }
            if(!scope.labelX && !scope.marginBottom){
                scope.labelX=false;
                scope.marginBottom=10;
            }
        }

        // ..... if no additional feature is added then it will be empty ....
        if (!scope.additionalFeatures){
            scope.additionalFeatures={}
        }


        $(element).find(".flashGraph").highcharts(Highcharts.merge(scope.additionalFeatures,{
            chart: {
                type: scope.type,
                backgroundColor: 'transparent',
                marginLeft:scope.marginLeft,
                marginRight:scope.marginRight,
                marginTop:scope.marginTop,
                marginBottom:scope.marginBottom
            },
            legend: {
                enabled: scope.legend,
                align: scope.legendHorAlign,
                verticalAlign: scope.legendVerAlign,
                layout: 'horizontal',
                borderRadius: scope.legendBorRadius,
                borderWidth: scope.legendBorWidth,
                borderColor: scope.legendBorColor,
                itemDistance: scope.legendDistance,
                itemWidth: scope.legendWidth,
                itemStyle: {
                    color: '#595959',
                    fontFamily: scope.fontFamily
                },
                symbol: 'circle',
                symbolHeight: 12,
                symbolWidth: 12,
                symbolRadius: 6,
                useHTML: true
            },
            title: {
                text: ''
            },

            xAxis: {
                categories: scope.x,
                title: {
                    text: scope.titleX,
                    align: 'high'
                },
                gridLineWidth: scope.gridWidthX,
                gridLineColor: scope.gridLineColor,
                labels:
                {
                    style: {
                        color: scope.labelColor,
                        fontFamily: scope.fontFamily,
                        fontSize: scope.labelSize+'px'
                    },
                    enabled: scope.labelX
                },
                tickColor:scope.gridLineColor,
                tickWidth: scope.tickWidth,
                lineColor: scope.gridLineColor,
                lineWidth: scope.baseLineX
            },
            yAxis: {
                title: {
                    text: scope.titleY,
                    align: 'high'
                },
                gridLineWidth: scope.gridWidthY,
                gridLineColor: scope.gridLineColor,
                useHTML: true,
                labels: {
                    style: {
                        color: scope.labelColor,
                        fontFamily: scope.fontFamily,
                        fontSize: scope.labelSize+'px'
                    },
                    formatter: function () {
                        return scope.prefixY+ this.value + scope.suffixY ;
                    },
                    enabled: scope.labelY
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.1
                },
                area: {
                    fillOpacity: 0.1
                },
                column: {
                    stacking: scope.columnStack,
                    borderWidth: 0
                },
                series: {
                    lineWidth: scope.seriesWidth,
                    fillColor: scope.seriesFillColor,
                    useHTML: true,
                    marker: {
                        // fillColor: '#FFFFFF',
                        // lineWidth: 1,
                        // lineColor: '#525b62',
                        symbol: 'circle',
                        enabled: scope.seriesMarker
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    borderRadius: scope.barRadius,
                    pointWidth: scope.barWidth
                }

            },
            series: scope.y,
            colors: scope.colors
        }));

    };

    areaGraph.directive('flashGraph', function () {
        return {
            templateUrl: 'bower_components/flash-nec-apis/directives/templates/flashGraph.html',
            link: link,
            scope:{
                type:"@",  //spline,line,areaspline,area,column
                x:"=",
                y:"=",
                legend:"@",
                legendHorAlign:"@",
                legendVerAlign:"@",
                legendBorRadius:"@",
                legendBorWidth:"@",
                legendBorColor:"@",
                legendDistance:"@",
                legendWidth:"@",
                noGrid:"@",
                gridWidthX:"@",
                gridWidthY:"@",
                gridLineColor:"@",
                seriesWidth:"@",
                seriesFillColor:"@",
                seriesMarker:"@",
                tickWidth:"@",
                baseLineX:"@",
                baseLineY:"@",
                prefixY:"@",
                suffixY:"@",
                colors: "=",
                labelX:"=",
                labelY:"=",
                titleX:"@",
                titleY:"@",
                labelColor:"@",
                labelSize:"@",
                fontFamily:"@",
                columnStack:"@", // if pass as value normal multiple series will be in a single column else all the series will be in separate column
                barRadius:"@",
                barWidth:"@",
                marginLeft:"@",
                marginRight:"@",
                marginTop:"@",
                marginBottom:"@",
                noMargin:"@",
                additionalFeatures: '='    //$scope.additional={subtitle: {text: 'Source: Wikipedia.org'}};
            }
        }
    });


})();
