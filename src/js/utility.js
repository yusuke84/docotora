'use strict';

class utility {
    constructor(){
        // nothing
    }

    /**
     * getUserMediaのOptionオブジェクトを生成する
     * @param videFlag
     * @param audiFlag
     * @param width
     * @param height
     * @param framerate
     * @returns {*}
     */
    static createGumConstraints(videoFlag = true,audioFlag = true,width,height,framerate) {

        let _param = {
            video: (videoFlag == false) ? videoFlag : {},
            audio: audioFlag
        };

        if(videoFlag == true){
            if (navigator.mozGetUserMedia) {
                // for FF
                if (isFinite(width))
                    _param.video.width = {min: width, max: width};
                if (isFinite(height))
                    _param.video.height = {min: height, max: height};
            }else{
                // for Chrome
                if (isFinite(width))
                    _param.video.width = {min: width, max: width};
                if (isFinite(height))
                    _param.video.height = {min: height, max: height};
                if (isFinite(framerate))
                    _param.video.frameRate = {min: framerate, max: framerate};
            }
        }
        return _param;
    }

    /**
     * video要素でMediaStreamを再生する
     * @param element
     * @param stream
     */
    static async playMediaStream(element,stream) {
        element.srcObject = stream;
        let playPromise = await element.play();
        if(playPromise !== undefined){
            playPromise.then(() => {
                console.log('play video');
            }).catch(error => {
                console.log('error auto play:' + error);
            });
        }
    }

    /**
     * video要素でMediaStreamを停止する
     * @param element
     */
    static stopMediaStream(element) {
        element.pause();
        element.srcObject = null;
    }

    /**
     * URLハッシュを取得
     * @returns {string}
     */
    static getURLHash(){
        return location.hash;
    }

}

export default utility;

