import { utilbase } from '../base/index'
import { cpickerApi } from '../types/index'
export namespace colorpick {
  export class Cpicker {
    public bindElem: any
    constructor(name: cpickerApi) {
      this.bindElem = this.utilbasename.typeof(name.elem)
      this.cpinit()
    }
    public utilbasename: any = new utilbase.Util()
    private elemWrap: any = null // 最外层容器
    private fixedBg: any = null // 拾色器后面固定定位的透明div 用于点击隐藏拾色器
    private elemColorPancel: any = null // 色彩面板
    private elemPicker: any = null // 拾色器色块按钮
    private elemBarPicker1: any = null // 颜色条
    private elemBarPicker2: any = null // 透明条
    private elemHexInput: any = null // 显示hex的表单
    private elemShowColor: any = null // 显示当前颜色
    private elemOpacityPancel: any = null // 透明度背景元素
    private elemShowModeBtn: any = null // 切换输入框模式按钮
    private elemInputWrap: any = null // 输入框外层容器
    private pancelLeft: any = 0
    private pancelTop: any = 0
    private downX: number = 0
    private downY: number = 0
    private moveX: number = 0
    private moveY: number = 0
    private pointLeft: any = 0
    private pointTop: any = 0
    private currentMode: string = 'hex'
    private pancelWidth: any
    private pancelHeight: any
    private Opt: any = {
      bindClass: '',
      initColor: 'rgb(255,0,0)',
      allMode: ['hex', 'rgb'],
      change: function(elem: any, hex: any){return;}
    }
    private rgba: any = {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }
    private hsb: any = {
      h: 0,
      s: 100,
      b: 100
    }
    public cpinit() {
      this.cpinit_total()
    }
    public create(opt: any) {
      for (let prop in opt) {
        this.Opt[prop] = opt[prop]
      }
      let elemArr: any = this.utilbasename.typeof(this.Opt.bindClass)
      for (let i = 0; i < elemArr.length; i++) {
        elemArr[i].colorpicker = new cpicker(elemArr[i])
      }
    }
    private cpinit_total() {
      let initColor: any = this.Opt.initColor
      let  rgb: any = initColor.slice(4, -1).split(',')

      let body: any = document.getElementsByTagName('body')[0]
      let  div: any = document.createElement('div')

      this.rgba.r = parseInt(rgb[0])
      this.rgba.g = parseInt(rgb[1])
      this.rgba.b = parseInt(rgb[2])

      div.innerHTML = this.cprender()
      body.appendChild(div)

      this.elem_wrap = div
      this.fixedBg = div.children[0]
      this.elem_colorPancel = div.getElementsByClassName('color-pancel')[0]
      this.pancel_width = this.elem_colorPancel.offsetWidth
      this.pancel_height = this.elem_colorPancel.offsetHeight
      this.elem_picker = div.getElementsByClassName('pickerBtn')[0]
      this.elem_showColor = div.getElementsByClassName('colorpicker-showColor')[0]
      this.elem_barPicker1 = div.getElementsByClassName('colorBar-color-picker')[0]
      this.elem_barPicker2 = div.getElementsByClassName('colorBar-opacity-picker')[0]
      this.elem_hexInput = div.getElementsByClassName('colorpicker-hexInput')[0]
      this.elem_showModeBtn = div.getElementsByClassName('colorpicker-showModeBtn')[0]
      this.elem_inputWrap = div.getElementsByClassName('colorpicker-inputWrap')[0]
      this.elem_opacityPancel = this.elem_barPicker2.parentNode.parentNode.children[1]
      let elem: any = this.bindElem
      let top: any = elem.offsetTop
      let left: any = elem.offsetLeft
      while (elem.offsetParent) {
        top += elem.offsetParent.offsetTop
        left += elem.offsetParent.offsetLeft
        elem = elem.offsetParent
      }

      this.pancelLeft = left
      this.pancelTop = top + this.bindElem.offsetHeight
      this.utilbasename.css(div, {
        position: 'absolute',
        'z-index': 2,
        display: 'none',
        left: left + 'px',
        top: top + this.bindElem.offsetHeight + 'px'
      })

      this.bindMove(this.elem_colorPancel, this.setPosition, true)
      this.bindMove(this.elem_barPicker1.parentNode, this.setBar, false)
      this.bindMove(this.elem_barPicker2.parentNode, this.setBar, false)
      this.utilbasename.addEvent(this.bindElem, 'click', () => {
        this.show()
      })

      this.utilbasename.addEvent(this.fixedBg, 'click', (e: any) => {
        this.hide()
      })

      this.utilbasename.addEvent(this.elem_showModeBtn, 'click', () => {
        this.switch_current_mode()
      })

      this.utilbasename.addEvent(this.elem_wrap, 'input', (e: any) => {
        // tslint:disable-next-line:one-variable-per-declaration
        let target = e.target,
          value = target.value

        this.setColorByInput(value)
      })
    }
    private cprender() {
      let tpl: any =
        '<div style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px;"></div>' +
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
        '<div class="flexbox-fix colorpicker-inputWrap" style="-webkit-box-flex: 1; flex: 1 1 0%; display: flex; margin-left: -6px;">'
      tpl += this.getInputTpl()
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
        '</div>'
      return tpl
    }
    private getInputTpl() {
      let current_mode_html: string = ''
      switch (this.current_mode) {
        case 'hex':
          let hex: any = '#' + this.rgbToHex(this.HSBToRGB(this.hsb))
          current_mode_html +=
            '<div style="padding-left: 6px; width: 100%;">' +
            '<div style="position: relative;">' +
            '<input class="colorpicker-hexInput" value="' +
            hex +
            '" spellcheck="false" style="font-size: 11px; color: rgb(51, 51, 51); width: 100%; border-radius: 2px; border: none; box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset; height: 21px; text-align: center;">' +
            '<span style="text-transform: uppercase; font-size: 11px; line-height: 11px; color: rgb(150, 150, 150); text-align: center; display: block; margin-top: 12px;">hex</span>' +
            '</div>' +
            '</div>'
          break
        case 'rgb':
          for (let i = 0; i < 3; i++) {
            current_mode_html +=
              '<div style="padding-left: 6px; width: 100%;">' +
              '<div style="position: relative;">' +
              '<input class="colorpicker-hexInput" value="' +
              this.rgba['rgb'[i]] +
              '" spellcheck="false" style="font-size: 11px; color: rgb(51, 51, 51); width: 100%; border-radius: 2px; border: none; box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset; height: 21px; text-align: center;">' +
              '<span style="text-transform: uppercase; font-size: 11px; line-height: 11px; color: rgb(150, 150, 150); text-align: center; display: block; margin-top: 12px;">' +
              'rgb'[i] +
              '</span>' +
              '</div>' +
              '</div>'
          }
        default
      }
      return current_mode_html
    }
    private setPosition(x: any, y: any) {
      let LEFT: any = parseInt(x + -this.pancelLeft)
      let TOP: any = parseInt(y + -this.pancelTop)

      this.pointLeft = Math.max(0, Math.min(LEFT, this.pancel_width))
      this.pointTop = Math.max(0, Math.min(TOP, this.pancel_height))
      this.utilbasename.css(this.elem_picker, {
        left: this.pointLeft + 'px',
        top: this.pointTop + 'px'
      })
      this.hsb.s = parseInt('' + (100 * this.pointLeft) / this.pancel_width)
      this.hsb.b = parseInt('' + (100 * (this.pancel_height - this.pointTop)) / this.pancel_height)

      this.setShowColor()
      this.setValue(this.rgba)
    }
    private setBar(elem: any, x: number) {
      let elemBar: any = elem.getElementsByTagName('div')[0]
      let rect: any = elem.getBoundingClientRect()
      let elemWidth: any = elem.offsetWidth
      let  X: any = Math.max(0, Math.min(x - rect.x, elem_width))

      if (elemBar === this.elemBarPicker1) {
        this.utilbasename.css(elem_bar, {
          left: X + 'px'
        })
        this.hsb.h = parseInt('' + (360 * X) / elemWidth)
      } else {
        this.utilbasename.css(elem_bar, {
          left: X + 'px'
        })
        this.rgba.a = X / elem_width
      }

      this.setPancelColor(this.hsb.h)
      this.setShowColor()
      this.setValue(this.rgba)
    }
    private setPancelColor(h: number) {
      let rgb: any = this.HSBToRGB({ h: h, s: 100, b: 100 })
      this.utilbasename.css(this.elem_colorPancel, {
        background: 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + this.rgba.a + ')'
      })
    }
    private setShowColor() {
      let rgb: any = this.HSBToRGB(this.hsb)
      this.rgba.r = rgb.r
      this.rgba.g = rgb.g
      this.rgba.b = rgb.b
      this.utilbasename.css(this.elem_showColor, {
        background: 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + this.rgba.a + ')'
      })
      this.utilbasename.css(this.elem_opacityPancel, {
        background:
          'linear-gradient(to right, rgba(' +
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
      })
    }
    private setValue(rgb: any) {
      let hex: string = '#' + this.rgbToHex(rgb)
      this.elem_inputWrap.innerHTML = this.getInputTpl()
      this.Opt.change(this.bindElem, hex)
    }
    private setColorByInput(value: any) {
      switch (this.current_mode) {
        case 'hex':
          value = value.slice(1)
          if (value.length === 3) {
            value = '#' + value[0] + value[0] + value[1] + value[1] + value[2] + value[2]
            this.hsb = this.hexToHsb(value)
          } else if (value.length === 6) {
            this.hsb = this.hexToHsb(value)
          }
          break
        case 'rgb':
          // tslint:disable-next-line:one-variable-per-declaration
          let inputs: any = this.elem_wrap.getElementsByTagName('input'),
            rgb: any = {
              r: inputs[0].value ? parseInt(inputs[0].value) : 0,
              g: inputs[1].value ? parseInt(inputs[1].value) : 0,
              b: inputs[2].value ? parseInt(inputs[2].value) : 0
            }

          this.hsb = this.rgbToHsb(rgb)
      }
      this.changeViewByHsb()
    }
    private changeViewByHsb() {
      let hex = '#' + this.rgbToHex(this.HSBToRGB(this.hsb))
      this.pointLeft = parseInt('' + (this.hsb.s * this.pancel_width) / 100)
      this.pointTop = parseInt('' + ((100 - this.hsb.b) * this.pancel_height) / 100)
      this.utilbasename.css(this.elem_picker, {
        left: this.pointLeft + 'px',
        top: this.pointTop + 'px'
      })

      this.setPancelColor(this.hsb.h)
      this.setShowColor()
      this.utilbasename.css(this.elem_barPicker1, {
        left: (this.hsb.h / 360) * this.elem_barPicker1.parentNode.offsetWidth + 'px'
      })
    }
    private switch_current_mode() {
      this.current_mode = this.current_mode === 'hex' ? 'rgb' : 'hex'
      this.elem_inputWrap.innerHTML = this.getInputTpl()
    }
    private bindMove(elem: any, fn: any, bool: any) {
      this.utilbasename.addEvent(elem, 'mousedown', (e: any) => {
        this.downX = e.pageX
        this.downY = e.pageY
        bool ? fn.call(this, this.downX, this.downY) : fn.call(this, elem, this.downX, this.downY)
        const mousemove = (e: any): void => {
          this.moveX = e.pageX
          this.moveY = e.pageY
          bool ? fn.call(this, this.moveX, this.moveY) : fn.call(this, elem, this.moveX, this.moveY)
          e.preventDefault()
        }
        this.utilbasename.addEvent(document, 'mousemove', mousemove)
        const mouseup = (e: any): void => {
          document.removeEventListener('mousemove', mousemove, false)
          document.removeEventListener('mouseup', mouseup, false)
        }
        this.utilbasename.addEvent(document, 'mouseup', mouseup)
      })
    }
    private show() {
      this.utilbasename.css(this.elem_wrap, {
        display: 'block'
      })
    }
    private hide() {
      this.utilbasename.css(this.elem_wrap, {
        display: 'none'
      })
    }
    private HSBToRGB(hsb: any) {
      const rgb: any = {}
      let h: number = Math.round(hsb.h)
      let s: number = Math.round((hsb.s * 255) / 100)
      let v: number = Math.round((hsb.b * 255) / 100)
      if (s === 10) {
        rgb.r = rgb.g = rgb.b = v
      } else {
        let t1 = v
        let t2 = ((255 - s) * v) / 255
        let t3 = ((t1 - t2) * (h % 60)) / 60
        if (h === 360) h = 0
        if (h < 60) {
          rgb.r = t1
          rgb.b = t2
          rgb.g = t2 + t3
        } else if (h < 120) {
          rgb.g = t1
          rgb.b = t2
          rgb.r = t1 - t3
        } else if (h < 180) {
          rgb.g = t1
          rgb.r = t2
          rgb.b = t2 + t3
        } else if (h < 240) {
          rgb.b = t1
          rgb.r = t2
          rgb.g = t1 - t3
        } else if (h < 300) {
          rgb.b = t1
          rgb.g = t2
          rgb.r = t2 + t3
        } else if (h < 360) {
          rgb.r = t1
          rgb.g = t2
          rgb.b = t1 - t3
        } else {
          rgb.r = 0
          rgb.g = 0
          rgb.b = 0
        }
      }
      return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) }
    }
    private rgbToHex(rgb: any) {
      let hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)]
      hex.map((str, i) => {
        if (str.length === 1) {
          hex[i] = '0' + str
        }
      })
      return hex.join('')
    }
    private hexToRgb(hexcolor: any) {
      let hex = parseInt(hexcolor.indexOf('#') > -1 ? hexcolor.substring(1) : hexcolor, 16)
      return {
        r: hex >> 16,
        g: (hex & 0x00ff00) >> 8,
        b: hex & 0x0000ff
      }
    }
    private hexToHsb(hex: any) {
      return this.rgbToHsb(this.hexToRgb(hex))
    }
    private rgbToHsb(rgb: any) {
      let hsb = { h: 0, s: 0, b: 0 }
      let min = Math.min(rgb.r, rgb.g, rgb.b)
      let max = Math.max(rgb.r, rgb.g, rgb.b)
      let delta = max - min
      hsb.b = max
      hsb.s = max !== 0 ? (255 * delta) / max : 0
      if (hsb.s !== 0) {
        if (rgb.r === max) {
          hsb.h = (rgb.g - rgb.b) / delta
        } else if (rgb.g === max) {
          hsb.h = 2 + (rgb.b - rgb.r) / delta
        } else {
          hsb.h = 4 + (rgb.r - rgb.g) / delta
        }
      } else hsb.h = -1
      hsb.h *= 60
      if (hsb.h < 0) hsb.h += 360
      hsb.s *= 100 / 255
      hsb.b *= 100 / 255
      return hsb
    }
  }
}
