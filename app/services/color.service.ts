/// <reference path="../app-typings.d.ts" />
namespace TxtToPp.Services {
    'use strict';

    export class ColorService {

        //constructor() { }

        public hexToRgbColor = (hex: string): Interfaces.IRgbColor => {
            hex = hex.replace('#', '');
            return {
                /* tslint:disable: object-literal-sort-keys */
                r: (parseInt(hex.substring(0, 2), 16) || 0),
                g: (parseInt(hex.substring(2, 4), 16) || 0),
                b: (parseInt(hex.substring(4, 6), 16) || 0)
                /* tslint:enable: object-literal-sort-keys */
            };
        };

        public rgbToHexColor = (rgbColor: Interfaces.IRgbColor): string => {
            let r = ("0" + rgbColor.r.toString(16)).slice(-2);
            let g = ("0" + rgbColor.g.toString(16)).slice(-2);
            let b = ("0" + rgbColor.b.toString(16)).slice(-2);
            return `#${r}${g}${b}`;
        };

        public rgbToFloatRgbaColor = (rgbColor: Interfaces.IRgbColor): string => {
            //Example input `{r:8,g:58,b:119}`
            //Example output: `0.0313725508749485 0.2274509817361832 0.4666666686534882 1"`
            //Always return at 100% opacity
            return `${this.byteToFloat(rgbColor.r)} ${this.byteToFloat(rgbColor.g)} ${this.byteToFloat(rgbColor.b)} 1`;
        };

        public floatRgbaToRgbColor = (rgbaFloatColor: string): Interfaces.IRgbColor => {
            //Example input: `0.0313725508749485 0.2274509817361832 0.4666666686534882 1"`
            //Example output `{r:8,g:58,b:119}`
            //we ignore the opacity value
            const colorParts = rgbaFloatColor.split(" ");
            return {
                /* tslint:disable: object-literal-sort-keys */
                r: this.floatToByte(parseFloat(colorParts[0])),
                g: this.floatToByte(parseFloat(colorParts[1])),
                b: this.floatToByte(parseFloat(colorParts[2]))
                /* tslint:enable: object-literal-sort-keys */
            };
        };

        private floatToByte = (f: number): number => {
            //Would convert: `0.0313725508749485` to `8`
            const f2 = Math.max(0, Math.min(1, f));
            return Math.floor(f2 * 255);
        };
        
        private byteToFloat = (b: number): number => {
            //Would convert: `8` to `0.0313725508749485`
            const b2 = Math.max(0, Math.min(255, b));
            return b2 === 255 ? 1 : b2 / 255;
        };
    }

    angular
        .module(appModuleName)
        .service("colorService", ColorService);
}