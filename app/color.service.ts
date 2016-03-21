/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Services {
    'use strict';
    
    export class ColorService {

        //constructor() { }

        public hexToRgbColor = (hex: string): Interfaces.IRgbColor => {
            hex = hex.replace('#', '');
            return {
                /* tslint:disable: object-literal-sort-keys */
                r: parseInt(hex.substring(0, 2), 16),
                g: parseInt(hex.substring(2, 4), 16),
                b: parseInt(hex.substring(4, 6), 16)
                /* tslint:enable: object-literal-sort-keys */
            };
        };
    }

    angular
        .module(appModuleName)
        .service("colorService", ColorService);
}