/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Controllers {
    export class MainController {

        public static $inject = ["proPresenterDocService"]

        constructor(private proPresenterDocService: Services.ProPresenterDocService) { }

        //Start with an empty slide showing
        public slides: Interfaces.ISlide[] = [
            {
                content: "2 Samuel 13-18",
                title: "Lessons in Suffering: David and Absalom"
            },
            {
                content: "",
                title: "I. David in the Palace"
            },
            {
                content: "",
                title: "II. David in the Wilderness"
            },
            {
                content: `A. Humility
    1. He had to face the truth about himself
    2. He had to face the truth that his basic identity was not king but sinner
B. Prayer
      Psalm 55:12-14, 20-21; Psalm 3
C. Compassion`,
                title: "In the wilderness David recovered:"
            }
        ];

        public addSlide = () => {
            this.slides.push({
                title: "",
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
        private fileConfig:Interfaces.IProPresenterDocConfig={
          category:"Speaker Notes",
          height:720,
          title:"test",
          width:1280
        };

    }

    angular
        .module(appModuleName)
        .controller("mainController", MainController)
}