/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var utilbase;
(function (utilbase) {
    var Util = /** @class */ (function () {
        function Util() {
        }
        /**
         * typeof方法特性如下
         * @method typeof
         * @param element:string
         */
        Util.prototype.typeof = function (element) {
            return typeof element === 'string' ? document.querySelector(element) : element;
        };
        /**
         * 通过Util基类中的addEvent方法兼容addEventListener和attachEvent并提供该接口
         * @method addEvent
         * @param element
         * @param type
         * @param function fn
         */
        Util.prototype.addEvent = function (element, type, fn) {
            if (document.addEventListener) {
                element.addEventListener(type, fn, false);
                return element;
            }
            else if (document.attachEvent) {
                var bound = function () {
                    return fn.apply(element, arguments); // 不能使用箭头函数表达式(特性)
                };
                element.attachEvent('on' + type, bound);
                return bound;
            }
        };
        /**
         * 通过util类封装设置自定义属性方法
         * @method addAttr
         * @param element
         * @param nature
         * @param className
         */
        Util.prototype.addAttr = function (element, nature, className) {
            return element.setAttribute(nature, className);
        };
        /**
         * 通过util类封装删除自定义属性方法
         * @method removeAttr
         * @param element
         * @param nature
         * @param className
         */
        Util.prototype.removeAttr = function (element, nature, className) {
            return element.removeAttribute(nature, className);
        };
        /**
         * 通过util类封装添加样式的方法放在css函数里
         * @method css
         * @param element
         * @param obj
         */
        Util.prototype.css = function (element, obj) {
            for (var i in obj) {
                element.style[i] = obj[i];
            }
        };
        // 设置元素透明度,透明度值按IE规则计,即0~100
        Util.prototype.setopacity = function (ev, value) {
            ev.filters ? (ev.style.filter = "alpha(opacity=" + value + ")") : (ev.style.opacity = value / 100);
        };
        return Util;
    }());
    utilbase.Util = Util;
})(utilbase || (utilbase = {}));

