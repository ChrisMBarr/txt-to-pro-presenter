/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Controllers {
    'use strict';
    
    export class MainController {

        public static $inject = ["$window", "proPresenterDocService"];

        constructor(private $window:angular.IWindowService, private proPresenterDocService: Services.ProPresenterDocService) { }
        
        public fileContents = "#";
        
        //TODO: Expose this in the UI
        public fileConfig: Interfaces.IProPresenterDocConfig = {
            category: "Speaker Notes",
            displayElementConfigs: {
                slideContent: {
                    /* tslint:disable: object-literal-sort-keys */
                    color: { r: 255, g: 255, b: 255 },
                    /* tslint:enable: object-literal-sort-keys */
                    fontName: "Futura-Medium",
                    height: 1182.772,
                    posX: 56.26352,
                    posY: 145,
                    width: 319.1484
                },
                slideTitle: {
                    /* tslint:disable: object-literal-sort-keys */
                    color: { r: 255, g: 255, b: 255 },
                    /* tslint:enable: object-literal-sort-keys */
                    fontName: "Futura-Medium",
                    height: 1221.908,
                    posX: 29.04599,
                    posY: 2,
                    width: 118.6807
                }
            },
            height: 720,
            title: "test",
            width: 1280
        };

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
            let ppFile = this.proPresenterDocService.makeFile(this.fileConfig, this.slides);
            var blob = new Blob([ ppFile ], { type : 'text/xml' });
            this.fileContents = this.$window.URL.createObjectURL( blob );
        };
    }

    angular
        .module(appModuleName)
        .controller("mainController", MainController);
}