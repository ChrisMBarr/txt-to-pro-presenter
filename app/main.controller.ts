/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Controllers {
    export class MainController {

        public static $inject = ["proPresenterDocService"]

        constructor(private proPresenterDocService: Services.ProPresenterDocService) { }

        //Start with an empty slide showing
        public slides: Interfaces.ISlide[] = [
            {
                content: "2 Samuel 13-18",
                title: "Lessons in Suffering: David and Absalom",
                slideType: Interfaces.SlideTypeEnum.Title
            },
            {
                content: "",
                slideType: Interfaces.SlideTypeEnum.Slide,
                title: "I. David in the Palace"
            },
            {
                content: "",
                slideType: Interfaces.SlideTypeEnum.Slide,
                title: "II. David in the Wilderness"
            },
            {
                content: `A. Humility
    1. He had to face the truth about himself
    2. He had to face the truth that his basic identity was not king but sinner
B. Prayer
      Psalm 55:12-14, 20-21; Psalm 3
C. Compassion`,
                slideType: Interfaces.SlideTypeEnum.Slide,
                title: "In the wilderness David recovered:"
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
            height: 720,
            title: "test",
            width: 1280
        };

    }

    angular
        .module(appModuleName)
        .controller("mainController", MainController)
}