/// <reference path="app-typings.d.ts" />
namespace TxtToPp.Services {
    
    const creatorCode = "TxtToProPresenter";
    
    export class ProPresenterDocService {

        constructor() { }
              
        public makeFile = (config:Interfaces.IProPresenterDocConfig, slides: Interfaces.ISlide[]): string => {
            const today = new Date();
            return `<RVPresentationDocument height="${config.height}" width="${config.width}" versionNumber="500" docType="0" creatorCode="${creatorCode}" lastDateUsed="${today.toISOString()}" usedCount="0" category="${config.category}" resourcesDirectory="" backgroundColor="0 0 0 1" drawingBackgroundColor="0" notes="" artist="" author="" album="" CCLIDisplay="0" CCLIArtistCredits="" CCLISongTitle="${config.title}" CCLIPublisher="" CCLICopyrightInfo="${today.getFullYear()}" CCLILicenseNumber="" chordChartPath="">
    <timeline timeOffSet="0" selectedMediaTrackIndex="0" unitOfMeasure="60" duration="0" loop="0">
        <timeCues containerClass="NSMutableArray" />
        <mediaTracks containerClass="NSMutableArray" />
    </timeline>
    <bibleReference containerClass="NSMutableDictionary" />
    <arrangements containerClass="NSMutableArray" />
    <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100" />
    <groups containerClass="NSMutableArray">
        ${this.getSlidesXmlString(config, slides)}
    </groups>
</RVPresentationDocument>`
        };
        
