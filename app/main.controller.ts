/// <reference path="../typings/main.d.ts" />
/// <reference path="app.config.ts" />
/// <reference path="slide.model.ts" />
namespace TxtToPp.Controllers {
    class MainController {

        constructor() { }

        //Start with an empty slide showing
        public slides: Interfaces.ISlide[] = [{
            content:""
        }];

        public addSlide = () => {
            this.slides.push({
                content:""
            });
        };
        
        public removeSlide = (slide) => {
            this.slides.splice(this.slides.indexOf(slide),1);
        };

    }

    angular
        .module(appModuleName)
        .controller("mainController", MainController)
}