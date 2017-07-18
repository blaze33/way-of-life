!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="https://lab.openbloc.fr/way-of-life/",t(t.s=1)}([function(e,t,n){"use strict";function i(e,t,n){e.set(t-1,n),e.set(t,n+2),e.set(t+1,n-1),e.set(t+1,n),e.set(t+1,n+3),e.set(t+1,n+4),e.set(t+1,n+5)}function r(e,t,n){e.set(t-1,n),e.set(t,n-1),e.set(t,n),e.set(t,n+1),e.set(t+1,n)}function s(e,t,n){e.set(t-1,n-1,0),e.set(t-1,n,0),e.set(t-1,n+1,0),e.set(t,n-1,0),e.set(t,n,0),e.set(t,n+1,0),e.set(t+1,n-1,0),e.set(t+1,n,0),e.set(t+1,n+1,0)}Object.defineProperty(t,"__esModule",{value:!0}),t.acorn=i,t.cross=r,t.erase=s},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var r=n(2),s=i(r),o=n(0),c=n(3),l=i(c),u=n(4),a=i(u),h=n(5),d=i(h),f={canvasSelector:"#universe",fpsNodeSelector:"#fps-info",playButtonSelector:"#ctrl-play-pause",hideButtonSelector:"#ctrl-hide-show",switchEngineSelector:"#ctrl-engine",desiredFPS:30,pixelsPerCell:5,strokeStyle:"rgba(255,118,5,0.5)",fillStyle:"rgba(222,122,39,0.5)",showText:!0,useWasm:!1},p=d.default.parse(window.location.search);(p.desiredFPS||p.pixelsperCell)&&(f.showText=!1);var v=Object.assign(f,p);v.desiredFPS=parseInt(v.desiredFPS,10),v.pixelsperCell=parseInt(v.pixelsperCell,10);var y=function(){var e,t=document.querySelector(v.canvasSelector),n=~~(t.clientWidth/v.pixelsPerCell),i=~~(t.clientHeight/v.pixelsPerCell),r=new s.default(n,i),c=new s.default(n,i);e=!0===v.useWasm?r:c,window.engine=e;var u=new l.default(t,e,{desiredFPS:v.desiredFPS,pixelsPerCell:v.pixelsPerCell,fpsNode:document.querySelector(v.fpsNodeSelector),strokeStyle:v.strokeStyle,fillStyle:v.fillStyle}),h=function(e){u.togglePlay(),e.target.textContent="Pause"===e.target.textContent?"Play":"Pause"},d=function(e){document.querySelector(".text-content").classList.toggle("hidden"),e.target.textContent="Hide text"===e.target.textContent?"Show text":"Hide text"};!1===v.showText&&function(){document.querySelector(".text-content").classList.add("hidden"),document.querySelector(v.hideButtonSelector).textContent="Show text"}();var f=function(t){e=e instanceof s.default?c:r,u.engine=e,p.engine=e,t.target.textContent="Use js engine"===t.target.textContent?"Use wasm engine":"Use js engine"},p=new a.default(t,e,u);p.addEvents([{selector:v.playButtonSelector,eventType:"click",callback:h},{selector:v.hideButtonSelector,eventType:"click",callback:d},{selector:v.switchEngineSelector,eventType:"click",callback:f}]);!function t(){!0!==e.module.calledRun?window.setTimeout(t.bind(void 0),100):(r.init(),c.init(),(0,o.acorn)(r,~~(i/2),~~(n/2)),(0,o.acorn)(r,0,0),(0,o.acorn)(c,~~(i/2),~~(n/2)),(0,o.acorn)(c,0,0),u.start())}()};window.onload=y},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=function(){function e(t,n){i(this,e),this.wasm=!1,this.width=t,this._width=t+2,this.height=n,this._height=n+2,this.module={calledRun:!0}}return r(e,[{key:"init",value:function(){var e=new ArrayBuffer(this._width*this._height);this._current=new Uint8Array(e);var t=new ArrayBuffer(this._width*this._height);this._next=new Uint8Array(t),this.module={calledRun:!0}}},{key:"index",value:function(e,t){return e*this._width+t}},{key:"cell",value:function(e,t){return this._current[this.index(e,t)]}},{key:"cellSafe",value:function(e,t){return this._current[(e+1)*this._width+t+1]}},{key:"next",value:function(e,t){return this._next[this.index(e,t)]}},{key:"loopCurrentState",value:function(){for(var e=1;e<this._width+1;e++)this._current[this.index(0,e)]=this._current[this.index(this._height-2,e)],this._current[this.index(this._height-1,e)]=this._current[this.index(1,e)];for(var t=1;t<this._height+1;t++)this._current[this.index(t,0)]=this._current[this.index(t,this._width-2)],this._current[this.index(t,this._width-1)]=this._current[this.index(t,1)];this._current[this.index(0,0)]=this._current[this.index(this._height-2,this._width-2)],this._current[this.index(0,this._width-1)]=this._current[this.index(this._height-2,1)],this._current[this.index(this._height-1,0)]=this._current[this.index(1,this._width-2)],this._current[this.index(this._height-1,this._width-1)]=this._current[this.index(1,1)]}},{key:"computeNextState",value:function(){var e=void 0,t=void 0,n=void 0,i=void 0,r=void 0,s=void 0;this.loopCurrentState();for(var o=1;o<this._height-1;o++){t=(o-1)*this._width,n=(o+1)*this._width,i=o*this._width;for(var c=1;c<this._width-1;c++)r=c-1,s=c+1,e=this._current[t+r],e+=this._current[t+c],e+=this._current[t+s],e+=this._current[i+r],e+=this._current[i+s],e+=this._current[n+r],e+=this._current[n+c],e+=this._current[n+s],this._next[i+c]=3===e?1:2===e?this._current[i+c]:0}this._current.set(this._next)}},{key:"set",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;this._current[this.index(e,t)]=n}},{key:"setNext",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;this._next[this.index(e,t)]=n}}]),e}();t.default=s},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=function(){function e(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};i(this,e),this.canvas=t,this.context=t.getContext("2d"),this.engine=n,this.pixelsPerCell=r.pixelsPerCell||5,this.desiredFPS=r.desiredFPS||30,this.fpsNode=r.fpsNode||!1,this.strokeStyle=r.strokeStyle||"rgba(255,118,5,0.5)",this.fillStyle=r.fillStyle||"rgba(222,122,39,0.5)",this.play=!1,this.fpsTime=0,this.engineTime=0,this.fps=0,this.frameNumber=0,this.canvas.width=this.engine.width*this.pixelsPerCell,this.canvas.height=this.engine.height*this.pixelsPerCell}return r(e,[{key:"togglePlay",value:function(){this.play=!this.play}},{key:"draw",value:function(e){window.requestAnimationFrame(this.draw.bind(this)),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.strokeStyle=this.strokeStyle,this.context.fillStyle=this.fillStyle;for(var t=this.pixelsPerCell>1,n=0;n<this.engine.height;n++)for(var i=0;i<this.engine.width;i++)if(this.engine.cellSafe(n,i)){var r=this.pixelsPerCell*i,s=this.pixelsPerCell*n;this.context.strokeRect(r,s,this.pixelsPerCell,this.pixelsPerCell),t&&this.context.fillRect(r,s,this.pixelsPerCell,this.pixelsPerCell)}var o=e-this.engineTime;if(o>1e3/this.desiredFPS&&this.play&&(this.engine.computeNextState(),this.frameNumber+=1,this.engineTime=e-o%(1e3/this.desiredFPS)),this.fpsNode){var c=e-this.fpsTime;c>500&&(this.fps=1e3/c*this.frameNumber,this.fpsNode.textContent=this.fps.toFixed(2)+" FPS",this.fpsTime=e,this.frameNumber=0)}}},{key:"start",value:function(){this.engine.computeNextState(),this.play=!0,window.requestAnimationFrame(this.draw.bind(this))}}]),e}();t.default=s},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(0),o=function(){function e(t,n,r){var s=this;i(this,e),this.canvas=t,this.engine=n,this.renderer=r,this.mouseDown=!1,this.listeners=[],this.addEvents([{eventType:"mousedown",callback:this.mouseIsDown.bind(this)},{eventType:"mouseup",callback:this.mouseIsUp.bind(this)},{eventType:"mousemove",callback:this.addCells.bind(this)},{eventType:"touchmove",callback:function(e){for(var t=0;t<e.touches.length;t++)s.addCells(e.touches[t],!0)}}])}return r(e,[{key:"addEvents",value:function(){var e=this;(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(t){e.listeners.push(t);var n=document;t.selector&&(n=document.querySelector(t.selector)),n&&n.addEventListener(t.eventType,t.callback)})}},{key:"addCells",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=this.canvas.getBoundingClientRect(),i={x:(e.clientX-n.left)/(n.right-n.left)*this.canvas.clientWidth,y:(e.clientY-n.top)/(n.bottom-n.top)*this.canvas.clientHeight},r={i:~~(i.y/this.renderer.pixelsPerCell),j:~~(i.x/this.renderer.pixelsPerCell)};(this.mouseDown||t)&&(e.ctrlKey?(0,s.erase)(this.engine,r.i,r.j):(0,s.cross)(this.engine,r.i,r.j))}},{key:"mouseIsDown",value:function(e){0===e.button&&(this.mouseDown=!0,this.addCells(e))}},{key:"mouseIsUp",value:function(e){this.mouseDown=!1}}]),e}();t.default=o},function(e,t,n){"use strict";function i(e){switch(e.arrayFormat){case"index":return function(t,n,i){return null===n?[s(t,e),"[",i,"]"].join(""):[s(t,e),"[",s(i,e),"]=",s(n,e)].join("")};case"bracket":return function(t,n){return null===n?s(t,e):[s(t,e),"[]=",s(n,e)].join("")};default:return function(t,n){return null===n?s(t,e):[s(t,e),"=",s(n,e)].join("")}}}function r(e){var t;switch(e.arrayFormat){case"index":return function(e,n,i){if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t)return void(i[e]=n);void 0===i[e]&&(i[e]={}),i[e][t[1]]=n};case"bracket":return function(e,n,i){return t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0===i[e]?void(i[e]=[n]):void(i[e]=[].concat(i[e],n)):void(i[e]=n)};default:return function(e,t,n){if(void 0===n[e])return void(n[e]=t);n[e]=[].concat(n[e],t)}}}function s(e,t){return t.encode?t.strict?l(e):encodeURIComponent(e):e}function o(e){return Array.isArray(e)?e.sort():"object"===(void 0===e?"undefined":c(e))?o(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l=n(6),u=n(7);t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){t=u({arrayFormat:"none"},t);var n=r(t),i=Object.create(null);return"string"!=typeof e?i:(e=e.trim().replace(/^(\?|#|&)/,""))?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),r=t.shift(),s=t.length>0?t.join("="):void 0;s=void 0===s?null:decodeURIComponent(s),n(decodeURIComponent(r),s,i)}),Object.keys(i).sort().reduce(function(e,t){var n=i[t];return Boolean(n)&&"object"===(void 0===n?"undefined":c(n))&&!Array.isArray(n)?e[t]=o(n):e[t]=n,e},Object.create(null))):i},t.stringify=function(e,t){t=u({encode:!0,strict:!0,arrayFormat:"none"},t);var n=i(t);return e?Object.keys(e).sort().map(function(i){var r=e[i];if(void 0===r)return"";if(null===r)return s(i,t);if(Array.isArray(r)){var o=[];return r.slice().forEach(function(e){void 0!==e&&o.push(n(i,e,o.length))}),o.join("&")}return s(i,t)+"="+s(r,t)}).filter(function(e){return e.length>0}).join("&"):""}},function(e,t,n){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},function(e,t,n){"use strict";function i(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var r=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable;e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},n=0;n<10;n++)t["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(e){return t[e]}).join(""))return!1;var i={};return"abcdefghijklmnopqrst".split("").forEach(function(e){i[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},i)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var n,c,l=i(e),u=1;u<arguments.length;u++){n=Object(arguments[u]);for(var a in n)s.call(n,a)&&(l[a]=n[a]);if(r){c=r(n);for(var h=0;h<c.length;h++)o.call(n,c[h])&&(l[c[h]]=n[c[h]])}}return l}}]);
//# sourceMappingURL=lab-bundle.js.map?d53862f3