var colorpick;
(function (colorpick) {
    var Cpicker = /** @class */ (function () {
        function Cpicker(name) {
            this.utilbasename = new utilbase.Util();
            this.elemWrap = null; // 最外层容器
            this.fixedBg = null; // 拾色器后面固定定位的透明div 用于点击隐藏拾色器
            this.elemColorPancel = null; // 色彩面板
            this.elemPicker = null; // 拾色器色块按钮
            this.elemBarPicker1 = null; // 颜色条
            this.elemBarPicker2 = null; // 透明条
            this.elemHexInput = null; // 显示hex的表单
            this.elemShowColor = null; // 显示当前颜色
            this.elemOpacityPancel = null; // 透明度背景元素
            this.elemShowModeBtn = null; // 切换输入框模式按钮
            this.elemInputWrap = null; // 输入框外层容器
            this.pancelLeft = 0;
            this.pancelTop = 0;
            this.downX = 0;
            this.downY = 0;
            this.moveX = 0;
            this.moveY = 0;
            this.pointLeft = 0;
            this.pointTop = 0;
            this.currentMode = 'hex';
            this.Opt = {
                bindClass: '',
                initColor: 'rgb(255,0,0)',
                allMode: ['hex', 'rgb'],
                change: function (elem, hex) { return; }
            };
            this.rgba = {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            };
            this.hsb = {
                h: 0,
                s: 100,
                b: 100
            };
            this.bindElem = this.utilbasename.typeof(name.elem);
            this.cpinit();
        }
        Cpicker.prototype.cpinit = function () {
            this.cpinit_total();
        };
        Cpicker.prototype.create = function (opt) {
            for (var prop in opt) {
                this.Opt[prop] = opt[prop];
            }
            var elemArr = this.utilbasename.typeof(this.Opt.bindClass);
            for (var i = 0; i < elemArr.length; i++) {
                elemArr[i].colorpicker = new Cpicker(elemArr[i]);
            }
        };
        Cpicker.prototype.cpinit_total = function () {
            var _this = this;
            var initColor = this.Opt.initColor;
            var rgb = initColor.slice(4, -1).split(',');
            var body = document.getElementsByTagName('body')[0];
            var div = document.createElement('div');
            this.rgba.r = parseInt(rgb[0], 0);
            this.rgba.g = parseInt(rgb[1], 0);
            this.rgba.b = parseInt(rgb[2], 0);
            div.innerHTML = this.cprender();
            body.appendChild(div);
            this.elemWrap = div;
            this.fixedBg = div.children[0];
            this.elemColorPancel = div.getElementsByClassName('color-pancel')[0];
            this.pancelWidth = this.elemColorPancel.offsetWidth;
            this.pancelHeight = this.elemColorPancel.offsetHeight;
            this.elemPicker = div.getElementsByClassName('pickerBtn')[0];
            this.elemShowColor = div.getElementsByClassName('colorpicker-showColor')[0];
            this.elemBarPicker1 = div.getElementsByClassName('colorBar-color-picker')[0];
            this.elemBarPicker2 = div.getElementsByClassName('colorBar-opacity-picker')[0];
            this.elemHexInput = div.getElementsByClassName('colorpicker-hexInput')[0];
            this.elemShowModeBtn = div.getElementsByClassName('colorpicker-showModeBtn')[0];
            this.elemInputWrap = div.getElementsByClassName('colorpicker-inputWrap')[0];
            this.elemOpacityPancel = this.elemBarPicker2.parentNode.parentNode.children[1];
            var elem = this.bindElem;
            var top = elem.offsetTop;
            var left = elem.offsetLeft;
            while (elem.offsetParent) {
                top += elem.offsetParent.offsetTop;
                left += elem.offsetParent.offsetLeft;
                elem = elem.offsetParent;
            }
            this.pancelLeft = left;
            this.pancelTop = top + this.bindElem.offsetHeight;
            this.utilbasename.css(div, {
                position: 'absolute',
                'z-index': 2,
                display: 'none',
                left: left + 'px',
                top: top + this.bindElem.offsetHeight + 'px'
            });
            this.bindMove(this.elemColorPancel, this.setPosition, true);
            this.bindMove(this.elemBarPicker1.parentNode, this.setBar, false);
            this.bindMove(this.elemBarPicker2.parentNode, this.setBar, false);
            this.utilbasename.addEvent(this.bindElem, 'click', function () {
                _this.show();
            });
            this.utilbasename.addEvent(this.fixedBg, 'click', function (e) {
                _this.hide();
            });
            this.utilbasename.addEvent(this.elemShowModeBtn, 'click', function () {
                _this.switch_current_mode();
            });
            this.utilbasename.addEvent(this.elemWrap, 'input', function (e) {
                // tslint:disable-next-line:one-variable-per-declaration
                var target = e.target, value = target.value;
                _this.setColorByInput(value);
            });
        };
        Cpicker.prototype.cprender = function () {
            var tpl = '<div style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px;"></div>' +
                '<div style="position: inherit; z-index: 100;">' +
                '<div class="colorpicker-pancel" style="background: rgb(255, 255, 255); border-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px; box-sizing: initial; width: 225px; font-family: Menlo;"><div style="width: 100%; padding-bottom: 55%; position: relative; border-radius: 2px 2px 0px 0px; overflow: hidden;">' +
                '<div class="color-pancel" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: rgb(' +
                this.rgba.r +
                ',' +
                this.rgba.g +
                ',' +
                this.rgba.b +
                ')">' +
                '<style>' +
                '.saturation-white {background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));background: linear-gradient(to right, #fff, rgba(255,255,255,0));}' +
                '.saturation-black {background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));background: linear-gradient(to top, #000, rgba(0,0,0,0));}' +
                '</style>' +
                '<div class="saturation-white" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;">' +
                '<div class="saturation-black" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;"></div>' +
                '<div class="pickerBtn" style="position: absolute; top: 0%; left: 100%; cursor: default;">' +
                '<div style="width: 12px; height: 12px; border-radius: 6px; box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset; transform: translate(-6px, -6px);"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div style="padding: 16px 16px 12px;">' +
                '<div class="flexbox-fix" style="display: flex;">' +
                '<div style="width: 32px;">' +
                '<div style="margin-top: 6px; width: 16px; height: 16px; border-radius: 8px; position: relative; overflow: hidden;">' +
                '<div class="colorpicker-showColor" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset; background:rgb(' +
                this.rgba.r +
                ',' +
                this.rgba.g +
                ',' +
                this.rgba.b +
                '); z-index: 2;"></div>' +
                '<div class="" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==&quot;) left center;"></div></div></div><div style="-webkit-box-flex: 1; flex: 1 1 0%;"><div style="height: 10px; position: relative; margin-bottom: 8px;"><div style="position: absolute; top: 0px;' +
                'right: 0px; bottom: 0px; left: 0px;"><div class="hue-horizontal" style="padding: 0px 2px; position: relative; height: 100%;">' +
                '<style>' +
                '.hue-horizontal {background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);}' +
                '.hue-vertical {background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,#0ff 50%, #00f 67%, #f0f 83%, #f00 100%);background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,#0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);}' +
                '</style>' +
                '<div  class="colorBar-color-picker" style="position: absolute; left: 0%;">' +
                '<div style="width: 12px; height: 12px; border-radius: 6px; transform: translate(-6px, -1px); background-color: rgb(248, 248, 248); box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 4px 0px;">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div style="height: 10px; position: relative;">' +
                '<div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;">' +
                '<div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; overflow: hidden;">' +
                '<div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==&quot;) left center;"></div>' +
                '</div>' +
                '<div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: linear-gradient(to right, rgba(' +
                this.rgba.r +
                ',' +
                this.rgba.g +
                ',' +
                this.rgba.b +
                ',0) 0%, rgb(' +
                this.rgba.r +
                ',' +
                this.rgba.g +
                ',' +
                this.rgba.b +
                ') 100%);"></div>' +
                '<div style="position: relative; height: 100%; margin: 0px 3px;">' +
                '<div class="colorBar-opacity-picker" style="position: absolute; left: 100%;">' +
                '<div style="width: 12px; height: 12px; border-radius: 6px; transform: translate(-6px, -1px); background-color: rgb(248, 248, 248); box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 4px 0px;"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="flexbox-fix" style="padding-top: 16px; display: flex;">' +
                '<div class="flexbox-fix colorpicker-inputWrap" style="-webkit-box-flex: 1; flex: 1 1 0%; display: flex; margin-left: -6px;">';
            tpl += this.getInputTpl();
            tpl +=
                '</div>' +
                    '<div class="colorpicker-showModeBtn" style="width: 32px; text-align: right; position: relative;">' +
                    '<div style="margin-right: -4px;  cursor: pointer; position: relative;">' +
                    '<svg viewBox="0 0 24 24" style="width: 24px; height: 24px; border: 1px solid transparent; border-radius: 5px;"><path fill="#333" d="M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"></path><path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15Z"></path></svg>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            return tpl;
        };
        Cpicker.prototype.getInputTpl = function () {
            var currentModeHtml = '';
            switch (this.currentMode) {
                case 'hex':
                    var hex = '#' + this.rgbToHex(this.HSBToRGB(this.hsb));
                    currentModeHtml +=
                        '<div style="padding-left: 6px; width: 100%;">' +
                            '<div style="position: relative;">' +
                            '<input class="colorpicker-hexInput" value="' +
                            hex +
                            '" spellcheck="false" style="font-size: 11px; color: rgb(51, 51, 51); width: 100%; border-radius: 2px; border: none; box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset; height: 21px; text-align: center;">' +
                            '<span style="text-transform: uppercase; font-size: 11px; line-height: 11px; color: rgb(150, 150, 150); text-align: center; display: block; margin-top: 12px;">hex</span>' +
                            '</div>' +
                            '</div>';
                    break;
                case 'rgb':
                    for (var i = 0; i < 3; i++) {
                        currentModeHtml +=
                            '<div style="padding-left: 6px; width: 100%;">' +
                                '<div style="position: relative;">' +
                                '<input class="colorpicker-hexInput" value="' +
                                this.rgba['rgb'[i]] +
                                '" spellcheck="false" style="font-size: 11px; color: rgb(51, 51, 51); width: 100%; border-radius: 2px; border: none; box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset; height: 21px; text-align: center;">' +
                                '<span style="text-transform: uppercase; font-size: 11px; line-height: 11px; color: rgb(150, 150, 150); text-align: center; display: block; margin-top: 12px;">' +
                                'rgb'[i] +
                                '</span>' +
                                '</div>' +
                                '</div>';
                    }
                    break;
                default:
            }
            return currentModeHtml;
        };
        Cpicker.prototype.setPosition = function (x, y) {
            var LEFT = parseInt(x + -this.pancelLeft, 0);
            var TOP = parseInt(y + -this.pancelTop, 0);
            this.pointLeft = Math.max(0, Math.min(LEFT, this.pancelWidth));
            this.pointTop = Math.max(0, Math.min(TOP, this.pancelHeight));
            this.utilbasename.css(this.elemPicker, {
                left: this.pointLeft + 'px',
                top: this.pointTop + 'px'
            });
            this.hsb.s = parseInt('' + (100 * this.pointLeft) / this.pancelWidth, 0);
            this.hsb.b = parseInt('' + (100 * (this.pancelHeight - this.pointTop)) / this.pancelHeight, 0);
            this.setShowColor();
            this.setValue(this.rgba);
        };
        Cpicker.prototype.setBar = function (elem, x) {
            var elemBar = elem.getElementsByTagName('div')[0];
            var rect = elem.getBoundingClientRect();
            var elemWidth = elem.offsetWidth;
            var X = Math.max(0, Math.min(x - rect.x, elemWidth));
            if (elemBar === this.elemBarPicker1) {
                this.utilbasename.css(elemBar, {
                    left: X + 'px'
                });
                this.hsb.h = parseInt('' + (360 * X) / elemWidth, 0);
            }
            else {
                this.utilbasename.css(elemBar, {
                    left: X + 'px'
                });
                this.rgba.a = X / elemWidth;
            }
            this.setPancelColor(this.hsb.h);
            this.setShowColor();
            this.setValue(this.rgba);
        };
        Cpicker.prototype.setPancelColor = function (h) {
            var rgb = this.HSBToRGB({ h: h, s: 100, b: 100 });
            this.utilbasename.css(this.elemColorPancel, {
                background: 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + this.rgba.a + ')'
            });
        };
        Cpicker.prototype.setShowColor = function () {
            var rgb = this.HSBToRGB(this.hsb);
            this.rgba.r = rgb.r;
            this.rgba.g = rgb.g;
            this.rgba.b = rgb.b;
            this.utilbasename.css(this.elemShowColor, {
                background: 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + this.rgba.a + ')'
            });
            this.utilbasename.css(this.elemOpacityPancel, {
                background: 'linear-gradient(to right, rgba(' +
                    rgb.r +
                    ',' +
                    rgb.g +
                    ',' +
                    rgb.b +
                    ',0) 0%, rgba(' +
                    rgb.r +
                    ',' +
                    rgb.g +
                    ',' +
                    rgb.b +
                    ',1))'
            });
        };
        Cpicker.prototype.setValue = function (rgb) {
            var hex = '#' + this.rgbToHex(rgb);
            this.elemInputWrap.innerHTML = this.getInputTpl();
            this.Opt.change(this.bindElem, hex);
        };
        Cpicker.prototype.setColorByInput = function (value) {
            switch (this.currentMode) {
                case 'hex':
                    value = value.slice(1);
                    if (value.length === 3) {
                        value = '#' + value[0] + value[0] + value[1] + value[1] + value[2] + value[2];
                        this.hsb = this.hexToHsb(value);
                    }
                    else if (value.length === 6) {
                        this.hsb = this.hexToHsb(value);
                    }
                    break;
                case 'rgb':
                    // tslint:disable-next-line:one-variable-per-declaration
                    var inputs = this.elemWrap.getElementsByTagName('input'), rgb = {
                        r: inputs[0].value ? parseInt(inputs[0].value, 0) : 0,
                        g: inputs[1].value ? parseInt(inputs[1].value, 0) : 0,
                        b: inputs[2].value ? parseInt(inputs[2].value, 0) : 0
                    };
                    this.hsb = this.rgbToHsb(rgb);
            }
            this.changeViewByHsb();
        };
        Cpicker.prototype.changeViewByHsb = function () {
            var hex = '#' + this.rgbToHex(this.HSBToRGB(this.hsb));
            this.pointLeft = parseInt('' + (this.hsb.s * this.pancelWidth) / 100, 0);
            this.pointTop = parseInt('' + ((100 - this.hsb.b) * this.pancelHeight) / 100, 0);
            this.utilbasename.css(this.elemPicker, {
                left: this.pointLeft + 'px',
                top: this.pointTop + 'px'
            });
            this.setPancelColor(this.hsb.h);
            this.setShowColor();
            this.utilbasename.css(this.elemBarPicker1, {
                left: (this.hsb.h / 360) * this.elemBarPicker1.parentNode.offsetWidth + 'px'
            });
        };
        Cpicker.prototype.switch_current_mode = function () {
            this.currentMode = this.currentMode === 'hex' ? 'rgb' : 'hex';
            this.elemInputWrap.innerHTML = this.getInputTpl();
        };
        Cpicker.prototype.bindMove = function (elem, fn, bool) {
            var _this = this;
            this.utilbasename.addEvent(elem, 'mousedown', function (e) {
                _this.downX = e.pageX;
                _this.downY = e.pageY;
                bool ? fn.call(_this, _this.downX, _this.downY) : fn.call(_this, elem, _this.downX, _this.downY);
                var mousemove = function (e) {
                    _this.moveX = e.pageX;
                    _this.moveY = e.pageY;
                    bool ? fn.call(_this, _this.moveX, _this.moveY) : fn.call(_this, elem, _this.moveX, _this.moveY);
                    e.preventDefault();
                };
                _this.utilbasename.addEvent(document, 'mousemove', mousemove);
                var mouseup = function (e) {
                    document.removeEventListener('mousemove', mousemove, false);
                    document.removeEventListener('mouseup', mouseup, false);
                };
                _this.utilbasename.addEvent(document, 'mouseup', mouseup);
            });
        };
        Cpicker.prototype.show = function () {
            this.utilbasename.css(this.elemWrap, {
                display: 'block'
            });
        };
        Cpicker.prototype.hide = function () {
            this.utilbasename.css(this.elemWrap, {
                display: 'none'
            });
        };
        Cpicker.prototype.HSBToRGB = function (hsb) {
            var rgb = {};
            var h = Math.round(hsb.h);
            var s = Math.round((hsb.s * 255) / 100);
            var v = Math.round((hsb.b * 255) / 100);
            if (s === 10) {
                rgb.r = rgb.g = rgb.b = v;
            }
            else {
                var t1 = v;
                var t2 = ((255 - s) * v) / 255;
                var t3 = ((t1 - t2) * (h % 60)) / 60;
                if (h === 360)
                    h = 0;
                if (h < 60) {
                    rgb.r = t1;
                    rgb.b = t2;
                    rgb.g = t2 + t3;
                }
                else if (h < 120) {
                    rgb.g = t1;
                    rgb.b = t2;
                    rgb.r = t1 - t3;
                }
                else if (h < 180) {
                    rgb.g = t1;
                    rgb.r = t2;
                    rgb.b = t2 + t3;
                }
                else if (h < 240) {
                    rgb.b = t1;
                    rgb.r = t2;
                    rgb.g = t1 - t3;
                }
                else if (h < 300) {
                    rgb.b = t1;
                    rgb.g = t2;
                    rgb.r = t2 + t3;
                }
                else if (h < 360) {
                    rgb.r = t1;
                    rgb.g = t2;
                    rgb.b = t1 - t3;
                }
                else {
                    rgb.r = 0;
                    rgb.g = 0;
                    rgb.b = 0;
                }
            }
            return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
        };
        Cpicker.prototype.rgbToHex = function (rgb) {
            var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
            hex.map(function (str, i) {
                if (str.length === 1) {
                    hex[i] = '0' + str;
                }
            });
            return hex.join('');
        };
        Cpicker.prototype.hexToRgb = function (hexcolor) {
            var hex = parseInt(hexcolor.indexOf('#') > -1 ? hexcolor.substring(1) : hexcolor, 16);
            return {
                r: hex >> 16,
                g: (hex & 0x00ff00) >> 8,
                b: hex & 0x0000ff
            };
        };
        Cpicker.prototype.hexToHsb = function (hex) {
            return this.rgbToHsb(this.hexToRgb(hex));
        };
        Cpicker.prototype.rgbToHsb = function (rgb) {
            var hsb = { h: 0, s: 0, b: 0 };
            var min = Math.min(rgb.r, rgb.g, rgb.b);
            var max = Math.max(rgb.r, rgb.g, rgb.b);
            var delta = max - min;
            hsb.b = max;
            hsb.s = max !== 0 ? (255 * delta) / max : 0;
            if (hsb.s !== 0) {
                if (rgb.r === max) {
                    hsb.h = (rgb.g - rgb.b) / delta;
                }
                else if (rgb.g === max) {
                    hsb.h = 2 + (rgb.b - rgb.r) / delta;
                }
                else {
                    hsb.h = 4 + (rgb.r - rgb.g) / delta;
                }
            }
            else
                hsb.h = -1;
            hsb.h *= 60;
            if (hsb.h < 0)
                hsb.h += 360;
            hsb.s *= 100 / 255;
            hsb.b *= 100 / 255;
            return hsb;
        };
        return Cpicker;
    }());
    colorpick.Cpicker = Cpicker;
})(colorpick || (colorpick = {}));

