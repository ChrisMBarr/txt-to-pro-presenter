/// <reference path="app-typings.d.ts" />
var appModuleName = 'txtToProApp';
var appModule = angular.module(appModuleName, []);
/// <reference path="app-typings.d.ts" />
var TxtToPp;
(function (TxtToPp) {
    var Interfaces;
    (function (Interfaces) {
        (function (SlideTypeEnum) {
            SlideTypeEnum[SlideTypeEnum["Title"] = 0] = "Title";
            SlideTypeEnum[SlideTypeEnum["Slide"] = 1] = "Slide";
            SlideTypeEnum[SlideTypeEnum["Quote"] = 2] = "Quote";
            SlideTypeEnum[SlideTypeEnum["Verse"] = 3] = "Verse"; //A bible verse with a reference and a body
        })(Interfaces.SlideTypeEnum || (Interfaces.SlideTypeEnum = {}));
        var SlideTypeEnum = Interfaces.SlideTypeEnum;
    })(Interfaces = TxtToPp.Interfaces || (TxtToPp.Interfaces = {}));
})(TxtToPp || (TxtToPp = {}));
/// <reference path="app-typings.d.ts" />
var TxtToPp;
(function (TxtToPp) {
    var Controllers;
    (function (Controllers) {
        var MainController = (function () {
            function MainController(proPresenterDocService) {
                var _this = this;
                this.proPresenterDocService = proPresenterDocService;
                //Start with an empty slide showing
                this.slides = [
                    {
                        content: "Title Slide Content",
                        title: "Title Slide Title",
                        slideType: TxtToPp.Interfaces.SlideTypeEnum.Title
                    },
                    {
                        content: "Standard Slide Conent",
                        slideType: TxtToPp.Interfaces.SlideTypeEnum.Slide,
                        title: "Standard Slide Title"
                    }
                ];
                this.slideTypes = [
                    {
                        key: TxtToPp.Interfaces.SlideTypeEnum.Slide,
                        text: "Standard Slide"
                    },
                    {
                        key: TxtToPp.Interfaces.SlideTypeEnum.Title,
                        text: "Title Slide"
                    },
                    {
                        key: TxtToPp.Interfaces.SlideTypeEnum.Quote,
                        text: "Quote Slide"
                    },
                    {
                        key: TxtToPp.Interfaces.SlideTypeEnum.Verse,
                        text: "Bible Verse"
                    }
                ];
                this.addSlide = function () {
                    _this.slides.push({
                        title: "",
                        slideType: TxtToPp.Interfaces.SlideTypeEnum.Slide,
                        content: ""
                    });
                };
                this.removeSlide = function (slide) {
                    _this.slides.splice(_this.slides.indexOf(slide), 1);
                };
                this.getFile = function () {
                    //TODO: Download the file instead of log it out
                    console.info(_this.proPresenterDocService.makeFile(_this.fileConfig, _this.slides));
                };
                //TODO: Expose this in the UI
                this.fileConfig = {
                    category: "Speaker Notes",
                    fontName: "Futura-Medium",
                    height: 720,
                    title: "test",
                    width: 1280
                };
            }
            MainController.$inject = ["proPresenterDocService"];
            return MainController;
        }());
        Controllers.MainController = MainController;
        angular
            .module(appModuleName)
            .controller("mainController", MainController);
    })(Controllers = TxtToPp.Controllers || (TxtToPp.Controllers = {}));
})(TxtToPp || (TxtToPp = {}));
/// <reference path="app-typings.d.ts" />
var TxtToPp;
(function (TxtToPp) {
    var Services;
    (function (Services) {
        var creatorCode = "TxtToProPresenter";
        var ProPresenterDocService = (function () {
            function ProPresenterDocService() {
                var _this = this;
                this.makeFile = function (config, slides) {
                    var today = new Date();
                    return "<RVPresentationDocument height=\"" + config.height + "\" width=\"" + config.width + "\" versionNumber=\"500\" docType=\"0\" creatorCode=\"" + creatorCode + "\" lastDateUsed=\"" + today.toISOString() + "\" usedCount=\"0\" category=\"" + config.category + "\" resourcesDirectory=\"\" backgroundColor=\"0 0 0 1\" drawingBackgroundColor=\"0\" notes=\"\" artist=\"\" author=\"\" album=\"\" CCLIDisplay=\"0\" CCLIArtistCredits=\"\" CCLISongTitle=\"" + config.title + "\" CCLIPublisher=\"\" CCLICopyrightInfo=\"" + today.getFullYear() + "\" CCLILicenseNumber=\"\" chordChartPath=\"\">\n    <timeline timeOffSet=\"0\" selectedMediaTrackIndex=\"0\" unitOfMeasure=\"60\" duration=\"0\" loop=\"0\">\n        <timeCues containerClass=\"NSMutableArray\" />\n        <mediaTracks containerClass=\"NSMutableArray\" />\n    </timeline>\n    <bibleReference containerClass=\"NSMutableDictionary\" />\n    <arrangements containerClass=\"NSMutableArray\" />\n    <_-RVProTransitionObject-_transitionObject transitionType=\"-1\" transitionDuration=\"1\" motionEnabled=\"0\" motionDuration=\"20\" motionSpeed=\"100\" />\n    <groups containerClass=\"NSMutableArray\">\n        " + _this.getSlidesXmlString(config, slides) + "\n    </groups>\n</RVPresentationDocument>";
                };
                this.getSlidesXmlString = function (config, slides) {
                    var groupUuid = _this.generateUuid();
                    var slideGroup = "<RVSlideGrouping name=\"\" uuid=\"" + groupUuid + "\" color=\"0 1 1 1\" serialization-array-index=\"2\">\n            <slides containerClass=\"NSMutableArray\">";
                    for (var _i = 0, slides_1 = slides; _i < slides_1.length; _i++) {
                        var s = slides_1[_i];
                        slideGroup += _this.createSlide(config, s, groupUuid);
                    }
                    slideGroup += "            </slides>\n                    </RVSlideGrouping>";
                    return slideGroup;
                };
                this.createSlide = function (config, slide, groupId) {
                    var bgImgPath = "file://localhost/Users/chrisbarr/Documents/Projects/Calvary/new%20logos/Pixel%20Reveal/Sermon%20Background%20(720p).jpg";
                    var displaySlide = "<RVDisplaySlide backgroundColor=\"0.0313725508749485 0.2274509817361832 0.4666666686534882 1\" enabled=\"1\" highlightColor=\"0 0 0 0\" hotKey=\"\" label=\"\" notes=\"\" slideType=\"1\" sort_index=\"2\" UUID=\"" + _this.generateUuid() + "\" drawingBackgroundColor=\"1\" chordChartPath=\"\" serialization-array-index=\"0\">\n                    <cues containerClass=\"NSMutableArray\">\n                        <RVMediaCue displayName=\"Sermon Background (720p).jpg\" delayTime=\"0\" timeStamp=\"0\" enabled=\"1\" UUID=\"" + _this.generateUuid() + "\" parentUUID=\"" + groupId + "\" elementClassName=\"RVImageElement\" behavior=\"1\" alignment=\"4\" serialization-array-index=\"0\">\n                            <element displayDelay=\"0\" displayName=\"Sermon Background (720p).jpg\" locked=\"0\" persistent=\"0\" typeID=\"0\" fromTemplate=\"0\" bezelRadius=\"0\" drawingFill=\"0\" drawingShadow=\"0\" drawingStroke=\"0\" fillColor=\"1 1 1 1\" rotation=\"0\" source=\"" + bgImgPath + "\" flippedHorizontally=\"0\" flippedVertically=\"0\" scaleFactor=\"1\" serializedImageOffset=\"0.000000@0.000000\" serializedFilters=\"YnBsaXN0MDDUAQIDBAUIFhdUJHRvcFgkb2JqZWN0c1gkdmVyc2lvblkkYXJjaGl2ZXLRBgdUcm9vdIABowkKD1UkbnVsbNILDA0OViRjbGFzc1pOUy5vYmplY3RzgAKg0hAREhNYJGNsYXNzZXNaJGNsYXNzbmFtZaMTFBVeTlNNdXRhYmxlQXJyYXlXTlNBcnJheVhOU09iamVjdBIAAYagXxAPTlNLZXllZEFyY2hpdmVyCBEWHygyNTo8QEZLUl1fYGVueX2MlJ2iAAAAAAAAAQEAAAAAAAAAGAAAAAAAAAAAAAAAAAAAALQ=\" scaleBehavior=\"3\" brightness=\"0\" contrast=\"1\" saturation=\"1\" hue=\"0\" manufactureURL=\"\" manufactureName=\"\" format=\"JPEG image\" enableColorFilter=\"0\" colorFilter=\"1 0 0 1\" enableBlur=\"0\" blurRadius=\"0\" enableEdgeBlur=\"0\" edgeBlurRadius=\"0\" edgeBlurArea=\"0\" enableSepia=\"0\" enableColorInvert=\"0\" enableGrayInvert=\"0\" enableHeatSignature=\"0\">\n                                <_-RVRect3D-_position x=\"0\" y=\"0\" z=\"0\" width=\"1680\" height=\"1050\" />\n                                <_-D-_serializedShadow containerClass=\"NSMutableDictionary\">\n                                    <NSMutableString serialization-native-value=\"{5, -5}\" serialization-dictionary-key=\"shadowOffset\" />\n                                    <NSNumber serialization-native-value=\"0\" serialization-dictionary-key=\"shadowBlurRadius\" />\n                                    <NSColor serialization-native-value=\"0 0 0 0.3333333432674408\" serialization-dictionary-key=\"shadowColor\" />\n                                </_-D-_serializedShadow>\n                                <stroke containerClass=\"NSMutableDictionary\">\n                                    <NSColor serialization-native-value=\"0 0 0 1\" serialization-dictionary-key=\"RVShapeElementStrokeColorKey\" />\n                                    <NSNumber serialization-native-value=\"1\" serialization-dictionary-key=\"RVShapeElementStrokeWidthKey\" />\n                                </stroke>\n                            </element>\n                            <_-RVProTransitionObject-_transitionObject />\n                        </RVMediaCue>\n                    </cues>\n                    <displayElements containerClass=\"NSMutableArray\">";
                    if (slide.title) {
                        displaySlide += _this.makeTextElement(config, slide.title, 29.04599, 2, 1221.908, 118.6807);
                    }
                    if (slide.content) {
                        displaySlide += _this.makeTextElement(config, slide.content, 56.26352, 145, 1182.772, 319.1484);
                    }
                    displaySlide += "</displayElements>\n                    <_-RVProTransitionObject-_transitionObject transitionType=\"-1\" transitionDuration=\"1\" motionEnabled=\"0\" motionDuration=\"20\" motionSpeed=\"100\" />\n                </RVDisplaySlide>";
                    return displaySlide;
                };
                this.makeTextElement = function (config, content, posX, posY, width, height) {
                    //Base64 encode the RTF string
                    var rtfData = btoa(_this.makeRtfData(config, content));
                    return "<RVTextElement displayDelay=\"0\" displayName=\"\" locked=\"0\" persistent=\"0\" typeID=\"0\" fromTemplate=\"0\" bezelRadius=\"0\" drawingFill=\"0\" drawingShadow=\"0\" drawingStroke=\"0\" fillColor=\"0 0 0 0\" rotation=\"0\" source=\"\" adjustsHeightToFit=\"1\" verticalAlignment=\"1\" RTFData=\"" + rtfData + "\" revealType=\"0\" serialization-array-index=\"0\">\n                <_-RVRect3D-_position x=\"" + posX + "\" y=\"" + posY + "\" z=\"0\" width=\"" + width + "\" height=\"" + height + "\" />\n                <_-D-_serializedShadow containerClass=\"NSMutableDictionary\">\n                    <NSMutableString serialization-native-value=\"{5, -5}\" serialization-dictionary-key=\"shadowOffset\" />\n                    <NSNumber serialization-native-value=\"0\" serialization-dictionary-key=\"shadowBlurRadius\" />\n                    <NSColor serialization-native-value=\"0 0 0 0.3333333432674408\" serialization-dictionary-key=\"shadowColor\" />\n                </_-D-_serializedShadow>\n                <stroke containerClass=\"NSMutableDictionary\">\n                    <NSColor serialization-native-value=\"0 0 0 1\" serialization-dictionary-key=\"RVShapeElementStrokeColorKey\" />\n                    <NSNumber serialization-native-value=\"1\" serialization-dictionary-key=\"RVShapeElementStrokeWidthKey\" />\n                </stroke>\n            </RVTextElement>";
                };
                this.makeRtfData = function (config, content) {
                    //must escape slashes here!
                    return "{\\rtf1\\ansi\\ansicpg1252\\cocoartf1404\\cocoasubrtf340\n\\cocoascreenfonts1{\\fonttbl\\f0\\fnil\\fcharset0 " + config.fontName + ";}\n{\\colortbl;\\red255\\green255\\blue255;}\n\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural\n\n\\f0\\fs180 \\cf1 " + content + "}";
                };
                this.generateUuid = function () {
                    //Native PP ID Example: 26AAF905-8F45-4252-BFAB-4C10CCFE1476
                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                    }
                    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                };
            }
            return ProPresenterDocService;
        }());
        Services.ProPresenterDocService = ProPresenterDocService;
        angular
            .module(appModuleName)
            .service("proPresenterDocService", ProPresenterDocService);
    })(Services = TxtToPp.Services || (TxtToPp.Services = {}));
})(TxtToPp || (TxtToPp = {}));
