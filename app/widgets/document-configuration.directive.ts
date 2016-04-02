/// <reference path="../app-typings.d.ts" />
namespace TxtToPp.Widgets {

    interface IDocumentConfigScope extends angular.IScope {
        config: TxtToPp.Interfaces.IProPresenterDocConfig;
    }

    function documentConfigurationDirective($window: angular.IWindowService, colorService: Services.ColorService): angular.IDirective {

        const storageKey = "documentConfig";
        const db = $window.localStorage;

        function linkFn($scope: IDocumentConfigScope): void {
            //If the browser support localStorage, save any changes to the configuration there
            let savedConfig: TxtToPp.Interfaces.IProPresenterDocConfig = undefined;
            if (db) {

                let savedFileConfigStr = db.getItem(storageKey);
                if (savedFileConfigStr) {
                    //parse the string of JSON data back to a real object.
                    savedConfig = JSON.parse(savedFileConfigStr);
                }

                //Deep watch this object for changes
                $scope.$watch("config", (val: TxtToPp.Interfaces.IProPresenterDocConfig) => {
                    if (val) {
                        //save it as a string
                        db.setItem(storageKey, JSON.stringify(val));
                    }
                }, true);
            }

            if (savedConfig) {
                $scope.config = savedConfig;
            } else {
                //Our default settings if nothing was saved
                $scope.config = {
                    category: "Speaker Notes",
                    /* tslint:disable: object-literal-sort-keys */
                    bgColor: { r: 8, g: 58, b: 119 },
                    /* tslint:enable: object-literal-sort-keys */
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
            }
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

    documentConfigurationDirective.$inject = ["$window", "colorService"];

    angular
        .module(appModuleName)
        .directive("angDocumentConfiguration", documentConfigurationDirective);
}