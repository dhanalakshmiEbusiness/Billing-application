/**
 * Created by MohammedSaleem on 12/11/15.
 */

$(document).ready(function () {

    var parentEle=$("#appWrapper");
    fun={
        notificationList: function(){
            parentEle.on("click","#appHeader .notificationBtn",function (e) {
                e.stopPropagation();
                var init= $(this).data("init");

                if(init=='0'){

                    $("#contWrapper #pageCont").animate({
                        marginRight:"320px"
                    },300);

                    setTimeout(function () {
                        $(".notifications").fadeIn(0, function () {
                            $(".notifications").removeClass("bounceOutRightCustom").addClass("bounceInRightCustom");
                        });
                    },200);

                    $(this).data({
                        'init':'1'
                    }).addClass("active");

                }
                else{

                    $(".notifications").removeClass("bounceInRightCustom").addClass("bounceOutRightCustom");

                    setTimeout(function () {
                        $("#contWrapper #pageCont").animate({
                            marginRight: "0"
                        },300);
                    },300);

                    $(this).data({
                        'init':'0'
                    }).removeClass("active");

                    setTimeout(function () {
                        $(".notifications").fadeOut(0)
                    },500);
                }

            });



            parentEle.on("click",".notificationList li",function () {
                var init= $(this).data("init");

                if(init=='0'){
                    $(this).find(".actionBtn").slideDown(200);
                    $(this).data({
                        'init':'1'
                    });
                }
                else{
                    $(this).find(".actionBtn").slideUp(200);
                    $(this).data({
                        'init':'0'
                    })
                }
            });

            parentEle.on("click",".notificationList li .actionBtn .btn",function () {
                $(".notificationList li .actionBtn").slideUp(200);
                $(".notificationList li").data({
                    'init':'0'
                });
                $(this).parents().eq(2).addClass("notified");
            })

        },
        dropDown: function () {
            parentEle.on("click",".dropDown .head",function (e) {
                e.stopPropagation();
                var init= $(this).data("init");
                if(init=="0"){
                    $(this).parent().find(".list").slideDown(200);
                    $(this).data({
                        "init":"1"
                    })
                }
                else{
                    $(this).parent().find(".list").slideUp(200);
                    $(this).data({
                        "init":"0"
                    })
                }
            });
            parentEle.on("click",".dropDown .list li",function (e) {
                var value=$(this).text();
                $(this).parents().eq(1).find(".headTitle").text(value);
            })
        },
        parkingLanes: function () {
            parentEle.on("click",".parkingLanes .parkingNav .dot",function (e) {
                var index= $(this).index();
                $(".parkingLanes .parkingNav .dot").removeClass("active");
                $(this).addClass("active");
                    $(".parkingLanes ul").css({
                        transform: "translateY(-"+(index*175)+"px)"
                    })
            });
        },
        popup: function (btn,popup) {
            parentEle.on("click",btn,function (e) {
                e.stopPropagation();
                $(".background").fadeIn(300, function () {
                    //$(popup).fadeIn(300);
                    $(popup).css({
                        'visibility': 'visible'
                    });
                    $(window).trigger('resize');
                });
            });

            parentEle.on("click",".popup .close",function (e) {
                e.stopPropagation()
                //$(".popup").fadeOut(300, function () {
                //    $(".background").fadeOut(300);
                //});
                $(".popup").css({
                    'visibility': 'hidden'
                });

                setTimeout(function () {
                    $(".background").fadeOut(300);
                },200);
            });
        },
        messageBox: function (btn,msgBox) {
            parentEle.on("click",btn,function (e) {
                $(msgBox).fadeIn(200);
                setTimeout(function () {
                    $(msgBox).fadeOut(200);
                },3000)
            });
        },
        smrtUsers: function () {
            //usersTable
            parentEle.on("click",".usersTable .editBtn ",function (e) {
                e.stopPropagation();
                $(this).parents().eq(3).css({
                    transform: 'translateY(-60px)'
                })
            });
            parentEle.on("click",".usersTable .rowCont li.btns .btn",function (e) {
                e.stopPropagation();
                $(this).parents().eq(3).css({
                    transform: 'translateY(0px)'
                })
            });
        },
        statPointer: function () {
            var circle=$(".numStatsBox.circleMain");
            parentEle.on("click",".numStatsBox.circleMain",function (e) {
                e.stopPropagation();

                var width=$(this).width();
                var leftPos=$(this).position().left;

                var currentCircle=$(this).find(".animate");

                $(".numericStats .currentPointer").animate({
                    left: leftPos-((170-width)/2)
                },300, function () {
                    $(".numStatsBox.circleMain").find(".animate").removeClass("bounceCustom");
                    currentCircle.addClass("bounceCustom");
                });
            });
        },
        eldersPopup: function () {
            parentEle.on("click",".loadingLanes .elders .num",function (e) {
                $(".loadingLanes .num .associatedImg").fadeOut(0);
                $(this).find(".associatedImg").fadeIn(200)
            });
        },
        fullScreen: function () {
            parentEle.on("click",".analytics .fullScreen",function (e) {
                var init= $(this).data("init");
                if(init=="0"){
                    $(document).fullScreen(true);
                    $(this).data({
                        "init":"1"
                    }).addClass("collapse");

                    $("#contWrapper").css({
                        "min-height": "100px"
                    });
                    $("#pageCont").removeClass("admin");
                    $("#contWrapper .sideNavMain").fadeOut(100);
                }
                else{
                    $(document).fullScreen(false);
                    $(this).data({
                        "init":"0"
                    }).removeClass("collapse");

                    $("#contWrapper").css({
                        "min-height": "100%"
                    });
                    $("#pageCont").addClass("admin");
                    $("#contWrapper .sideNavMain").fadeIn(100);
                }
            });
        },
        defaultClick: function(){
            $(document).click(function () {
                //$(".notifications").removeClass("bounceInRight").addClass("bounceOutRight");
                //$("#header .notificationAlert").data({
                //    'init':'0'
                //}).removeClass("active");
                //setTimeout(function () {
                //    $(".notifications").fadeOut(0)
                //},800);


                $(".dropDown .list").slideUp(200);
                $(".mapMenu").slideUp(200);
                $(".dropDown .head").data({
                    "init":"0"
                });

                $(".notificationList .actionBtn").slideUp(200);
                $(".notificationList li").data({
                    'init':'0'
                });

                $(".popup").css({
                    'visibility': 'hidden'
                });
                setTimeout(function () {
                    $(".background").fadeOut(300);
                },200);

                $(".loadingLanes .num .associatedImg").fadeOut(0);

            })
        },
        preventDefaultClicks: function () {
            var selectors='.notificationList, .notificationList .actionBtn, .popup, .loadingLanes .num';

            parentEle.on("click",selectors,function (e) {
                e.stopImmediatePropagation()
            })
        }
    };
    fun.notificationList();
    fun.dropDown();
    fun.parkingLanes();
    fun.popup(".showMap",".popup.smrtMapMain");
    fun.popup(".newUserAccountBtn",".popup.newUsers");
    fun.popup(".usersTable li.edit .editBtn",".popup.newUsers");
    fun.popup(".usersTable li.delete .deleteBtn",".popup.DeleteUserAccount");
    fun.popup(".clearDepBtn",".popup.clearDep");
    fun.popup(".clearArrBtn",".popup.clearArr");
    //fun.popup(".loadingLanes .elders .num",".popup.eldersDetails");
    //fun.smrtUsers();
    fun.messageBox(".saveConfig",".configSaved");
    fun.eldersPopup();
    fun.statPointer();
    fun.fullScreen();
    fun.defaultClick();
    fun.preventDefaultClicks();
});
