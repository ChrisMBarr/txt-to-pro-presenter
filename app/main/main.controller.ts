/// <reference path="../app-typings.d.ts" />
namespace TxtToPp.Controllers {
    'use strict';
    
    const fileExt = "pro5";

    export class MainController {

        public static $inject = ["$window", "proPresenterDocService"];

        constructor(
            private $window: angular.IWindowService,
            private proPresenterDocService: Services.ProPresenterDocService) {   }

        public fileContents = "#";
        public fileName = `file.${fileExt}`;
        
        //This is filled in from the directive
        public docConfig: Interfaces.IProPresenterDocConfig = undefined;

        //Start with an empty slide showing
        public slides: Interfaces.ISlide[] = [
            {
                content: "Title Slide Content",
                slideType: Interfaces.SlideTypeEnum.Title,
                title: "Title Slide Title"
            },
            {
                content: "Standard Slide Conent",
                slideType: Interfaces.SlideTypeEnum.Slide,
                title: "Standard Slide Title"
            }
        ];

        public slideTypes: { key: Interfaces.SlideTypeEnum; text: string; }[] = [
            {
                key: Interfaces.SlideTypeEnum.Slide,
                text: "Standard Slide"
            },
            {
                key: Interfaces.SlideTypeEnum.Title,
                text: "Title Slide"
            },
            {
                key: Interfaces.SlideTypeEnum.Quote,
                text: "Quote Slide"
            },
            {
                key: Interfaces.SlideTypeEnum.Verse,
                text: "Bible Verse"
            }
        ];

        public addSlide = () => {
            this.slides.push({
                content: "",
                slideType: Interfaces.SlideTypeEnum.Slide,
                title: ""
            });
        };

        public removeSlide = (slide: Interfaces.ISlide) => {
            this.slides.splice(this.slides.indexOf(slide), 1);
        };

        public generateFile = () => {
            const ppFile = this.proPresenterDocService.makeFile(this.docConfig, this.slides);
            const blob = new Blob([ppFile], { type: 'text/xml' });
            this.fileContents = this.$window.URL.createObjectURL(blob);
            this.fileName = `${this.docConfig.title.replace(/\s/g, "-")}.${fileExt}`;
        };
    }

    angular
        .module(appModuleName)
        .controller("mainController", MainController);
}