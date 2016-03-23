/// <reference path="app-typings.d.ts" />
namespace TxtToPp{
    export const appModuleName = 'txtToProApp';
    const app = angular.module(appModuleName, []);
    app.config(['$compileProvider', function ($compileProvider) {
        //Must allow the blob type to be concidered safe
        //http://stackoverflow.com/a/16514741
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }]);
}