// import { GBoardApi } from '../types/index'
var Component;
(function (Component) {
    // 类装饰器可传参
    function addExtend(params) {
        params.prototype.utilbasename = null;
        params.prototype.noticeWrap = null;
        params.prototype.noticeBtn = null;
        params.prototype.noticeTitle = undefined;
        params.prototype.noticecontent = undefined;
        params.prototype.vuinit = function (vutitle, vucontent, speed) {
            var _this = this;
            var div = document.createElement('div');
            var style = document.createElement('style');
            var head = document.getElementsByTagName('head')[0];
            var body = document.getElementsByTagName('body')[0];
            this.utilbasename = new utilbase.Util();
            this.noticeWrap = div.getElementsByClassName('notification')[0];
            this.noticeBtn = div.getElementsByClassName('noticeBtn')[0];
            this.noticeTitle = vutitle;
            this.noticecontent = vucontent;
            var vuNotice = this.vuNotice(this.noticeTitle, this.noticecontent);
            speed = 4000; // 默认弹框隐藏显示速度
            style.innerHTML = this.noticeStyle();
            div.innerHTML = vuNotice;
            head.appendChild(style);
            body.appendChild(div);
            var timer = setInterval(function () {
                div.remove(); // 定时器删除自身
                // console.log(1)
            }, speed);
            this.utilbasename.addEvent(window, 'load', function () {
                setInterval(timer);
            });
            this.utilbasename.addEvent(div.getElementsByClassName('noticeBtn')[0], 'click', function () {
                // div.remove() // 删除自身
                _this.fadeOut(div);
            });
            this.utilbasename.addEvent(div.getElementsByClassName('notification')[0], 'mouseenter', function () {
                clearInterval(timer); // 清除定时器
            });
            // this.utilbasename.addEvent(div.getElementsByClassName('notification')[0], 'mouseleave', function () {
            //     // 移出鼠标后删除自身
            //     div.remove();
            // });
        };
        params.prototype.vuNotice = function (title, content) {
            var vunTitle = title;
            var vunContent = content;
            var tpl = "<div class=\"notification\" style=\"position: absolute; top: 10px;z-index: 1000;\">\n                <div class=\"noticegrounp\">\n                    <h2 class=\"notice_title\">\n                        " + vunTitle + "\n                    </h2>\n                    <div class=\"noticecontent\">\n                        <p>\n                            " + vunContent + "\n                        </p>\n                    </div>\n                    <div class=\"noticeBtn\">\n                    </div>\n                </div>\n            </div>";
            return tpl;
        };
        params.prototype.noticeStyle = function () {
            var nstyle = "\n            .notification {\n            display: flex;\n            width: 330px;\n            padding: 14px 26px 14px 13px;\n            border-radius: 8px;\n            box-sizing: border-box;\n            border: 1px solid #ebeef5;\n            position: fixed;\n            right: 20px;\n            background-color: #fff;\n            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);\n            transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;\n            overflow: hidden;\n            }\n            .noticegrounp{\n            margin-left: 13px;\n            margin-right: 8px;\n            }\n            .notice_title{\n            font-weight: 700;\n            font-size: 16px;\n            color: #303133;\n            margin: 0;\n            }\n            .notciecontent{\n            font-size: 14px;\n            line-height: 21px;\n            margin: 6px 0 0;\n            color: #606266;\n            text-align: justify;\n            }\n            .noticecontent p{\n            margin: 0;\n            }\n            .noticeBtn{\n            position: absolute;\n            top: 18px;\n            right: 15px;\n            width: 10px;\n            height: 10px;\n            cursor: pointer;\n            background: #000;\n            color: #909399;\n            font-size: 16px;\n            }\n            ";
            return nstyle;
        };
        params.prototype.fadeOut = function (elem) {
            // 淡出功能
            if (elem.style.opacity !== 0) {
                var speed = 20;
                var num_1 = 10;
                var opacityst_1 = setInterval(function () {
                    num_1--;
                    elem.style.opacity = num_1 / 10;
                    if (num_1 <= 0) {
                        clearInterval(opacityst_1);
                        elem.remove(); // 删除自身
                    }
                }, speed);
            }
        };
    }
    Component.addExtend = addExtend;
    var ViewUi = /** @class */ (function () {
        function ViewUi() {
            return;
        }
        ViewUi = __decorate([
            addExtend,
            __metadata("design:paramtypes", [])
        ], ViewUi);
        return ViewUi;
    }());
    Component.ViewUi = ViewUi;
})(Component || (Component = {}));

