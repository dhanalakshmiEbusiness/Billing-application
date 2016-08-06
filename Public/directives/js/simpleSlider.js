/**
 * Created by MohammedSaleem on 04/05/16.
 */
(function () {

    var areaGraph = angular.module('simpleJQSlider', []);

    var link = function (scope, element, attribute) {
        $(element).find(".simpleSlider").slider({
            min: scope.min,
            max: scope.max,
            animate: true,
            slide: function( event, ui ) {
                $(scope.val).val($(this).slider( "value" ));
                $(scope.val).text($(this).slider( "value" ));
            },
            change: function( event, ui ) {
                $(scope.val).val($(this).slider( "value" ));
                $(scope.val).text($(this).slider( "value" ));
            }
        });
        var initVal=$( ".simpleSlider" ).slider( "value" );
        $(scope.val).val(initVal);
        $(scope.val).text(initVal);

    };

    areaGraph.directive('simpleSlider', function () {
        return {
            templateUrl: 'directives/templates/simpleSlider.html',
            link: link,
            scope: {
                min: "=",
                max: "=",
                val: "="
            }
        }
    });


})();
