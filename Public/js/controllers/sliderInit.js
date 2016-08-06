/**
 * Created by MohammedSaleem on 19/02/16.
 */

smrt.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});



smrt.controller("sliderCont", function ($scope,$state,$rootScope) {

    //$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    //
    //    alert("hi")
    //});


    //$scope.test= function () {
    //    console.log("test")
    //}

    //$scope.slickConfig = {
    //    dots: true,
    //    slide:'li'
    //};

    $scope.sliderInit= function () {

        //if($rootScope.admin!==true){
            $('.parkingLanesCont ul').slick({
                //slide:'li',
                //cssEase: 'ease',
                //slidesToShow: 21,
                //infinite: false,
                //initialSlide: 0,
                //draggable: true,
                //slidesToScroll: 13,
                //speed: 500,
                //arrows: false,
                //
                //dots: true,
                //customPaging: function(slider, i) {
                //    // this example would render "tabs" with titles
                //    return '';
                //},
                //dotsClass: 'parkingNav'

            });
        //}

    };
    //$scope.sliderInit()
});