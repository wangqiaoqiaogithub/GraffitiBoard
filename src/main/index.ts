import { utilbase } from '../baseMethod/index'
import { GBoardApi } from '../types/index'
import { colorpick } from '../main/base/colorpicker'
import { Component } from '../component'
// import { TextShape } from '../main/base/shape'
export namespace Mainpoint {
  export class MainMethods {
    name: string
    canvas: any
    context: any
    lineWidth: number
    eraser: string
    eraserAttr: {
      naturename: string
      elementname: any
    }
    pen: string
    penAttr: {
      naturename: string
      elementname: string
    }
    clear: string
    download: string
    downloadType: {
      downloadFormat: string
      PictureName: string
    }
    undo: string
    undoAttr: {
      naturename: string
      elementname: any
    }
    redo: string
    redoAttr: {
      naturename: string
      elementname: any
    }
    constructor(config: GBoardApi) {
      this.name = config.GBname
      this.canvas = this.utilbasename.typeof(this.name)
      this.context = this.canvas.getContext('2d')
      this.lineWidth = config.lineWidth
      this.eraser = this.utilbasename.typeof(config.eraser)
      this.eraserAttr = config.eraserAttr
      this.eraserAttr.naturename = config.eraserAttr.naturename
      this.eraserAttr.elementname = config.eraserAttr.elementname
      this.pen = this.utilbasename.typeof(config.pen)
      this.penAttr = config.penAttr
      this.penAttr.naturename = config.penAttr.naturename
      this.penAttr.elementname = config.penAttr.elementname
      this.clear = this.utilbasename.typeof(config.clear)
      this.download = this.utilbasename.typeof(config.download)
      this.downloadType = config.downloadType
      this.downloadType.downloadFormat = config.downloadType.downloadFormat
      this.downloadType.PictureName = config.downloadType.PictureName
      this.undo = this.utilbasename.typeof(config.undo)
      this.redo = this.utilbasename.typeof(config.redo)
      this.undoAttr = config.undoAttr
      this.redoAttr = config.redoAttr
      this.undoAttr.naturename = config.undoAttr.naturename
      this.undoAttr.elementname = config.undoAttr.elementname
      this.redoAttr.naturename = config.redoAttr.naturename
      this.redoAttr.elementname = config.redoAttr.elementname
      this.colorpicker = new colorpick.Cpicker({
        elem: '#pencli'
      })
    }
    public canvasHistory: any = [] // 储存画笔历史
    public step: any // 当前进行的步骤
    public utilbasename: any = new utilbase.Util() // 引用基础类并实例化
    public component: any = new Component.ViewUi() // 引用组件类并实例化
    public eraserEnabled: boolean = true
    public onoff: boolean = true
    private colorpicker: any
    public init(config: GBoardApi) {
      this.userEvent(config)
      this.clearEvent()
      this.listentoUser(config)
      this.autoCanvasSize()
      this.downloadEvent(config)
      this.changeundo()
      this.changeredo()
      // Shape.shapesquare(this.context)
    }
    private eraserEvent() {
      // 橡皮擦样式属性容器
      let eraser = this.utilbasename.typeof(this.eraser)
      this.utilbasename.addEvent(eraser, 'click', () => {
        let eAttrnaturename = this.eraserAttr.naturename
        let eAttrelementname = this.eraserAttr.elementname
        this.eraserEnabled = true
        if ((this.onoff = true)) {
          this.utilbasename.addAttr(eraser, eAttrnaturename, eAttrelementname)
          this.onoff = false
        } else {
          this.utilbasename.removeAttr(eraser, eAttrnaturename, eAttrelementname)
          this.onoff = true
        }
      })
    }
    private penEvent() {
      // 画笔的样式属性容器
      let pen = this.utilbasename.typeof(this.pen)
      this.utilbasename.addEvent(pen, 'click', () => {
        let penAnaturename = this.penAttr.naturename
        let penAelementname = this.penAttr.elementname
        this.eraserEnabled = false
        if ((this.onoff = true)) {
          this.utilbasename.addAttr(pen, penAnaturename, penAelementname)
          this.onoff = false
        } else {
          this.utilbasename.removeAttr(pen, penAnaturename, penAelementname)
          this.onoff = true
        }
      })
    }
    private clearEvent() {
      // 画板清除（重置）
      let clear = this.utilbasename.typeof(this.clear)
      let canvas = this.canvas
      this.utilbasename.addEvent(clear, 'click', () => {
        this.context.clearRect(0, 0, canvas.width, canvas.height)
      })
    }
    private downloadEvent(config: GBoardApi) {
      let download = this.utilbasename.typeof(this.download)
      let canvas = this.canvas
      let dFormat = this.downloadType.downloadFormat
      let PictureName = this.downloadType.PictureName
      this.utilbasename.addEvent(download, 'click', () => {
        const compositeOperation = this.context.globalCompositeOperation
        this.context.globalCompositeOperation = 'destination-over'
        this.context.fillStyle = '#fff'
        this.context.fillRect(0, 0, canvas.width, canvas.height)
        let imageData = canvas.toDataURL(dFormat)
        this.context.putImageData(
          this.context.getImageData(0, 0, canvas.width, canvas.height),
          0,
          0
        )
        this.context.globalCompositeOperation = compositeOperation
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.href = imageData
        a.download = PictureName
        a.target = '_blank'
        a.click()
      })
    }
    private canvassize() {
      // 把变化之前的画布内容copy一份，然后重新画到画布上
      let imgData: any = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
      let pageWidth: any = document.documentElement.clientWidth
      let pageHeight: any = document.documentElement.clientHeight
      this.canvas.width = pageWidth
      this.canvas.height = pageHeight
      this.context.putImageData(imgData, 0, 0)
    }
    public autoCanvasSize() {
      this.canvassize()
      this.utilbasename.addEvent(window, 'resize', () => {
        this.canvassize()
      })
    }
    public userEvent(config: GBoardApi): void {
      this.eraserEvent()
      this.penEvent()
      this.clearEvent()
    }
    public drawLine(x1: number, y1: number, x2: number, y2: number) {
      let pen = this.utilbasename.typeof(this.pen).style.backgroundColor
      this.context.beginPath()
      this.context.moveTo(x1, y1)
      this.context.lineWidth = this.lineWidth
      this.context.lineTo(x2, y2)
      this.context.stroke()
      this.context.closePath()
      this.context.storkeStyle = pen
      this.colorpicker.create({
        bindClass: this.pen,
        change: function(elem: any, hex: any) {
          elem.style.backgroundColor = hex
        }
      })
    }
    public drawCricle(x: number, y: number, radius: number) {
      let pen = this.utilbasename.typeof(this.pen).style.backgroundColor
      this.context.beginPath()
      this.context.arc(x, y, radius, 0, Math.PI * 2)
      this.context.fill()

      this.context.fillStyle = pen
      this.context.strokeStyle = pen
    }
    public listentoUser(config: GBoardApi): void {
      let using: boolean = false
      let lineWidth = this.lineWidth
      let lastPoint: any = {
        x: undefined,
        y: undefined
      }
      if (document.body.ontouchstart === undefined) {
        this.utilbasename.addEvent(this.canvas, 'mousedown', (a: any) => {
          this.step = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height) //在这里储存绘图表面
          const x: any = a.clientX
          const y: any = a.clientY
          using = true
          if (this.eraserEnabled) {
            this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10)
          } else {
            lastPoint = {
              x: x,
              y: y
            }
          }
        })
        this.utilbasename.addEvent(this.canvas, 'mousemove', (a: any) => {
          const x: any = a.clientX
          const y: any = a.clientY
          if (!using) {
            return
          }
          if (this.eraserEnabled) {
            this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10)
          } else {
            let newPoint: any = {
              x: x,
              y: y
            }
            this.drawCricle(x, y, lineWidth / 2)
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
          }
        })
        this.utilbasename.addEvent(this.canvas, 'mouseup', () => {
          using = false
          this.canvassavedata(this.step)
        })
      } else {
        this.utilbasename.addEvent(this.canvas, 'touchstart', (a: any) => {
          const x: any = a.touches[0].clientX
          const y: any = a.touches[0].clientY
          using = true
          if (this.eraserEnabled) {
            this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10)
          } else {
            lastPoint = {
              x: x,
              y: y
            }
          }
        })
        this.utilbasename.addEvent(this.canvas, 'touchmove', (a: any) => {
          const x: any = a.touches[0].clientX
          const y: any = a.touches[0].clientY
          if (!using) {
            return
          }
          if (this.eraserEnabled) {
            this.context.clearRect(x - lineWidth, y - lineWidth, 10, 10)
          } else {
            let newPoint: any = {
              x: x,
              y: y
            }
            this.drawCricle(x, y, lineWidth / 2)
            this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
          }
        })
        this.utilbasename.addEvent(this.canvas, 'touchend', () => {
          using = false
          this.step = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height) //在这里储存绘图表面
          this.canvassavedata(this.step)
        })
      }
    }
    private canvassavedata(data: any) {
      this.canvasHistory.length === 10 && this.canvasHistory.shift() // 上限为储存10步，太多了怕挂掉
      this.canvasHistory.push(data)
    }
    public changeundo() {
      const undo = this.undo
      const undoAnaturename = this.undoAttr.naturename
      const undoAelementname = this.undoAttr.elementname
      this.utilbasename.addEvent(undo, 'click', () => {
        if (this.canvasHistory.length < 1) {
          this.component.vuinit('通知', '不能在进行撤销')
        }
        if (this.onoff) {
          this.utilbasename.addAttr(undo, undoAnaturename, undoAelementname)
          this.onoff = false
        } else {
          this.utilbasename.removeAttr(undo, undoAnaturename, undoAelementname)
          this.onoff = true
        }
        this.context.putImageData(this.canvasHistory[this.canvasHistory.length - 1], 0, 0)
        this.canvasHistory.pop()
      })
      // 以上为画板撤销功能
    }
    public changeredo() {
      const redo = this.redo
      const redoAelementname = this.redoAttr.elementname
      const redoAnaturename = this.redoAttr.naturename
      this.utilbasename.addEvent(redo, 'click', () => {
        this.context.putImageData(this.step, 0, 0)
        if (this.onoff) {
          this.utilbasename.addAttr(redo, redoAnaturename, redoAelementname)
          this.onoff = false
        } else {
          this.utilbasename.addAttr(redo, redoAnaturename, redoAelementname)
          this.onoff = true
        }
        // 点击开关当前样式
      })
    }
  }
}
