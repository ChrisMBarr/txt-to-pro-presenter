/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Interfaces {
    'use strict';

    export interface ISlide {
        content: string;
        title: string;
        slideType: SlideTypeEnum;
    };

    export enum SlideTypeEnum {
        Title, //typically the first slide.  Has a large title and a sub-title
        Slide, //A strandard slide with a title and a body
        Quote, //A slide with a single statement/body
        Verse //A bible verse with a reference and a body
    };

    export interface IDisplayElementConfig {
        color: IRgbColor;
        fontName: string;
        posX: number;
        posY: number;
        height: number;
        width: number;
    };

    export interface IProPresenterDocConfig {
        height: number;
        width: number;
        title: string;
        category: string;
        bgColor: IRgbColor;
        displayElementConfigs: {
            slideTitle: IDisplayElementConfig;
            slideContent: IDisplayElementConfig;
        };
    };

    export interface IRgbColor {
        r: number;
        g: number;
        b: number;
    };
}