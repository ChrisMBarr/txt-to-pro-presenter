/// <reference path="../app-typings.d.ts" />
namespace TxtToPp.Widgets {

    interface IColorPickerScope extends angular.IScope {
        color: Interfaces.IRgbColor;
        title: string;
        hexColor: string;
        id: string;
        hasColorSupport: boolean;
    }
    
    function colorPickerDirective($window: angular.IWindowService, colorService: Services.ColorService): angular.IDirective {
        
        function supportsColorInput(): boolean {
            const i = $window.document.createElement("input");
            i.setAttribute("type", "color");
            return i.type !== "text";
        }
        
        function linkFn($scope: IColorPickerScope): void {
            //Generate a random ID
            $scope.id = `color-${Math.random().toString(36).substr(2, 5)}`;
            
            $scope.hasColorSupport = supportsColorInput();
            
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
        <div class="col-xs-6 col-sm-3" ng-if="::hasColorSupport">
            <input type="color" class="form-control" ng-model="hexColor" ng-attr-id="{{::id}}">
        </div>
        <div ng-class="hasColorSupport ? 'col-xs-6 col-sm-9' : 'col-xs-12'">
            <input type="text" class="form-control" ng-model="hexColor" ng-attr-id="{{::(hasColorSupport ? '' : id)}}">
        </div>    
    </div>
</div>`
        };
    }

    colorPickerDirective.$inject = ["$window", "colorService"];

    angular
        .module(appModuleName)
        .directive("angColorPicker", colorPickerDirective);
}