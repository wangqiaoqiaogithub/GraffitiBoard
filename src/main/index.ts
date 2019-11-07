import { utilbase } from '../baseMethod/index'
import { GBoardApi } from '../types/index'
import { colorpick } from '../main/base/colorpicker'
import { Component } from '../component'
import { Shape } from '../main/base/shape'
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
      elementname: string
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
    public step: number = -1 // 当前进行的步骤
    public utilbasename: any = new utilbase.Util() // 引用基础类并实例化
    public component: any = new Component.ViewUi() // 引用组件类并实例化
    public eraserEnabled: boolean = true
    private colorpicker: any
    public init(config: GBoardApi) {
      this.userEvent(config)
      this.clearEvent()
      this.listentoUser(config)
      this.autoCanvasSize()
      this.downloadEvent(config)
      this.cancel()
      this.canvasRedo()
      // Shape.shapesquare(this.context)
    }
    private eraserEvent() {
      let eraser = this.utilbasename.typeof(this.eraser)
      let eraserAttr = this.eraserAttr
      let pen = this.utilbasename.typeof(this.pen)
      this.utilbasename.addEvent(eraser, 'click', () => {
        let eAttrnaturename = this.eraserAttr.naturename
        let eAttrelementname = this.eraserAttr.elementname
        let penAnaturename = this.penAttr.naturename
        let penAelementname = this.penAttr.elementname
        this.eraserEnabled = true
        this.utilbasename.addAttr(eraser, eAttrnaturename, eAttrelementname)
        this.utilbasename.removeAttr(pen, penAnaturename, penAelementname)
      })
    }
    private penEvent() {
      let pen = this.utilbasename.typeof(this.pen)
      let eraser = this.utilbasename.typeof(this.eraser)
      let eraserAttr = this.eraserAttr
      this.utilbasename.addEvent(pen, 'click', () => {
        let penAnaturename = this.penAttr.naturename
        let penAelementname = this.penAttr.elementname
        let eAttrnaturename = this.eraserAttr.naturename
        let eAttrelementname = this.eraserAttr.elementname
        this.eraserEnabled = false
        this.utilbasename.addAttr(pen, penAnaturename, penAelementname)
        this.utilbasename.removeAttr(eraser, eAttrnaturename, eAttrelementname)
      })
    }
    private clearEvent() {
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
          this.canvasDraw()
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
          this.canvasDraw()
        })
      }
    }
    public canvasDraw() {
      let undo = this.undo
      let step = this.step
      let undonaturename = this.undoAttr.naturename
      let undoelementname = this.undoAttr.elementname
      // 画板绘制方法
      step++
      if (step < this.canvasHistory.length) {
        this.canvasHistory.length = step // 截断数组
      }
      // 添加新的绘制到历史记录
      if (step > 0) {
        this.utilbasename.addAttr(undo, undonaturename, undoelementname)
      }
    }
    public cancel() {
      // 实现画板撤销方法
      let undo = this.undo
      let redo = this.redo
      let undonaturename = this.undoAttr.naturename
      let undoelementname = this.undoAttr.elementname
      let redonaturename = this.redoAttr.naturename
      let redoelementname = this.redoAttr.elementname
      let step = this.step
      let canvasPic = new Image()
      this.utilbasename.addEvent(undo, 'click', () => {
        if (step > 0) {
          step--
          let canvasPic = new Image()
          canvasPic.src = this.canvasHistory[step]
          canvasPic.onload = () => {
            this.context.drawImage(canvasPic, 0, 0)
          }
          this.utilbasename.addAttr(undo, undonaturename, undoelementname)
          this.utilbasename.addAttr(redo, redonaturename, redoelementname)
        } else {
          this.utilbasename.removeAttr(undo, undonaturename, undoelementname)
          this.component.vuinit('通知', '不能再撤销了')
          // console.log('不能在撤销了')
        }
      })
    }
    public canvasRedo() {
      let step = this.step
      let undo = this.undo
      let redo = this.redo
      let redonaturename = this.redoAttr.naturename
      let redoelementname = this.redoAttr.elementname
      // 实现画板重做部分方法
      if (step < this.canvasHistory.length - 1) {
        step++
        let canvasPic = new Image()
        canvasPic.src = this.canvasHistory[step]
        canvasPic.onload = () => {
          this.context.drawImage(canvasPic, 0, 0)
        }
      } else {
        this.utilbasename.removeAttr(redo, redonaturename, redoelementname)
        this.component.vuinit('通知', '已经是最新记录了')
        // console.log('已经是最新记录了')
      }
    }
  }
}
