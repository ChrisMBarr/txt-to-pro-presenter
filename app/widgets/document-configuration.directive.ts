/// <reference path="../app-typings.d.ts" />
namespace TxtToPp.Widgets {
    'use strict';

    interface IDocumentConfigScope extends angular.IScope {
        config: TxtToPp.Interfaces.IProPresenterDocConfig;
        titleColorHex: string;
        contentColorHex: string;
    }

    function documentConfigurationDirective(colorService: Services.ColorService): angular.IDirective {

        function linkFn($scope: IDocumentConfigScope): void {
            $scope.titleColorHex = "";
            $scope.contentColorHex = "";
            
            //Our default settings
            $scope.config = {
                category: "Speaker Notes",
                displayElementConfigs: {
                    slideContent: {
                        /* tslint:disable: object-literal-sort-keys */
                        color: { r: 255, g: 255, b: 255 },
                        /* tslint:enable: object-literal-sort-keys */
                        fontName: "Futura-Medium",
                        height: 319.1484,
                        posX: 56.26352,
                        posY: 145,
                        width: 1182.772
                    },
                    slideTitle: {
                        /* tslint:disable: object-literal-sort-keys */
                        color: { r: 255, g: 255, b: 255 },
                        /* tslint:enable: object-literal-sort-keys */
                        fontName: "Futura-Medium",
                        height: 118.6807,
                        posX: 29.04599,
                        posY: 2,
                        width: 1221.908
                    }
                },
                height: 720,
                title: "test",
                width: 1280
            };

            //Initially convert these colors
            $scope.titleColorHex = colorService.rgbToHexColor($scope.config.displayElementConfigs.slideTitle.color);
            $scope.contentColorHex = colorService.rgbToHexColor($scope.config.displayElementConfigs.slideContent.color);

            //Watch these HEX values for changes and update them to RGB colors
            $scope.$watch("titleColorHex", (val: string) => {
                if (val) {
                    $scope.config.displayElementConfigs.slideTitle.color = colorService.hexToRgbColor(val);
                }
            });

            $scope.$watch("contentColorHex", (val: string) => {
                if (val) {
                    $scope.config.displayElementConfigs.slideContent.color = colorService.hexToRgbColor(val);
                }
            });
        }

        return {
            link: linkFn,
            restrict: "E",
            scope: {
                config: "="
            },
            templateUrl: "app/widgets/document-configuration.tmpl.html"
        };
    }

    documentConfigurationDirective.$inject = ["colorService"];

    angular
        .module(appModuleName)
        .directive("angDocumentConfiguration", documentConfigurationDirective);
}