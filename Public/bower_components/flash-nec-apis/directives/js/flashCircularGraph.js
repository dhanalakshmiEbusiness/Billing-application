/**
 * Created by MohammedSaleem on 30/05/16.
 */

(function () {

    var circleGauge = angular.module('flashCircularGraphUI', []);

    var link = function (scope, element, attribute) {

        // ..... to change the data type value based on the graph type .....
        var data;
        var enableToolTip;
        if (scope.type=='solidgauge'){
            $(element).find(".circularGraph").addClass("solidGaugeCircle");
            data=[{
                radius: 95,
                innerRadius: 75,
                color: scope.gaugeCircleColor,
                y: scope.value
            }];
            enableToolTip=false
        }
        else if (scope.type=='pie'){
            $(element).find(".circularGraph").addClass("pieCircle");
            data=scope.value;
            enableToolTip=true
        }

        // ..... suffix will be empty if not defined ....
        if(!scope.suffix){
            scope.suffix="";
        }
        // ..... prefix will be empty if not defined ....
        if(!scope.prefix){
            scope.prefix="";
        }

        // ..... default colors if colors defined ....
        if(!scope.colors){
            scope.colors=['#00b8f1', '#81de97', '#f9b343', '#e87294', '#5bc3c2'];
        }
        // ..... default colors for gauge Background if gaugeBackgroundColor not defined ....
        if(!scope.gaugeBackgroundColor){
            scope.gaugeBackgroundColor='#354456';
        }
        // ..... default font color ....
        if(!scope.fontColor){
            scope.fontColor='#6b6b6b';
        }
        // ..... default colors for gauge Background if gaugeBackgroundColor not defined ....
        if(!scope.pieFontSize){
            scope.pieFontSize=10;
        }

        // .... adjust the y value on circle for solid guage ....
        var solidGuageY=0;
        if(!scope.gaugeName){
            solidGuageY=-18;
            scope.gaugeName=""
        }
        else{
            var name=scope.gaugeName.trim();
            if (name!==""){
                solidGuageY=-35
            }
        }

        if (!scope.additionalFeatures){
            scope.additionalFeatures={}
        }

        $(element).find(".circularGraph").highcharts(Highcharts.merge(scope.additionalFeatures,{
            chart: {
                type: scope.type,
                backgroundColor: 'transparent',
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: -20
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>',

                formatter: function () {
                    return this.key + ': <b>' + this.y + scope.suffix + '</b>';
                },
                enabled: enableToolTip
            },
            pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: 0,
                endAngle: 360,
                background: {
                    backgroundColor: scope.gaugeBackgroundColor,   //'#354456',
                    innerRadius: '75%',
                    outerRadius: '95%',
                    borderWidth: 0,
                    shape: 'arc'
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                showFirstLabel:false,
                showLastLabel:false,
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                labels: {
                    enabled: false
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y:solidGuageY,
                        borderWidth: 0,
                        useHTML: true,
                        color: scope.fontColor,
                        style: {
                            fontFamily: 'robotoregular',
                            fontSize: scope.fontSize+'px'
                        },
                        format: '<div class="roboLight solidGuageLabel" style="text-align: center"><span class="guageVal">'+scope.prefix +'{y}'+scope.suffix+'</span><br><span class="smallTitle gaugeName">'+scope.gaugeName+'</span></div>'
                    }
                },
                pie: {
                    size: '55%',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        distance: 10,
                        style: {
                            textShadow: 'none',
                            fontFamily: 'robotoregular',
                            fontWeight: 'normal',
                            fontSize: scope.fontSize+'px',
                            color: scope.fontColor
                        },
                        formatter: function () {
                            return scope.prefix + this.y + scope.suffix + '<br>' + this.key;
                        }

                    },
                    startAngle: 0,
                    endAngle: 360,
                    center: ['50%', '50%']
                },
                series: {
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
            series: [{
                innerSize: '80%',
                data: data
            }],
            colors: scope.colors,
            credits: {
                enabled: false
            }
        }));
    };

    circleGauge.directive('flashCircularGraph', function () {
        return {
            templateUrl: 'bower_components/flash-nec-apis/directives/templates/circularGraph.html',
            link: link,
            scope: {
                type:"@",  // 'solidgauge, pie'
                value: "=",
                suffix: "@",
                prefix: "@",
                colors:'=',
                gaugeName:'@',
                gaugeBackgroundColor: '@',
                gaugeCircleColor: '@',
                fontSize: '@',
                fontColor:'@',
                additionalFeatures: '='    //$scope.additional={subtitle: {text: 'Source: Wikipedia.org'}};
            }
        }
    });


})();
