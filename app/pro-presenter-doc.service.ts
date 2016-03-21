/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Services {

    const creatorCode = "1349676880";

    export class ProPresenterDocService {

        constructor() { }

        public makeFile = (config: Interfaces.IProPresenterDocConfig, slides: Interfaces.ISlide[]): string => {
            const today = new Date();
            const dateStr = today.toISOString().split(".")[0]; //remove the seconds from the date
            return `<RVPresentationDocument height="${config.height}" width="${config.width}" versionNumber="500" docType="0" creatorCode="${creatorCode}" lastDateUsed="${dateStr}" usedCount="0" category="${config.category}" resourcesDirectory="" backgroundColor="0 0 0 1" drawingBackgroundColor="0" notes="" artist="" author="" album="" CCLIDisplay="0" CCLIArtistCredits="" CCLISongTitle="${config.title}" CCLIPublisher="" CCLICopyrightInfo="${today.getFullYear()}" CCLILicenseNumber="" chordChartPath="">
    <timeline timeOffSet="0" selectedMediaTrackIndex="0" unitOfMeasure="60" duration="0" loop="0">
        <timeCues containerClass="NSMutableArray"></timeCues>
        <mediaTracks containerClass="NSMutableArray"></mediaTracks>
    </timeline>
    <bibleReference containerClass="NSMutableDictionary"></bibleReference>
    <arrangements containerClass="NSMutableArray"></arrangements>
    <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
    <groups containerClass="NSMutableArray">
        ${this.getSlidesXmlString(config, slides)}
    </groups>
</RVPresentationDocument>`;
        };
        
        private getSlidesXmlString = (config: Interfaces.IProPresenterDocConfig, slides: Interfaces.ISlide[]): string => {
            const groupUuid = this.generateUuid();
            //NOTE: Incriment the `serialization-array-index` when using multiple groups!
            let slideGroup = `<RVSlideGrouping name="" uuid="${groupUuid}" color="0 1 1 1" serialization-array-index="0">
            <slides containerClass="NSMutableArray">`

            for (let s of slides) {
                slideGroup += this.createSlide(config, s, groupUuid);
            }

            slideGroup += `</slides>\n</RVSlideGrouping>`;

            return slideGroup;
        };

        private createSlide = (config: Interfaces.IProPresenterDocConfig, slide: Interfaces.ISlide, groupId: string): string => {
            //const bgImgPath = "file://localhost/Users/chrisbarr/Documents/Projects/Calvary/new%20logos/Pixel%20Reveal/Sermon%20Background%20(720p).jpg";
            //const cueName = `Sermon Background (720p).jpg`;
            const slideBgColorRgba = `0.0313725508749485 0.2274509817361832 0.4666666686534882 1`;
            let displaySlide =  `<RVDisplaySlide backgroundColor="${slideBgColorRgba}" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="2" UUID="${this.generateUuid()}" drawingBackgroundColor="1" chordChartPath="" serialization-array-index="0">
                    <cues containerClass="NSMutableArray"></cues>
                    <displayElements containerClass="NSMutableArray">`
                    
                    if(slide.title){
                        displaySlide += this.makeTextElement(config.displayElementConfigs.slideTitle, slide.title);
                    }
                    if(slide.content){
                        displaySlide += this.makeTextElement(config.displayElementConfigs.slideContent, slide.content);
                    }
                    
                    displaySlide +=`</displayElements>
                    <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100"></_-RVProTransitionObject-_transitionObject>
                </RVDisplaySlide>
                `;
                
                return displaySlide;
        };
        
        private makeTextElement = (displayElementConfig: Interfaces.IDisplayElementConfig, content: string)=>{
            //Base64 encode the RTF string
            const rtfData = btoa(this.makeRtfData(displayElementConfig, content));
            
            return `<RVTextElement displayDelay="0" displayName="" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="0" drawingStroke="0" fillColor="0 0 0 0" rotation="0" source="" adjustsHeightToFit="1" verticalAlignment="1" RTFData="${rtfData}" revealType="0" serialization-array-index="0">
                <_-RVRect3D-_position x="${displayElementConfig.posX}" y="${displayElementConfig.posY}" z="0" width="${displayElementConfig.width}" height="${displayElementConfig.height}" />
                <_-D-_serializedShadow containerClass="NSMutableDictionary">
                    <NSMutableString serialization-native-value="{5, -5}" serialization-dictionary-key="shadowOffset" />
                    <NSNumber serialization-native-value="0" serialization-dictionary-key="shadowBlurRadius" />
                    <NSColor serialization-native-value="0 0 0 0.3333333432674408" serialization-dictionary-key="shadowColor" />
                </_-D-_serializedShadow>
                <stroke containerClass="NSMutableDictionary">
                    <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey" />
                    <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey" />
                </stroke>
            </RVTextElement>`
        };

        private makeRtfData = (displayElementConfig: Interfaces.IDisplayElementConfig, content: string): string => {
            //NOTE: We must escape the slashes here!  RTF data normally only has the one slashe to separate each data item.
            return `{\\rtf1\\ansi\\ansicpg1252\\cocoartf1404\\cocoasubrtf340
\\cocoascreenfonts1{\\fonttbl\\f0\\fnil\\fcharset0 ${displayElementConfig.fontName};}
{\\colortbl;\\red255\\green255\\blue255;}
\\pard\\tx560\\tx1120\\tx1680\\tx2240\\tx2800\\tx3360\\tx3920\\tx4480\\tx5040\\tx5600\\tx6160\\tx6720\\pardirnatural

\\f0\\fs180 \\cf1 ${content}}`;
        };
        
        private generateUuid = () => {
            //Native PP ID Example: 26AAF905-8F45-4252-BFAB-4C10CCFE1476
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };

    }

    angular
        .module(appModuleName)
        .service("proPresenterDocService", ProPresenterDocService)
}