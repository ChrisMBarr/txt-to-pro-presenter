/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Controllers {
    export class MainController {

        public static $inject = ["proPresenterDocService"]

        constructor(private proPresenterDocService: Services.ProPresenterDocService) { }

        //Start with an empty slide showing
        public slides: Interfaces.ISlide[] = [
            {
                content: "Title Slide Content",
                title: "Title Slide Title",
                slideType: Interfaces.SlideTypeEnum.Title
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
                title: "",
                slideType: Interfaces.SlideTypeEnum.Slide,
                content: ""
            });
        };

        public removeSlide = (slide: Interfaces.ISlide) => {
            this.slides.splice(this.slides.indexOf(slide), 1);
        };

        public getFile = () => {
            //TODO: Download the file instead of log it out
            console.info(this.proPresenterDocService.makeFile(this.fileConfig, this.slides));
        };

        //TODO: Expose this in the UI
        private fileConfig: Interfaces.IProPresenterDocConfig = {
            category: "Speaker Notes",
            fontName: "Futura-Medium",
            height: 720,
            title: "test",
            width: 1280
        };

    }

    angular
        .module(appModuleName)
        .controller("mainController", MainController)
}