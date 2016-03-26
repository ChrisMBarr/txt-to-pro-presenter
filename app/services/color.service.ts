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
    }

    angular
        .module(appModuleName)
        .service("colorService", ColorService);
}