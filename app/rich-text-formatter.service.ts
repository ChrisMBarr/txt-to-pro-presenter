/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Services {
    'use strict';

    export class RichTextFormatterService {

        //constructor() { }

        public makeRtfData = (displayElementConfig: Interfaces.IDisplayElementConfig, content: string): string => {
            //NOTE: We must escape the slashes here!  RTF data normally only has the one slashe to separate each data item.
            //TODO: Figure out how to chnage font size
            //TODO: Figure out how to change bullet colors
            return `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1404\\cocoasubrtf340
\\cocoascreenfonts1{\\fonttbl\\f0\\fnil\\fcharset0 ${displayElementConfig.fontName};}
{\\colortbl;\\red${displayElementConfig.color.r}\\green${displayElementConfig.color.g}\\blue${displayElementConfig.color.b};}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural

\\f0\\fs180 \\cf1 ${content}}`;
        };
    }

    angular
        .module(appModuleName)
        .service("richTextFormatterService", RichTextFormatterService);
}