/**
 * Created by MohammedSaleem on 17/05/16.
 */

(function () {

    var flashSliderUI = angular.module('flashSliderGraphUI', []);

    var link = function (scope, element, attribute) {

        // $(document).click(function () {
        //    $(".highcharts-series-group,.highcharts-grid,.highcharts-xaxis-labels").css({
        //        transform:'translate(120px,0)'
        //    });
        //    // $(".highcharts-series-group").translate(70,70);
        // });



        var flashSliderMain = $(element).find(".flashSliderMain");
        var flashSliderCont = $(element).find(".flashSliderCont");
        var flashSliderBox = $(element).find(".flashSliderBox");
        var flashSliderLabels = $(element).find(".flashSliderLabels");
        var label,labelWidth,labelLength;

        //...... data for date slider.......

        var currentYear = moment().year();
        var currentMonth = moment().month() + 1;
        var currentDay = moment().date();
        var currentHour = moment().hour();
        var numberOfDays = moment(currentYear + "-" + currentMonth, "YYYY-MM").daysInMonth();

        //.... select the current Column in graph ....
        var currentGraphColumn;


        var flashSliderFun = {
            addTimeLabels: function () {
                currentGraphColumn=currentHour;

                for (i = 1; i <= 24; i++) {
                    var timeLabel = '<div class="label">' + i + '</div>';
                    $(timeLabel).appendTo(flashSliderLabels);
                }
                $('<span class="clear"></span>').appendTo(flashSliderLabels);


                labelWidth = flashSliderLabels.find(".label").first().width();
                labelLength = flashSliderLabels.find(".label").length;
                // var flashSliderBoxWidth = flashSliderBox.width();
                // var flashSliderLabelsWidth = labelWidth * labelLength;

                //.... Add flashSliderLabels length.....
                // flashSliderLabels.css({
                //     width: flashSliderLabelsWidth
                // });

                //.... slide to the current time Label for first time.....

                // if ((labelLength - currentHour) * labelWidth > flashSliderBoxWidth) {
                //     flashSliderLabels.animate({
                //         left: -(currentHour - 2) * labelWidth
                //     })
                // }
                // else {
                //     flashSliderLabels.animate({
                //         left: -(flashSliderLabelsWidth - flashSliderBoxWidth)
                //     })
                // }
            },
            addDateLabels: function () {
                currentGraphColumn=currentDay;

                for (i = 1; i <= numberOfDays; i++) {
                    var timeLabel = '<div class="label">' + i + '</div>';
                    $(timeLabel).appendTo(flashSliderLabels);
                }
                $('<span class="clear"></span>').appendTo(flashSliderLabels);

                labelWidth = flashSliderLabels.find(".label").first().width();
                labelLength = flashSliderLabels.find(".label").length;
                // var flashSliderBoxWidth = flashSliderBox.width();
                // var flashSliderLabelsWidth = labelWidth * labelLength;

                // //.... Add flashSliderLabels length.....
                // flashSliderLabels.css({
                //     width: flashSliderLabelsWidth
                // });
                //
                // //.... slide to the current date Label for first time.....
                //
                // if ((labelLength - currentDay) * labelWidth > flashSliderBoxWidth) {
                //     flashSliderLabels.animate({
                //         left: -(currentDay - 2) * labelWidth
                //     })
                // }
                // else {
                //     flashSliderLabels.animate({
                //         left: -(flashSliderLabelsWidth - flashSliderBoxWidth)
                //     })
                // }
            },
            construct: function () {
                var type = scope.sliderType;

                switch (type) {
                    case 'time':
                    {
                        flashSliderMain.addClass("timeSlider");

                        // ..... adding time labels ......
                        this.addTimeLabels();
                        labelWidth = flashSliderLabels.width()/labelLength;

                        //.... add current time on currentTime label ......
                        $('<div class="currentTime">00:00</div>').appendTo(flashSliderLabels);

                        //..... displaying current time......
                        var addCurrentTime = function () {
                            var currentHour = (moment().hour()) < 9 ? "0" + (moment().hour()) : (moment().hour());
                            var currentMinute = (moment().minute()) < 9 ? "0" + (moment().minute()) : (moment().minute());

                            flashSliderBox.find(".currentTime").animate({
                                left: (currentHour - 1) * labelWidth
                            }, 300)
                                .text(currentHour + " : " + currentMinute);
                        };

                        setInterval(function () {
                            addCurrentTime();
                        }, 1000);
                    }
                        break;

                    case 'selectTime':
                    {
                        flashSliderMain.addClass("selectTimeSlider");


                        // ..... adding time labels ......
                        this.addTimeLabels();
                        labelWidth = flashSliderLabels.width()/labelLength;

                        //.... add current time on currentTime label ......
                        $('<div class="currentTime">00:00</div>').appendTo(flashSliderLabels)
                            .css({
                                width: labelWidth
                            });

                        //..... displaying current time......
                        var addCurrentTime = function () {
                            var currentHour = (moment().hour()) < 9 ? "0" + (moment().hour()) : (moment().hour());

                            flashSliderBox.find(".currentTime").animate({
                                left: (currentHour - 1) * labelWidth
                            }, 300)
                                .text(currentHour);

                            console.log(labelWidth)
                        };
                        addCurrentTime();

                        // $(element).find(".flashSliderMain")
                        //....... select hour Functionality.......
                        $("body").on("click", ".selectTimeSlider .label", function () {
                            var labelIndex = $(this).index();
                            $(this).parent().find(".currentTime").animate({
                                left: (labelIndex) * labelWidth
                            }, 150).text(labelIndex + 1);

                            if (scope.callbackOnSelection()) {
                                scope.callbackOnSelection()(labelIndex + 1)
                            }
                        })
                    }
                        break;

                    case 'timeRange':
                    {
                        flashSliderMain.addClass("timeRangeSlider");

                        // ..... adding time labels ......
                        this.addTimeLabels();
                        label = flashSliderLabels.find(".label");
                        labelWidth = flashSliderLabels.width()/labelLength;

                        //.... add current time on currentTime label ......
                        $('<div class="rangeSelector"></div>').appendTo(flashSliderLabels);

                        // $('<div class="rangeSelector"></div>').appendTo(flashSliderLabels)
                        // .css({
                        //     width: labelWidth
                        // });

                        //..... resize bar added and current label selected......
                        var startElement, endElement;
                        flashSliderBox.find(".rangeSelector").animate({
                            left: (currentHour - 1) * labelWidth
                        }, 300)
                            .resizable({
                                containment: "parent",
                                grid: [labelWidth, 0],
                                handles: "e, w",
                                resize: function (event, ui) {
                                    startElement = (Math.round($(this).position().left / labelWidth));
                                    endElement = (Math.round(startElement + ($(this).width() / labelWidth)));

                                    //.... highlight range.......
                                    label.removeClass("selected");
                                    for (var i = startElement; i < endElement; i++) {
                                        label.eq(i).addClass("selected");
                                    }


                                    var chart=$(element).find(".flashGraph").highcharts();

                                    chart.xAxis[0].removePlotBand('selectedArea');
                                    chart.xAxis[0].addPlotBand({
                                        from: startElement+0.5,
                                        to: endElement+0.5,
                                        color: scope.plotBandColor,
                                        id: 'selectedArea'
                                    });

                                },
                                stop: function (event, ui) {

                                    if (scope.callbackOnRangeSelection()) {
                                        scope.callbackOnRangeSelection()(startElement + 1, endElement)
                                    }
                                }
                            });

                        label.eq(currentHour - 1).addClass("selected");
                    }
                        break;

                    case 'date':{
                        flashSliderMain.addClass("dateSlider");
                        // ..... adding time labels ......
                        this.addDateLabels();

                        //.... add current time on currentTime label ......
                        $('<div class="currentDate">00</div>').appendTo(flashSliderLabels)
                            .css({
                                width: labelWidth
                            });

                        //..... displaying current time......
                        var addCurrentDate = function () {
                            flashSliderBox.find(".currentDate").animate({
                                left: (currentDay - 1) * labelWidth
                            }, 300)
                                .text(currentDay);
                        };
                        addCurrentDate();
                    }
                        break;

                    case 'selectDate':{
                        flashSliderMain.addClass("selectDateSlider");

                        // ..... adding time labels ......
                        this.addDateLabels();

                        //.... add current time on currentTime label ......
                        $('<div class="currentTime">00:00</div>').appendTo(flashSliderLabels)
                            .css({
                                width: labelWidth
                            });

                        //..... displaying current time......
                        var addCurrentTime = function () {
                            flashSliderBox.find(".currentTime").animate({
                                left: (currentDay - 1) * labelWidth
                            }, 300)
                                .text(currentDay);
                        };
                        addCurrentTime();

                        //....... select hour Functionality.......
                        $("body").on("click", ".selectDateSlider .label", function () {
                            var labelIndex = $(this).index();
                            $(this).parent().find(".currentTime").animate({
                                left: (labelIndex) * labelWidth
                            }, 150).text(labelIndex + 1);
                            if (scope.callbackOnSelection()) {
                                scope.callbackOnSelection()(labelIndex + 1)
                            }
                        })
                    }
                        break;

                    case 'dateRange':{
                        flashSliderMain.addClass("dateRangeSlider");

                        // ..... adding time labels ......
                        this.addDateLabels();
                        label = flashSliderLabels.find(".label");

                        //.... add current time on currentTime label ......
                        $('<div class="rangeSelector"></div>').appendTo(flashSliderLabels)
                            .css({
                                width: labelWidth
                            });

                        //..... resize bar added and current label selected......
                        var startElement, endElement;
                        flashSliderBox.find(".rangeSelector").animate({
                            left: (currentDay - 1) * labelWidth
                        }, 300)
                            .resizable({
                                containment: "parent",
                                grid: [labelWidth, 0],
                                handles: "e, w",
                                resize: function (event, ui) {
                                    startElement = (Math.round($(this).position().left / labelWidth));
                                    endElement = (Math.round(startElement + ($(this).width() / labelWidth)));

                                    //.... highlight range.......
                                    label.removeClass("selected");
                                    for (var i = startElement; i < endElement; i++) {
                                        label.eq(i).addClass("selected");
                                    }


                                    var chart=$(element).find(".flashGraph").highcharts();

                                    chart.xAxis[0].removePlotBand('selectedArea');
                                    chart.xAxis[0].addPlotBand({
                                        from: startElement+0.5,
                                        to: endElement+0.5,
                                        color: scope.plotBandColor,
                                        id: 'selectedArea'
                                    });
                                },
                                stop: function (event, ui) {

                                    if (scope.callbackOnRangeSelection()) {
                                        scope.callbackOnRangeSelection()(startElement + 1, endElement)
                                    }
                                }
                            });

                        label.eq(currentDay - 1).addClass("selected");
                    }
                        break;
                }
            },
            dragSlider: function () {
                flashSliderLabels.draggable({
                    axis: "x",
                    stop: function (event, ui) {

                        var labelWidth = flashSliderLabels.find(".label").first().width();
                        var labelLength = flashSliderLabels.find(".label").length;
                        var flashSliderBoxWidth = flashSliderBox.width();
                        var flashSliderLabelsWidth = labelWidth * labelLength;

                        var leftVal = $(this).position().left;
                        var maxDragLeft = flashSliderLabelsWidth - flashSliderBoxWidth;
                        if (leftVal > 0) {
                            flashSliderLabels.animate({
                                left: 0
                            }, 300)
                        }
                        else if (leftVal < -(maxDragLeft)) {
                            flashSliderLabels.animate({
                                left: -maxDragLeft
                            }, 300)
                        }

                        console.log(maxDragLeft)
                    }
                })
            },
            addAttributes: function () {
                if (scope.navigation) {
                    var leftNav = '<div class="leftNav nav"></div>';
                    var rightNav = '<div class="rightNav nav"></div>';

                    flashSliderMain.addClass("navigation");
                    $(leftNav).prependTo(flashSliderCont);
                    $(rightNav).appendTo(flashSliderCont);

                }
                if (scope.calendar) {
                    var calendar = '<div class="calendarBox"><input type="text" value="17-05-2016"></div>';

                    flashSliderMain.addClass("calendar");
                    $(calendar).prependTo(flashSliderMain);

                    $(".flashSliderMain.calendar .calendarBox input").datepicker({
                        dateFormat: "dd-mm-yy",
                        dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"]
                    }).datepicker("setDate", new Date());

                }
            },
            init: function () {
                flashSliderFun.construct();
                flashSliderFun.dragSlider();
                flashSliderFun.addAttributes();
            }
        };

        flashSliderFun.init();



        //............. graph section...........

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
        if(!scope.baseLineY){
            scope.baseLineY=1;
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
        if(!scope.plotBandColor){
            scope.plotBandColor="#f6f6f6";
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

        if (!scope.additionalFeatures){
            scope.additionalFeatures={}
        }

        $(element).find(".flashGraph").highcharts(Highcharts.merge(scope.additionalFeatures,{
            chart: {
                type: scope.graphType,
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
                    text: scope.titleY,
                    align: 'high'
                },
                //lineWidth:0,
                gridLineWidth: scope.gridWidthX,
                gridLineColor: scope.gridLineColor,
                labels:
                {
                    style: {
                        color: scope.labelColor,
                        fontFamily: scope.fontFamily,
                        fontSize: scope.labelSize+'px'
                    },
                    enabled: scope.labelX,
                    useHTML: true
                },
                tickColor:scope.gridLineColor,
                tickWidth: scope.tickWidth,
                lineColor: scope.gridLineColor,
                lineWidth: scope.baseLineX,
                plotBands: [{ // mark the weekend
                    color: '#f6f6f6',
                    from: currentGraphColumn-0.5,
                    to: currentGraphColumn+0.5,
                    id: 'selectedArea'
                }]
            },
            yAxis: {
                title: {
                    text: scope.titleY,
                    align: 'low'
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
                    enabled: scope.labelY,
                    useHTML: true
                },
                lineColor: scope.gridLineColor,
                lineWidth: scope.baseLineY
            },
            tooltip: {
                shared: true,
                useHTML: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.1,
                    pointStart: 1
                },
                area: {
                    fillOpacity: 0.1,
                    pointStart: 1
                },
                spline:{
                    pointStart: 1
                },
                line:{
                    pointStart: 1
                },
                column: {
                    stacking: scope.columnStack,
                    borderWidth: 0,
                    pointStart: 1
                },
                series: {
                    lineWidth: scope.seriesWidth,
                    fillColor: scope.seriesFillColor,
                    useHTML: true,
                    marker: {
                        fillColor: '#FFFFFF',
                        lineWidth: 1,
                        lineColor: '#525b62',
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

    flashSliderUI.directive('flashSliderGraph', function () {
        return {
            templateUrl: 'bower_components/flash-nec-apis/directives/templates/flashSliderGraph.html',
            link: link,
            scope: {
                sliderType: '@',
                callbackOnRangeSelection: '&',
                callbackOnSelection: '&',
                navigation: '@',
                calendar: '@',

                graphType:"@",  //spline,line,areaspline,area,column
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
                plotBandColor:"@",
                additionalFeatures: '='    //$scope.additional={subtitle: {text: 'Source: Wikipedia.org'}};
            }
        }
    });


})();