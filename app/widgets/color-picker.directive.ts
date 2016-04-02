/// <reference path="../app-typings.d.ts" />
namespace TxtToPp.Widgets {

    interface IColorPickerScope extends angular.IScope {
        color: Interfaces.IRgbColor;
        title: string;
        hexColor: string;
        id: string;
    }

    function colorPickerDirective(colorService: Services.ColorService): angular.IDirective {

        function linkFn($scope: IColorPickerScope): void {
            //Generate a random ID
            $scope.id = `color-${Math.random().toString(36).substr(2, 5)}`;
            
            const colorWatcher = $scope.$watch("color", () => {
                //Initially convert the color once it has it's initial value set
                $scope.hexColor = colorService.rgbToHexColor($scope.color);
                //Stop watching
                colorWatcher();    
            });
                        
            //Watch the HEX values for changes and update it to an RGB color
            $scope.$watch("hexColor", (val: string) => {
                if (val) {
                    $scope.color = colorService.hexToRgbColor(val);
                }
            });
        }

        return {
            link: linkFn,
            restrict: "E",
            scope: {
                color: "=",
                title: "@"
            },
            template: `<div class="form-group">
    <label ng-attr-for="{{::id}}">{{title}}</label>
    <div class="row">
        <div class="col-xs-6 col-sm-3">
            <input type="color" ng-attr-id="{{::id}}" class="form-control" ng-model="hexColor">
        </div>
        <div class="col-xs-6 col-sm-9">
            <input type="text" class="form-control" ng-model="hexColor">
        </div>    
    </div>
</div>`
        };
    }

    colorPickerDirective.$inject = ["colorService"];

    angular
        .module(appModuleName)
        .directive("angColorPicker", colorPickerDirective);
}