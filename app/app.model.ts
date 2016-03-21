/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Interfaces {
    export interface ISlide {
        content: string;
        title: string;
        slideType: SlideTypeEnum;
    }

    export enum SlideTypeEnum {
        Title, //typically the first slide.  Has a large title and a sub-title
        Slide, //A strandard slide with a title and a body
        Quote, //A slide with a single statement/body
        Verse //A bible verse with a reference and a body
    }

    export interface IDisplayElementConfig {
        fontName: string;
        posX: number;
        posY: number;
        height: number;
        width: number;
    }

    export interface IProPresenterDocConfig {
        height: number;
        width: number;
        title: string;
        category: string;
        displayElementConfigs: {
            slideTitle: IDisplayElementConfig;
            slideContent: IDisplayElementConfig;
        }
    }
}