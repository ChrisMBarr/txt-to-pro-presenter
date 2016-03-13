/// <reference path="../typings/main.d.ts" />
var appModuleName = 'txtToProApp';
var appModule = angular.module(appModuleName, []);
/// <reference path="../typings/main.d.ts" />
/// <reference path="app.config.ts" />
/// <reference path="slide.model.ts" />
var TxtToPp;
(function (TxtToPp) {
    var Controllers;
    (function (Controllers) {
        var MainController = (function () {
            function MainController() {
                var _this = this;
                //Start with an empty slide showing
                this.slides = [{
                        content: ""
                    }];
                this.addSlide = function () {
                    _this.slides.push({
                        content: ""
                    });
                };
                this.removeSlide = function (slide) {
                    _this.slides.splice(_this.slides.indexOf(slide), 1);
                };
            }
            return MainController;
        }());
        angular
            .module(appModuleName)
            .controller("mainController", MainController);
    })(Controllers = TxtToPp.Controllers || (TxtToPp.Controllers = {}));
})(TxtToPp || (TxtToPp = {}));
