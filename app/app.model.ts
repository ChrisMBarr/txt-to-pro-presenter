/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Interfaces {
    export interface ISlide {
        content: string;
        title: string;
    }

    export interface IProPresenterDocConfig {
        height: number;
        width: number;
        title: string;
        category: string;
    }
}