var Mainpoint;
(function (Mainpoint) {
    var MainMethods = /** @class */ (function () {
        function MainMethods(config) {
            this.canvasHistory = []; // 储存画笔历史
            this.step = -1; // 当前进行的步骤
            this.utilbasename = new utilbase.Util(); // 引用基础类并实例化
            this.component = new Component.ViewUi(); // 引用组件类并实例化
            this.eraserEnabled = true;
            this.name = config.GBname;
            this.canvas = this.utilbasename.typeof(this.name);
            this.context = this.canvas.getContext('2d');
            this.lineWidth = config.lineWidth;
            this.eraser = this.utilbasename.typeof(config.eraser);
            this.eraserAttr = config.eraserAttr;
            this.eraserAttr.naturename = config.eraserAttr.naturename;
            this.eraserAttr.elementname = config.eraserAttr.elementname;
            this.pen = this.utilbasename.typeof(config.pen);
            this.penAttr = config.penAttr;
            this.penAttr.naturename = config.penAttr.naturename;
            this.penAttr.elementname = config.penAttr.elementname;
            this.clear = this.utilbasename.typeof(config.clear);
            this.download = this.utilbasename.typeof(config.download);
            this.downloadType = config.downloadType;
            this.downloadType.downloadFormat = config.downloadType.downloadFormat;
            this.downloadType.PictureName = config.downloadType.PictureName;
            this.undo = this.utilbasename.typeof(config.undo);
            this.redo = this.utilbasename.typeof(config.redo);
            this.undoAttr = config.undoAttr;
            this.redoAttr = config.redoAttr;
            this.undoAttr.naturename = config.undoAttr.naturename;
            this.undoAttr.elementname = config.undoAttr.elementname;
            this.redoAttr.naturename = config.redoAttr.naturename;
            this.redoAttr.elementname = config.redoAttr.elementname;
            this.colorpicker = new colorpick.Cpicker({
                elem: '#pencli'
            });
        }
        MainMethods.prototype.init = function (config) {
            this.userEvent(config);
            this.clearEvent();
            this.listentoUser(config);
            this.autoCanvasSize();
            this.downloadEvent(config);
            this.cancel();
            this.canvasRedo();
            // Shape.shapesquare(this.context)
        };
        MainMethods.prototype.eraserEvent = function () {
            var _this = this;
            var eraser = this.utilbasename.typeof(this.eraser);
            var eraserAttr = this.eraserAttr;
            var pen = this.utilbasename.typeof(this.pen);
            this.utilbasename.addEvent(eraser, 'click', function () {
                var eAttrnaturename = _this.eraserAttr.naturename;
                var eAttrelementname = _this.eraserAttr.elementname;
                var penAnaturename = _this.penAttr.naturename;
                var penAelementname = _this.penAttr.elementname;
                _this.eraserEnabled = true;
                _this.utilbasename.addAttr(eraser, eAttrnaturename, eAttrelementname);
                _this.utilbasename.removeAttr(pen, penAnaturename, penAelementname);
            });
        };
        MainMethods.prototype.penEvent = function () {
            var _this = this;
            var pen = this.utilbasename.typeof(this.pen);
            var eraser = this.utilbasename.typeof(this.eraser);
            var eraserAttr = this.eraserAttr;
            this.utilbasename.addEvent(pen, 'click', function () {
                var penAnaturename = _this.penAttr.naturename;
                var penAelementname = _this.penAttr.elementname;
                var eAttrnaturename = _this.eraserAttr.naturename;
                var eAttrelementname = _this.eraserAttr.elementname;
                _this.eraserEnabled = false;
                _this.utilbasename.addAttr(pen, penAnaturename, penAelementname);
                _this.utilbasename.removeAttr(eraser, eAttrnaturename, eAttrelementname);
            });
        };
        MainMethods.prototype.clearEvent = function () {
            var _this = this;
            var clear = this.utilbasename.typeof(this.clear);
            var canvas = this.canvas;
            this.utilbasename.addEvent(clear, 'click', function () {
                _this.context.clearRect(0, 0, canvas.width, canvas.height);
            });
        };
        MainMethods.prototype.downloadEvent = function (config) {
            var _this = this;
            var download = this.utilbasename.typeof(this.download);
            var canvas = this.canvas;
            var dFormat = this.downloadType.downloadFormat;
            var PictureName = this.downloadType.PictureName;
            this.utilbasename.addEvent(download, 'click', function () {
                var compositeOperation = _this.context.globalCompositeOperation;
                _this.context.globalCompositeOperation = 'destination-over';
                _this.context.fillStyle = '#fff';
                _this.context.fillRect(0, 0, canvas.width, canvas.height);
                var imageData = canvas.toDataURL(dFormat);
                _this.context.putImageData(_this.context.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                _this.context.globalCompositeOperation = compositeOperation;
                var a = document.createElement('a');
                document.body.appendChild(a);
                a.href = imageData;
                a.download = PictureName;
                a.target = '_blank';
                a.click();
            });
        };
        MainMethods.prototype.canvassize = function () {
            // 把变化之前的画布内容copy一份，然后重新画到画布上
            var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
            var pageWidth = document.documentElement.clientWidth;
            var pageHeight = document.documentElement.clientHeight;
            this.canvas.width = pageWidth;
            this.canvas.height = pageHeight;
            this.context.putImageData(imgData, 0, 0);
        };
        MainMethods.prototype.autoCanvasSize = function () {
            var _this = this;
            this.canvassize();
            this.utilbasename.addEvent(window, 'resize', function () {
                _this.canvassize();
            });
        };
        MainMethods.prototype.userEvent = function (config) {
            this.eraserEvent();
            this.penEvent();
            this.clearEvent();
        };
        MainMethods.prototype.drawLine = function (x1, y1, x2, y2) {
            var pen = this.utilbasename.typeof(this.pen).style.backgroundColor;
            this.context.beginPath();
            this.context.moveTo(x1, y1);
            this.context.lineWidth = this.lineWidth;
            this.context.lineTo(x2, y2);
            this.context.stroke();
            this.context.closePath();
            this.context.storkeStyle = pen;
            this.colorpicker.create({
                bindClass: this.pen,
                change: function (elem, hex) {
                    elem.style.backgroundColor = hex;
                }
            });
        };
        MainMethods.prototype.drawCricle = function (x, y, radius) {
            var pen = this.utilbasename.typeof(this.pen).style.backgroundColor;
            this.context.beginPath();
            this.context.arc(x, y, radius, 0, Math.PI * 2);
            this.context.fill();
            this.context.fillStyle = pen;
            this.context.strokeStyle = pen;
        };
        MainMethods.prototype.listentoUser = function (config) {
            var _this = this;
            var using = false;
            var lineWidth = this.lineWidth;
            var lastPoint = {
                x: undefined,
                y: undefined
            };
            if (document.body.ontouchstart === undefined) {
                this.utilbasename.addEvent(this.canvas, 'mousedown', function (a) {
                    var x = a.clientX;
                    var y = a.clientY;
                    using = true;
                    if (_this.eraserEnabled) {
                        _this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10);
                    }
                    else {
                        lastPoint = {
                            x: x,
                            y: y
                        };
                    }
                });
                this.utilbasename.addEvent(this.canvas, 'mousemove', function (a) {
                    var x = a.clientX;
                    var y = a.clientY;
                    if (!using) {
                        return;
                    }
                    if (_this.eraserEnabled) {
                        _this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10);
                    }
                    else {
                        var newPoint = {
                            x: x,
                            y: y
                        };
                        _this.drawCricle(x, y, lineWidth / 2);
                        _this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                        lastPoint = newPoint;
                    }
                });
                this.utilbasename.addEvent(this.canvas, 'mouseup', function () {
                    using = false;
                    _this.canvasDraw();
                });
            }
            else {
                this.utilbasename.addEvent(this.canvas, 'touchstart', function (a) {
                    var x = a.touches[0].clientX;
                    var y = a.touches[0].clientY;
                    using = true;
                    if (_this.eraserEnabled) {
                        _this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10);
                    }
                    else {
                        lastPoint = {
                            x: x,
                            y: y
                        };
                    }
                });
                this.utilbasename.addEvent(this.canvas, 'touchmove', function (a) {
                    var x = a.touches[0].clientX;
                    var y = a.touches[0].clientY;
                    if (!using) {
                        return;
                    }
                    if (_this.eraserEnabled) {
                        _this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10);
                    }
                    else {
                        var newPoint = {
                            x: x,
                            y: y
                        };
                        _this.drawCricle(x, y, lineWidth / 2);
                        _this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                        lastPoint = newPoint;
                    }
                });
                this.utilbasename.addEvent(this.canvas, 'touchend', function () {
                    using = false;
                    _this.canvasDraw();
                });
            }
        };
        MainMethods.prototype.canvasDraw = function () {
            var undo = this.undo;
            var step = this.step;
            var undonaturename = this.undoAttr.naturename;
            var undoelementname = this.undoAttr.elementname;
            // 画板绘制方法
            step++;
            if (step < this.canvasHistory.length) {
                this.canvasHistory.length = step; // 截断数组
            }
            // 添加新的绘制到历史记录
            if (step > 0) {
                this.utilbasename.addAttr(undo, undonaturename, undoelementname);
            }
        };
        MainMethods.prototype.cancel = function () {
            var _this = this;
            // 实现画板撤销方法
            var undo = this.undo;
            var redo = this.redo;
            var undonaturename = this.undoAttr.naturename;
            var undoelementname = this.undoAttr.elementname;
            var redonaturename = this.redoAttr.naturename;
            var redoelementname = this.redoAttr.elementname;
            var step = this.step;
            var canvasPic = new Image();
            this.utilbasename.addEvent(undo, 'click', function () {
                if (step > 0) {
                    step--;
                    var canvasPic_1 = new Image();
                    canvasPic_1.src = _this.canvasHistory[step];
                    canvasPic_1.onload = function () {
                        _this.context.drawImage(canvasPic_1, 0, 0);
                    };
                    _this.utilbasename.addAttr(undo, undonaturename, undoelementname);
                    _this.utilbasename.addAttr(redo, redonaturename, redoelementname);
                }
                else {
                    _this.utilbasename.removeAttr(undo, undonaturename, undoelementname);
                    _this.component.vuinit('通知', '不能再撤销了');
                    // console.log('不能在撤销了')
                }
            });
        };
        MainMethods.prototype.canvasRedo = function () {
            var _this = this;
            var step = this.step;
            var undo = this.undo;
            var redo = this.redo;
            var redonaturename = this.redoAttr.naturename;
            var redoelementname = this.redoAttr.elementname;
            // 实现画板重做部分方法
            if (step < this.canvasHistory.length - 1) {
                step++;
                var canvasPic_2 = new Image();
                canvasPic_2.src = this.canvasHistory[step];
                canvasPic_2.onload = function () {
                    _this.context.drawImage(canvasPic_2, 0, 0);
                };
            }
            else {
                this.utilbasename.removeAttr(redo, redonaturename, redoelementname);
                this.component.vuinit('通知', '已经是最新记录了');
                // console.log('已经是最新记录了')
            }
        };
        return MainMethods;
    }());
    Mainpoint.MainMethods = MainMethods;
})(Mainpoint || (Mainpoint = {}));

var GBoard = /** @class */ (function (_super) {
    __extends(GBoard, _super);
    function GBoard(config) {
        return _super.call(this, config) || this; // 调用父类构造函数(属性和方法)
    }
    return GBoard;
}(Mainpoint.MainMethods));

/**
 * GraffitiBoard.js v0.1.0
 * (c) 2019 by wangqiaoqiao
 * Released under the MIT License.
 */

