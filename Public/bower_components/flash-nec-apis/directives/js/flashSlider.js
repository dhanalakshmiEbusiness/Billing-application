/**
 * Created by MohammedSaleem on 16/05/16.
 */

(function () {

    var flashSliderUI = angular.module('flashSliderUI', []);

    var link = function (scope, element, attribute) {


        var flashSliderMain = $(element).find(".flashSliderMain");
        var flashSliderCont = $(element).find(".flashSliderCont");
        var flashSliderBox = $(element).find(".flashSliderBox");
        var flashSliderLabels = $(element).find(".flashSliderLabels");
        var label,labelWidth;

        //...... data for date slider.......

        var currentYear = moment().year();
        var currentMonth = moment().month() + 1;
        var currentDay = moment().date();
        var currentHour = moment().hour();
        var numberOfDays = moment(currentYear + "-" + currentMonth, "YYYY-MM").daysInMonth();


        var flashSliderFun = {
            addTimeLabels: function () {
                for (i = 1; i <= 24; i++) {
                    var timeLabel = '<div class="label">' + i + '</div>';
                    $(timeLabel).appendTo(flashSliderLabels);
                }
                $('<span class="clear"></span>').appendTo(flashSliderLabels);


                labelWidth = flashSliderLabels.find(".label").first().width();
                var labelLength = flashSliderLabels.find(".label").length;
                var flashSliderBoxWidth = flashSliderBox.width();
                var flashSliderLabelsWidth = labelWidth * labelLength;

                //.... Add flashSliderLabels length.....
                flashSliderLabels.css({
                    width: flashSliderLabelsWidth
                });

                //.... slide to the current time Label for first time.....

                if ((labelLength - currentHour) * labelWidth > flashSliderBoxWidth) {
                    flashSliderLabels.animate({
                        left: -(currentHour - 2) * labelWidth
                    })
                }
                else {
                    flashSliderLabels.animate({
                        left: -(flashSliderLabelsWidth - flashSliderBoxWidth)
                    })
                }
            },
            addDateLabels: function () {
                for (i = 1; i <= numberOfDays; i++) {
                    var timeLabel = '<div class="label">' + i + '</div>';
                    $(timeLabel).appendTo(flashSliderLabels);
                }
                $('<span class="clear"></span>').appendTo(flashSliderLabels);


                labelWidth = flashSliderLabels.find(".label").first().width();
                var labelLength = flashSliderLabels.find(".label").length;
                var flashSliderBoxWidth = flashSliderBox.width();
                var flashSliderLabelsWidth = labelWidth * labelLength;

                //.... Add flashSliderLabels length.....
                flashSliderLabels.css({
                    width: flashSliderLabelsWidth
                });

                //.... slide to the current date Label for first time.....

                if ((labelLength - currentDay) * labelWidth > flashSliderBoxWidth) {
                    flashSliderLabels.animate({
                        left: -(currentDay - 2) * labelWidth
                    })
                }
                else {
                    flashSliderLabels.animate({
                        left: -(flashSliderLabelsWidth - flashSliderBoxWidth)
                    })
                }
            },
            construct: function () {
                var type = scope.type;

                switch (type) {
                    case 'time':
                    {
                        flashSliderMain.addClass("timeSlider");

                        // ..... adding time labels ......
                        this.addTimeLabels();

                        //.... add current time on currentTime label ......
                        $('<div class="currentTime">00:00</div>').appendTo(flashSliderLabels)
                            .css({
                                width: labelWidth
                            });

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

                        //.... add current time on currentTime label ......
                        $('<div class="rangeSelector"></div>').appendTo(flashSliderLabels)
                            .css({
                                width: labelWidth
                            });

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
                                    startElement = ($(this).position().left / labelWidth);
                                    endElement = (startElement + ($(this).width() / labelWidth));

                                    //.... highlight range.......
                                    label.removeClass("selected");
                                    for (var i = startElement; i < endElement; i++) {
                                        label.eq(i).addClass("selected");
                                    }
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
                                    startElement = ($(this).position().left / labelWidth);
                                    endElement = (startElement + ($(this).width() / labelWidth));

                                    //.... highlight range.......
                                    label.removeClass("selected");
                                    for (var i = startElement; i < endElement; i++) {
                                        label.eq(i).addClass("selected");
                                    }
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

                    /*$(".flashSliderMain.calendar .calendarBox input").datepicker({
                        dateFormat: "dd-mm-yy",
                        disable:true,
                        dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"]
                    }).datepicker("setDate", new Date());*/

                }
            },
            init: function () {
                flashSliderFun.construct();
                flashSliderFun.dragSlider();
                flashSliderFun.addAttributes();
            }
        };

        flashSliderFun.init();


    };

    flashSliderUI.directive('flashSlider', function () {
        return {
            templateUrl: 'bower_components/flash-nec-apis/directives/templates/flashSlider.html',
            link: link,
            scope: {
                type: '@',
                callbackOnRangeSelection: '&',
                callbackOnSelection: '&',
                navigation: '@',
                calendar: '@'

            }
        }
    });


})();