        private createSlide = (config:Interfaces.IProPresenterDocConfig, slides: Interfaces.ISlide, groupId:string):string=>{
            //TODO: Create real slides
            return `<RVDisplaySlide backgroundColor="0.0313725508749485 0.2274509817361832 0.4666666686534882 1" enabled="1" highlightColor="0 0 0 0" hotKey="" label="" notes="" slideType="1" sort_index="2" UUID="${this.generateUuid()}" drawingBackgroundColor="1" chordChartPath="" serialization-array-index="0">
                    <cues containerClass="NSMutableArray">
                        <RVMediaCue displayName="Sermon Background (720p).jpg" delayTime="0" timeStamp="0" enabled="1" UUID="${this.generateUuid()}" parentUUID="${groupId}" elementClassName="RVImageElement" behavior="1" alignment="4" serialization-array-index="0">
                            <element displayDelay="0" displayName="Sermon Background (720p).jpg" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="0" drawingStroke="0" fillColor="1 1 1 1" rotation="0" source="file://localhost/Users/chrisbarr/Documents/Projects/Calvary/new%20logos/Pixel%20Reveal/Sermon%20Background%20(720p).jpg" flippedHorizontally="0" flippedVertically="0" scaleFactor="1" serializedImageOffset="0.000000@0.000000" serializedFilters="YnBsaXN0MDDUAQIDBAUIFhdUJHRvcFgkb2JqZWN0c1gkdmVyc2lvblkkYXJjaGl2ZXLRBgdUcm9vdIABowkKD1UkbnVsbNILDA0OViRjbGFzc1pOUy5vYmplY3RzgAKg0hAREhNYJGNsYXNzZXNaJGNsYXNzbmFtZaMTFBVeTlNNdXRhYmxlQXJyYXlXTlNBcnJheVhOU09iamVjdBIAAYagXxAPTlNLZXllZEFyY2hpdmVyCBEWHygyNTo8QEZLUl1fYGVueX2MlJ2iAAAAAAAAAQEAAAAAAAAAGAAAAAAAAAAAAAAAAAAAALQ=" scaleBehavior="3" brightness="0" contrast="1" saturation="1" hue="0" manufactureURL="" manufactureName="" format="JPEG image" enableColorFilter="0" colorFilter="1 0 0 1" enableBlur="0" blurRadius="0" enableEdgeBlur="0" edgeBlurRadius="0" edgeBlurArea="0" enableSepia="0" enableColorInvert="0" enableGrayInvert="0" enableHeatSignature="0">
                                <_-RVRect3D-_position x="0" y="0" z="0" width="1680" height="1050" />
                                <_-D-_serializedShadow containerClass="NSMutableDictionary">
                                    <NSMutableString serialization-native-value="{5, -5}" serialization-dictionary-key="shadowOffset" />
                                    <NSNumber serialization-native-value="0" serialization-dictionary-key="shadowBlurRadius" />
                                    <NSColor serialization-native-value="0 0 0 0.3333333432674408" serialization-dictionary-key="shadowColor" />
                                </_-D-_serializedShadow>
                                <stroke containerClass="NSMutableDictionary">
                                    <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey" />
                                    <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey" />
                                </stroke>
                            </element>
                            <_-RVProTransitionObject-_transitionObject />
                        </RVMediaCue>
                    </cues>
                    <displayElements containerClass="NSMutableArray">
                        <RVTextElement displayDelay="0" displayName="" locked="0" persistent="0" typeID="0" fromTemplate="0" bezelRadius="0" drawingFill="0" drawingShadow="0" drawingStroke="0" fillColor="0 0 0 0" rotation="0" source="" adjustsHeightToFit="1" verticalAlignment="1" RTFData="e1xydGYxXGFuc2lcYW5zaWNwZzEyNTJcY29jb2FydGYxNDA0XGNvY29hc3VicnRmMzQwClxjb2NvYXNjcmVlbmZvbnRzMXtcZm9udHRibFxmMFxmbmlsXGZjaGFyc2V0MCBGdXR1cmEtTWVkaXVtO30Ke1xjb2xvcnRibDtccmVkMjU1XGdyZWVuMjU1XGJsdWUyNTU7fQpccGFyZFx0eDU2MFx0eDExMjBcdHgxNjgwXHR4MjI0MFx0eDI4MDBcdHgzMzYwXHR4MzkyMFx0eDQ0ODBcdHg1MDQwXHR4NTYwMFx0eDYxNjBcdHg2NzIwXHBhcmRpcm5hdHVyYWwKClxmMFxmczE4MCBcY2YxIDEuIERhdmlkIEluIFRoZSBQYWxhY2V9" revealType="0" serialization-array-index="0">
                            <_-RVRect3D-_position x="29.04599" y="2" z="0" width="1221.908" height="118.6807" />
                            <_-D-_serializedShadow containerClass="NSMutableDictionary">
                                <NSMutableString serialization-native-value="{5, -5}" serialization-dictionary-key="shadowOffset" />
                                <NSNumber serialization-native-value="0" serialization-dictionary-key="shadowBlurRadius" />
                                <NSColor serialization-native-value="0 0 0 0.3333333432674408" serialization-dictionary-key="shadowColor" />
                            </_-D-_serializedShadow>
                            <stroke containerClass="NSMutableDictionary">
                                <NSColor serialization-native-value="0 0 0 1" serialization-dictionary-key="RVShapeElementStrokeColorKey" />
                                <NSNumber serialization-native-value="1" serialization-dictionary-key="RVShapeElementStrokeWidthKey" />
                            </stroke>
                        </RVTextElement>
                    </displayElements>
                    <_-RVProTransitionObject-_transitionObject transitionType="-1" transitionDuration="1" motionEnabled="0" motionDuration="20" motionSpeed="100" />
                </RVDisplaySlide>`;
        };
        
        private getSlidesXmlString = (config:Interfaces.IProPresenterDocConfig, slides: Interfaces.ISlide[]):string =>{
            const groupUuid = this.generateUuid();
            let slideGroup = `<RVSlideGrouping name="" uuid="${groupUuid}" color="0 1 1 1" serialization-array-index="2">
            <slides containerClass="NSMutableArray">`
                
                for(let s of slides){
                    slideGroup += this.createSlide(config, s, groupUuid);
                }
                
            slideGroup += `            </slides>
                    </RVSlideGrouping>`;
        
            return slideGroup;
        };
        
        private generateUuid =() => {
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