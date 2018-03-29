!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){(function(n){var o;
/*!
 *  howler.js v2.0.9
 *  howlerjs.com
 *
 *  (c) 2013-2018, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
/*!
 *  howler.js v2.0.9
 *  howlerjs.com
 *
 *  (c) 2013-2018, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
!function(){"use strict";var r=function(){this.init()};r.prototype={init:function(){var e=this||i;return e._counter=1e3,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.mobileAutoEnable=!0,e._setup(),e},volume:function(e){var t=this||i;if(e=parseFloat(e),t.ctx||p(),void 0!==e&&e>=0&&e<=1){if(t._volume=e,t._muted)return t;t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e,i.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var o=t._howls[n]._getSoundIds(),r=0;r<o.length;r++){var a=t._howls[n]._soundById(o[r]);a&&a._node&&(a._node.volume=a._volume*e)}return t}return t._volume},mute:function(e){var t=this||i;t.ctx||p(),t._muted=e,t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e?0:t._volume,i.ctx.currentTime);for(var n=0;n<t._howls.length;n++)if(!t._howls[n]._webAudio)for(var o=t._howls[n]._getSoundIds(),r=0;r<o.length;r++){var a=t._howls[n]._soundById(o[r]);a&&a._node&&(a._node.muted=!!e||a._muted)}return t},unload:function(){for(var e=this||i,t=e._howls.length-1;t>=0;t--)e._howls[t].unload();return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,p()),e},codecs:function(e){return(this||i)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||i;if(e.state=e.ctx&&e.ctx.state||"running",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch(t){e.noAudio=!0}else e.noAudio=!0;try{(new Audio).muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||i,t=null;try{t="undefined"!=typeof Audio?new Audio:null}catch(t){return e}if(!t||"function"!=typeof t.canPlayType)return e;var n=t.canPlayType("audio/mpeg;").replace(/^no$/,""),o=e._navigator&&e._navigator.userAgent.match(/OPR\/([0-6].)/g),r=o&&parseInt(o[0].split("/")[1],10)<33;return e._codecs={mp3:!(r||!n&&!t.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!n,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_enableMobileAudio:function(){var e=this||i,t=/iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator&&e._navigator.userAgent),n=!!("ontouchend"in window||e._navigator&&e._navigator.maxTouchPoints>0||e._navigator&&e._navigator.msMaxTouchPoints>0);if(!e._mobileEnabled&&e.ctx&&(t||n)){e._mobileEnabled=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050);var o=function(){i._autoResume();var t=e.ctx.createBufferSource();t.buffer=e._scratchBuffer,t.connect(e.ctx.destination),void 0===t.start?t.noteOn(0):t.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),t.onended=function(){t.disconnect(0),e._mobileEnabled=!0,e.mobileAutoEnable=!1,document.removeEventListener("touchstart",o,!0),document.removeEventListener("touchend",o,!0)}};return document.addEventListener("touchstart",o,!0),document.addEventListener("touchend",o,!0),e}},_autoSuspend:function(){var e=this;if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&i.usingWebAudio){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var n=0;n<e._howls[t]._sounds.length;n++)if(!e._howls[t]._sounds[n]._paused)return e;return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout(function(){e.autoSuspend&&(e._suspendTimer=null,e.state="suspending",e.ctx.suspend().then(function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}))},3e4),e}},_autoResume:function(){var e=this;if(e.ctx&&void 0!==e.ctx.resume&&i.usingWebAudio)return"running"===e.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state?(e.ctx.resume().then(function(){e.state="running";for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("resume")}),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}};var i=new r,a=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")};a.prototype={init:function(e){var t=this;return i.ctx||p(),t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"!=typeof e.preload||e.preload,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._xhrWithCredentials=e.xhrWithCredentials||!1,t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._playLock=!1,t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onresume=[],t._webAudio=i.usingWebAudio&&!t._html5,void 0!==i.ctx&&i.ctx&&i.mobileAutoEnable&&i._enableMobileAudio(),i._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&t.load(),t},load:function(){var e=null;if(i.noAudio)this._emit("loaderror",null,"No audio support.");else{"string"==typeof this._src&&(this._src=[this._src]);for(var t=0;t<this._src.length;t++){var n,o;if(this._format&&this._format[t])n=this._format[t];else{if("string"!=typeof(o=this._src[t])){this._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.");continue}(n=/^data:audio\/([^;,]+);/i.exec(o))||(n=/\.([^.]+)$/.exec(o.split("?",1)[0])),n&&(n=n[1].toLowerCase())}if(n||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),n&&i.codecs(n)){e=this._src[t];break}}if(e)return this._src=e,this._state="loading","https:"===window.location.protocol&&"http:"===e.slice(0,5)&&(this._html5=!0,this._webAudio=!1),new s(this),this._webAudio&&d(this),this;this._emit("loaderror",null,"No codec support for selected audio sources.")}},play:function(e,t){var n=this,o=null;if("number"==typeof e)o=e,e=null;else{if("string"==typeof e&&"loaded"===n._state&&!n._sprite[e])return null;if(void 0===e){e="__default";for(var r=0,a=0;a<n._sounds.length;a++)n._sounds[a]._paused&&!n._sounds[a]._ended&&(r++,o=n._sounds[a]._id);1===r?e=null:o=null}}var s=o?n._soundById(o):n._inactiveSound();if(!s)return null;if(o&&!e&&(e=s._sprite||"__default"),"loaded"!==n._state){s._sprite=e,s._ended=!1;var u=s._id;return n._queue.push({event:"play",action:function(){n.play(u)}}),u}if(o&&!s._paused)return t||n._loadQueue("play"),s._id;n._webAudio&&i._autoResume();var d=Math.max(0,s._seek>0?s._seek:n._sprite[e][0]/1e3),_=Math.max(0,(n._sprite[e][0]+n._sprite[e][1])/1e3-d),l=1e3*_/Math.abs(s._rate);s._paused=!1,s._ended=!1,s._sprite=e,s._seek=d,s._start=n._sprite[e][0]/1e3,s._stop=(n._sprite[e][0]+n._sprite[e][1])/1e3,s._loop=!(!s._loop&&!n._sprite[e][2]);var c=s._node;if(n._webAudio){var p=function(){n._refreshBuffer(s);var e=s._muted||n._muted?0:s._volume;c.gain.setValueAtTime(e,i.ctx.currentTime),s._playStart=i.ctx.currentTime,void 0===c.bufferSource.start?s._loop?c.bufferSource.noteGrainOn(0,d,86400):c.bufferSource.noteGrainOn(0,d,_):s._loop?c.bufferSource.start(0,d,86400):c.bufferSource.start(0,d,_),l!==1/0&&(n._endTimers[s._id]=setTimeout(n._ended.bind(n,s),l)),t||setTimeout(function(){n._emit("play",s._id)},0)};"running"===i.state?p():(n.once("resume",p),n._clearTimer(s._id))}else{var f=function(){c.currentTime=d,c.muted=s._muted||n._muted||i._muted||c.muted,c.volume=s._volume*i.volume(),c.playbackRate=s._rate;try{var o=c.play();if("undefined"!=typeof Promise&&o instanceof Promise){n._playLock=!0;var r=function(){n._playLock=!1,t||n._emit("play",s._id)};o.then(r,r)}else t||n._emit("play",s._id);if(c.paused)return void n._emit("playerror",s._id,"Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.");"__default"!==e?n._endTimers[s._id]=setTimeout(n._ended.bind(n,s),l):(n._endTimers[s._id]=function(){n._ended(s),c.removeEventListener("ended",n._endTimers[s._id],!1)},c.addEventListener("ended",n._endTimers[s._id],!1))}catch(e){n._emit("playerror",s._id,e)}},h=window&&window.ejecta||!c.readyState&&i._navigator.isCocoonJS;if(c.readyState>=3||h)f();else{var m=function(){f(),c.removeEventListener(i._canPlayEvent,m,!1)};c.addEventListener(i._canPlayEvent,m,!1),n._clearTimer(s._id)}}return s._id},pause:function(e){var t=this;if("loaded"!==t._state||t._playLock)return t._queue.push({event:"pause",action:function(){t.pause(e)}}),t;for(var n=t._getSoundIds(e),o=0;o<n.length;o++){t._clearTimer(n[o]);var r=t._soundById(n[o]);if(r&&!r._paused&&(r._seek=t.seek(n[o]),r._rateSeek=0,r._paused=!0,t._stopFade(n[o]),r._node))if(t._webAudio){if(!r._node.bufferSource)continue;void 0===r._node.bufferSource.stop?r._node.bufferSource.noteOff(0):r._node.bufferSource.stop(0),t._cleanBuffer(r._node)}else isNaN(r._node.duration)&&r._node.duration!==1/0||r._node.pause();arguments[1]||t._emit("pause",r?r._id:null)}return t},stop:function(e,t){var n=this;if("loaded"!==n._state)return n._queue.push({event:"stop",action:function(){n.stop(e)}}),n;for(var o=n._getSoundIds(e),r=0;r<o.length;r++){n._clearTimer(o[r]);var i=n._soundById(o[r]);i&&(i._seek=i._start||0,i._rateSeek=0,i._paused=!0,i._ended=!0,n._stopFade(o[r]),i._node&&(n._webAudio?i._node.bufferSource&&(void 0===i._node.bufferSource.stop?i._node.bufferSource.noteOff(0):i._node.bufferSource.stop(0),n._cleanBuffer(i._node)):isNaN(i._node.duration)&&i._node.duration!==1/0||(i._node.currentTime=i._start||0,i._node.pause())),t||n._emit("stop",i._id))}return n},mute:function(e,t){var n=this;if("loaded"!==n._state)return n._queue.push({event:"mute",action:function(){n.mute(e,t)}}),n;if(void 0===t){if("boolean"!=typeof e)return n._muted;n._muted=e}for(var o=n._getSoundIds(t),r=0;r<o.length;r++){var a=n._soundById(o[r]);a&&(a._muted=e,a._interval&&n._stopFade(a._id),n._webAudio&&a._node?a._node.gain.setValueAtTime(e?0:a._volume,i.ctx.currentTime):a._node&&(a._node.muted=!!i._muted||e),n._emit("mute",a._id))}return n},volume:function(){var e,t,n,o=this,r=arguments;if(0===r.length)return o._volume;if(1===r.length||2===r.length&&void 0===r[1]?o._getSoundIds().indexOf(r[0])>=0?t=parseInt(r[0],10):e=parseFloat(r[0]):r.length>=2&&(e=parseFloat(r[0]),t=parseInt(r[1],10)),!(void 0!==e&&e>=0&&e<=1))return(n=t?o._soundById(t):o._sounds[0])?n._volume:0;if("loaded"!==o._state)return o._queue.push({event:"volume",action:function(){o.volume.apply(o,r)}}),o;void 0===t&&(o._volume=e),t=o._getSoundIds(t);for(var a=0;a<t.length;a++)(n=o._soundById(t[a]))&&(n._volume=e,r[2]||o._stopFade(t[a]),o._webAudio&&n._node&&!n._muted?n._node.gain.setValueAtTime(e,i.ctx.currentTime):n._node&&!n._muted&&(n._node.volume=e*i.volume()),o._emit("volume",n._id));return o},fade:function(e,t,n,o){var r=this;if("loaded"!==r._state)return r._queue.push({event:"fade",action:function(){r.fade(e,t,n,o)}}),r;r.volume(e,o);for(var a=r._getSoundIds(o),s=0;s<a.length;s++){var u=r._soundById(a[s]);if(u){if(o||r._stopFade(a[s]),r._webAudio&&!u._muted){var d=i.ctx.currentTime,_=d+n/1e3;u._volume=e,u._node.gain.setValueAtTime(e,d),u._node.gain.linearRampToValueAtTime(t,_)}r._startFadeInterval(u,e,t,n,a[s],void 0===o)}}return r},_startFadeInterval:function(e,t,n,o,r,i){var a=this,s=t,u=n-t,d=Math.abs(u/.01),_=Math.max(4,d>0?o/d:o),l=Date.now();e._fadeTo=n,e._interval=setInterval(function(){var r=(Date.now()-l)/o;l=Date.now(),s+=u*r,s=Math.max(0,s),s=Math.min(1,s),s=Math.round(100*s)/100,a._webAudio?e._volume=s:a.volume(s,e._id,!0),i&&(a._volume=s),(n<t&&s<=n||n>t&&s>=n)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,a.volume(n,e._id),a._emit("fade",e._id))},_)},_stopFade:function(e){var t=this._soundById(e);return t&&t._interval&&(this._webAudio&&t._node.gain.cancelScheduledValues(i.ctx.currentTime),clearInterval(t._interval),t._interval=null,this.volume(t._fadeTo,e),t._fadeTo=null,this._emit("fade",e)),this},loop:function(){var e,t,n,o=arguments;if(0===o.length)return this._loop;if(1===o.length){if("boolean"!=typeof o[0])return!!(n=this._soundById(parseInt(o[0],10)))&&n._loop;e=o[0],this._loop=e}else 2===o.length&&(e=o[0],t=parseInt(o[1],10));for(var r=this._getSoundIds(t),i=0;i<r.length;i++)(n=this._soundById(r[i]))&&(n._loop=e,this._webAudio&&n._node&&n._node.bufferSource&&(n._node.bufferSource.loop=e,e&&(n._node.bufferSource.loopStart=n._start||0,n._node.bufferSource.loopEnd=n._stop)));return this},rate:function(){var e,t,n,o=this,r=arguments;if(0===r.length)t=o._sounds[0]._id;else if(1===r.length){o._getSoundIds().indexOf(r[0])>=0?t=parseInt(r[0],10):e=parseFloat(r[0])}else 2===r.length&&(e=parseFloat(r[0]),t=parseInt(r[1],10));if("number"!=typeof e)return(n=o._soundById(t))?n._rate:o._rate;if("loaded"!==o._state)return o._queue.push({event:"rate",action:function(){o.rate.apply(o,r)}}),o;void 0===t&&(o._rate=e),t=o._getSoundIds(t);for(var a=0;a<t.length;a++)if(n=o._soundById(t[a])){n._rateSeek=o.seek(t[a]),n._playStart=o._webAudio?i.ctx.currentTime:n._playStart,n._rate=e,o._webAudio&&n._node&&n._node.bufferSource?n._node.bufferSource.playbackRate.setValueAtTime(e,i.ctx.currentTime):n._node&&(n._node.playbackRate=e);var s=o.seek(t[a]),u=1e3*((o._sprite[n._sprite][0]+o._sprite[n._sprite][1])/1e3-s)/Math.abs(n._rate);!o._endTimers[t[a]]&&n._paused||(o._clearTimer(t[a]),o._endTimers[t[a]]=setTimeout(o._ended.bind(o,n),u)),o._emit("rate",n._id)}return o},seek:function(){var e,t,n=this,o=arguments;if(0===o.length)t=n._sounds[0]._id;else if(1===o.length){n._getSoundIds().indexOf(o[0])>=0?t=parseInt(o[0],10):n._sounds.length&&(t=n._sounds[0]._id,e=parseFloat(o[0]))}else 2===o.length&&(e=parseFloat(o[0]),t=parseInt(o[1],10));if(void 0===t)return n;if("loaded"!==n._state)return n._queue.push({event:"seek",action:function(){n.seek.apply(n,o)}}),n;var r=n._soundById(t);if(r){if(!("number"==typeof e&&e>=0)){if(n._webAudio){var a=n.playing(t)?i.ctx.currentTime-r._playStart:0,s=r._rateSeek?r._rateSeek-r._seek:0;return r._seek+(s+a*Math.abs(r._rate))}return r._node.currentTime}var u=n.playing(t);if(u&&n.pause(t,!0),r._seek=e,r._ended=!1,n._clearTimer(t),u&&n.play(t,!0),!n._webAudio&&r._node&&(r._node.currentTime=e),u&&!n._webAudio){var d=function(){n._playLock?setTimeout(d,0):n._emit("seek",t)};setTimeout(d,0)}else n._emit("seek",t)}return n},playing:function(e){if("number"==typeof e){var t=this._soundById(e);return!!t&&!t._paused}for(var n=0;n<this._sounds.length;n++)if(!this._sounds[n]._paused)return!0;return!1},duration:function(e){var t=this._duration,n=this._soundById(e);return n&&(t=this._sprite[n._sprite][1]/1e3),t},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,n=0;n<t.length;n++){if(t[n]._paused||e.stop(t[n]._id),!e._webAudio)/MSIE |Trident\//.test(i._navigator&&i._navigator.userAgent)||(t[n]._node.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"),t[n]._node.removeEventListener("error",t[n]._errorFn,!1),t[n]._node.removeEventListener(i._canPlayEvent,t[n]._loadFn,!1);delete t[n]._node,e._clearTimer(t[n]._id);var o=i._howls.indexOf(e);o>=0&&i._howls.splice(o,1)}var r=!0;for(n=0;n<i._howls.length;n++)if(i._howls[n]._src===e._src){r=!1;break}return u&&r&&delete u[e._src],i.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,t,n,o){var r=this["_on"+e];return"function"==typeof t&&r.push(o?{id:n,fn:t,once:o}:{id:n,fn:t}),this},off:function(e,t,n){var o=this["_on"+e],r=0;if("number"==typeof t&&(n=t,t=null),t||n)for(r=0;r<o.length;r++){var i=n===o[r].id;if(t===o[r].fn&&i||!t&&i){o.splice(r,1);break}}else if(e)this["_on"+e]=[];else{var a=Object.keys(this);for(r=0;r<a.length;r++)0===a[r].indexOf("_on")&&Array.isArray(this[a[r]])&&(this[a[r]]=[])}return this},once:function(e,t,n){return this.on(e,t,n,1),this},_emit:function(e,t,n){for(var o=this["_on"+e],r=o.length-1;r>=0;r--)o[r].id&&o[r].id!==t&&"load"!==e||(setTimeout(function(e){e.call(this,t,n)}.bind(this,o[r].fn),0),o[r].once&&this.off(e,o[r].fn,o[r].id));return this._loadQueue(e),this},_loadQueue:function(e){if(this._queue.length>0){var t=this._queue[0];t.event===e&&(this._queue.shift(),this._loadQueue()),e||t.action()}return this},_ended:function(e){var t=e._sprite;if(!this._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(this._ended.bind(this,e),100),this;var n=!(!e._loop&&!this._sprite[t][2]);if(this._emit("end",e._id),!this._webAudio&&n&&this.stop(e._id,!0).play(e._id),this._webAudio&&n){this._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=i.ctx.currentTime;var o=1e3*(e._stop-e._start)/Math.abs(e._rate);this._endTimers[e._id]=setTimeout(this._ended.bind(this,e),o)}return this._webAudio&&!n&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,this._clearTimer(e._id),this._cleanBuffer(e._node),i._autoSuspend()),this._webAudio||n||this.stop(e._id),this},_clearTimer:function(e){if(this._endTimers[e]){if("function"!=typeof this._endTimers[e])clearTimeout(this._endTimers[e]);else{var t=this._soundById(e);t&&t._node&&t._node.removeEventListener("ended",this._endTimers[e],!1)}delete this._endTimers[e]}return this},_soundById:function(e){for(var t=0;t<this._sounds.length;t++)if(e===this._sounds[t]._id)return this._sounds[t];return null},_inactiveSound:function(){this._drain();for(var e=0;e<this._sounds.length;e++)if(this._sounds[e]._ended)return this._sounds[e].reset();return new s(this)},_drain:function(){var e=this._pool,t=0,n=0;if(!(this._sounds.length<e)){for(n=0;n<this._sounds.length;n++)this._sounds[n]._ended&&t++;for(n=this._sounds.length-1;n>=0;n--){if(t<=e)return;this._sounds[n]._ended&&(this._webAudio&&this._sounds[n]._node&&this._sounds[n]._node.disconnect(0),this._sounds.splice(n,1),t--)}}},_getSoundIds:function(e){if(void 0===e){for(var t=[],n=0;n<this._sounds.length;n++)t.push(this._sounds[n]._id);return t}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=i.ctx.createBufferSource(),e._node.bufferSource.buffer=u[this._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,i.ctx.currentTime),this},_cleanBuffer:function(e){if(i._scratchBuffer){e.bufferSource.onended=null,e.bufferSource.disconnect(0);try{e.bufferSource.buffer=i._scratchBuffer}catch(e){}}return e.bufferSource=null,this}};var s=function(e){this._parent=e,this.init()};s.prototype={init:function(){var e=this._parent;return this._muted=e._muted,this._loop=e._loop,this._volume=e._volume,this._rate=e._rate,this._seek=0,this._paused=!0,this._ended=!0,this._sprite="__default",this._id=++i._counter,e._sounds.push(this),this.create(),this},create:function(){var e=this._parent,t=i._muted||this._muted||this._parent._muted?0:this._volume;return e._webAudio?(this._node=void 0===i.ctx.createGain?i.ctx.createGainNode():i.ctx.createGain(),this._node.gain.setValueAtTime(t,i.ctx.currentTime),this._node.paused=!0,this._node.connect(i.masterGain)):(this._node=new Audio,this._errorFn=this._errorListener.bind(this),this._node.addEventListener("error",this._errorFn,!1),this._loadFn=this._loadListener.bind(this),this._node.addEventListener(i._canPlayEvent,this._loadFn,!1),this._node.src=e._src,this._node.preload="auto",this._node.volume=t*i.volume(),this._node.load()),this},reset:function(){var e=this._parent;return this._muted=e._muted,this._loop=e._loop,this._volume=e._volume,this._rate=e._rate,this._seek=0,this._rateSeek=0,this._paused=!0,this._ended=!0,this._sprite="__default",this._id=++i._counter,this},_errorListener:function(){this._parent._emit("loaderror",this._id,this._node.error?this._node.error.code:0),this._node.removeEventListener("error",this._errorFn,!1)},_loadListener:function(){var e=this._parent;e._duration=Math.ceil(10*this._node.duration)/10,0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue()),this._node.removeEventListener(i._canPlayEvent,this._loadFn,!1)}};var u={},d=function(e){var t=e._src;if(u[t])return e._duration=u[t].duration,void c(e);if(/^data:[^;]+;base64,/.test(t)){for(var n=atob(t.split(",")[1]),o=new Uint8Array(n.length),r=0;r<n.length;++r)o[r]=n.charCodeAt(r);l(o.buffer,e)}else{var i=new XMLHttpRequest;i.open("GET",t,!0),i.withCredentials=e._xhrWithCredentials,i.responseType="arraybuffer",i.onload=function(){var t=(i.status+"")[0];"0"===t||"2"===t||"3"===t?l(i.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+i.status+".")},i.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete u[t],e.load())},_(i)}},_=function(e){try{e.send()}catch(t){e.onerror()}},l=function(e,t){i.ctx.decodeAudioData(e,function(e){e&&t._sounds.length>0&&(u[t._src]=e,c(t,e))},function(){t._emit("loaderror",null,"Decoding audio data failed.")})},c=function(e,t){t&&!e._duration&&(e._duration=t.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},p=function(){try{"undefined"!=typeof AudioContext?i.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?i.ctx=new webkitAudioContext:i.usingWebAudio=!1}catch(e){i.usingWebAudio=!1}var e=/iP(hone|od|ad)/.test(i._navigator&&i._navigator.platform),t=i._navigator&&i._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),n=t?parseInt(t[1],10):null;if(e&&n&&n<9){var o=/safari/.test(i._navigator&&i._navigator.userAgent.toLowerCase());(i._navigator&&i._navigator.standalone&&!o||i._navigator&&!i._navigator.standalone&&!o)&&(i.usingWebAudio=!1)}i.usingWebAudio&&(i.masterGain=void 0===i.ctx.createGain?i.ctx.createGainNode():i.ctx.createGain(),i.masterGain.gain.setValueAtTime(i._muted?0:1,i.ctx.currentTime),i.masterGain.connect(i.ctx.destination)),i._setup()};void 0===(o=function(){return{Howler:i,Howl:a}}.apply(t,[]))||(e.exports=o),t.Howler=i,t.Howl=a,"undefined"!=typeof window?(window.HowlerGlobal=r,window.Howler=i,window.Howl=a,window.Sound=s):void 0!==n&&(n.HowlerGlobal=r,n.Howler=i,n.Howl=a,n.Sound=s)}(),
/*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.0.9
 *  howlerjs.com
 *
 *  (c) 2013-2018, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
function(){"use strict";var e;HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){if(!this.ctx||!this.ctx.listener)return this;for(var t=this._howls.length-1;t>=0;t--)this._howls[t].stereo(e);return this},HowlerGlobal.prototype.pos=function(e,t,n){return this.ctx&&this.ctx.listener?(t="number"!=typeof t?this._pos[1]:t,n="number"!=typeof n?this._pos[2]:n,"number"!=typeof e?this._pos:(this._pos=[e,t,n],this.ctx.listener.setPosition(this._pos[0],this._pos[1],this._pos[2]),this)):this},HowlerGlobal.prototype.orientation=function(e,t,n,o,r,i){if(!this.ctx||!this.ctx.listener)return this;var a=this._orientation;return t="number"!=typeof t?a[1]:t,n="number"!=typeof n?a[2]:n,o="number"!=typeof o?a[3]:o,r="number"!=typeof r?a[4]:r,i="number"!=typeof i?a[5]:i,"number"!=typeof e?a:(this._orientation=[e,t,n,o,r,i],this.ctx.listener.setOrientation(e,t,n,o,r,i),this)},Howl.prototype.init=(e=Howl.prototype.init,function(t){return this._orientation=t.orientation||[1,0,0],this._stereo=t.stereo||null,this._pos=t.pos||null,this._pannerAttr={coneInnerAngle:void 0!==t.coneInnerAngle?t.coneInnerAngle:360,coneOuterAngle:void 0!==t.coneOuterAngle?t.coneOuterAngle:360,coneOuterGain:void 0!==t.coneOuterGain?t.coneOuterGain:0,distanceModel:void 0!==t.distanceModel?t.distanceModel:"inverse",maxDistance:void 0!==t.maxDistance?t.maxDistance:1e4,panningModel:void 0!==t.panningModel?t.panningModel:"HRTF",refDistance:void 0!==t.refDistance?t.refDistance:1,rolloffFactor:void 0!==t.rolloffFactor?t.rolloffFactor:1},this._onstereo=t.onstereo?[{fn:t.onstereo}]:[],this._onpos=t.onpos?[{fn:t.onpos}]:[],this._onorientation=t.onorientation?[{fn:t.onorientation}]:[],e.call(this,t)}),Howl.prototype.stereo=function(e,n){var o=this;if(!o._webAudio)return o;if("loaded"!==o._state)return o._queue.push({event:"stereo",action:function(){o.stereo(e,n)}}),o;var r=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo";if(void 0===n){if("number"!=typeof e)return o._stereo;o._stereo=e,o._pos=[e,0,0]}for(var i=o._getSoundIds(n),a=0;a<i.length;a++){var s=o._soundById(i[a]);if(s){if("number"!=typeof e)return s._stereo;s._stereo=e,s._pos=[e,0,0],s._node&&(s._pannerAttr.panningModel="equalpower",s._panner&&s._panner.pan||t(s,r),"spatial"===r?s._panner.setPosition(e,0,0):s._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),o._emit("stereo",s._id)}}return o},Howl.prototype.pos=function(e,n,o,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"pos",action:function(){i.pos(e,n,o,r)}}),i;if(n="number"!=typeof n?0:n,o="number"!=typeof o?-.5:o,void 0===r){if("number"!=typeof e)return i._pos;i._pos=[e,n,o]}for(var a=i._getSoundIds(r),s=0;s<a.length;s++){var u=i._soundById(a[s]);if(u){if("number"!=typeof e)return u._pos;u._pos=[e,n,o],u._node&&(u._panner&&!u._panner.pan||t(u,"spatial"),u._panner.setPosition(e,n,o)),i._emit("pos",u._id)}}return i},Howl.prototype.orientation=function(e,n,o,r){var i=this;if(!i._webAudio)return i;if("loaded"!==i._state)return i._queue.push({event:"orientation",action:function(){i.orientation(e,n,o,r)}}),i;if(n="number"!=typeof n?i._orientation[1]:n,o="number"!=typeof o?i._orientation[2]:o,void 0===r){if("number"!=typeof e)return i._orientation;i._orientation=[e,n,o]}for(var a=i._getSoundIds(r),s=0;s<a.length;s++){var u=i._soundById(a[s]);if(u){if("number"!=typeof e)return u._orientation;u._orientation=[e,n,o],u._node&&(u._panner||(u._pos||(u._pos=i._pos||[0,0,-.5]),t(u,"spatial")),u._panner.setOrientation(e,n,o)),i._emit("orientation",u._id)}}return i},Howl.prototype.pannerAttr=function(){var e,n,o,r=arguments;if(!this._webAudio)return this;if(0===r.length)return this._pannerAttr;if(1===r.length){if("object"!=typeof r[0])return(o=this._soundById(parseInt(r[0],10)))?o._pannerAttr:this._pannerAttr;e=r[0],void 0===n&&(e.pannerAttr||(e.pannerAttr={coneInnerAngle:e.coneInnerAngle,coneOuterAngle:e.coneOuterAngle,coneOuterGain:e.coneOuterGain,distanceModel:e.distanceModel,maxDistance:e.maxDistance,refDistance:e.refDistance,rolloffFactor:e.rolloffFactor,panningModel:e.panningModel}),this._pannerAttr={coneInnerAngle:void 0!==e.pannerAttr.coneInnerAngle?e.pannerAttr.coneInnerAngle:this._coneInnerAngle,coneOuterAngle:void 0!==e.pannerAttr.coneOuterAngle?e.pannerAttr.coneOuterAngle:this._coneOuterAngle,coneOuterGain:void 0!==e.pannerAttr.coneOuterGain?e.pannerAttr.coneOuterGain:this._coneOuterGain,distanceModel:void 0!==e.pannerAttr.distanceModel?e.pannerAttr.distanceModel:this._distanceModel,maxDistance:void 0!==e.pannerAttr.maxDistance?e.pannerAttr.maxDistance:this._maxDistance,refDistance:void 0!==e.pannerAttr.refDistance?e.pannerAttr.refDistance:this._refDistance,rolloffFactor:void 0!==e.pannerAttr.rolloffFactor?e.pannerAttr.rolloffFactor:this._rolloffFactor,panningModel:void 0!==e.pannerAttr.panningModel?e.pannerAttr.panningModel:this._panningModel})}else 2===r.length&&(e=r[0],n=parseInt(r[1],10));for(var i=this._getSoundIds(n),a=0;a<i.length;a++)if(o=this._soundById(i[a])){var s=o._pannerAttr;s={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:s.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:s.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:s.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:s.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:s.maxDistance,refDistance:void 0!==e.refDistance?e.refDistance:s.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:s.rolloffFactor,panningModel:void 0!==e.panningModel?e.panningModel:s.panningModel};var u=o._panner;u?(u.coneInnerAngle=s.coneInnerAngle,u.coneOuterAngle=s.coneOuterAngle,u.coneOuterGain=s.coneOuterGain,u.distanceModel=s.distanceModel,u.maxDistance=s.maxDistance,u.refDistance=s.refDistance,u.rolloffFactor=s.rolloffFactor,u.panningModel=s.panningModel):(o._pos||(o._pos=this._pos||[0,0,-.5]),t(o,"spatial"))}return this},Sound.prototype.init=function(e){return function(){var t=this._parent;this._orientation=t._orientation,this._stereo=t._stereo,this._pos=t._pos,this._pannerAttr=t._pannerAttr,e.call(this),this._stereo?t.stereo(this._stereo):this._pos&&t.pos(this._pos[0],this._pos[1],this._pos[2],this._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var t=this._parent;return this._orientation=t._orientation,this._pos=t._pos,this._pannerAttr=t._pannerAttr,e.call(this)}}(Sound.prototype.reset);var t=function(e,t){"spatial"===(t=t||"spatial")?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}()}).call(this,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";n.r(t);var o=n(0);const r=new o.Howl({autoplay:!0,loop:!0,src:"../assets/sound/bensound-epic.mp3"});document.addEventListener("DOMContentLoaded",()=>{r.play()})}]);