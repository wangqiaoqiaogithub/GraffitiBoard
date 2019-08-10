// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { utilbase } from './base/index'
import { GBoardApi } from './types'
import { Mainpoint } from './main'
export class GBoard {
  name: string
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
  }
  constructor(config: GBoardApi) {
    this.name = config.GBname
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
    this.download = config.download
  }
  public utilbasename: any = new utilbase.Util()
  public eraserEnabled: boolean = true
  public canvasname: any = this.name
  public canvas: any = this.utilbasename.typeof(this.canvasname)
  public context: any = this.canvas.getContext('2d')
  public init(config: GBoardApi) {
    // this.userEvent(config);
    // this.clearEvent();
    // this.listentoUser(config);
    // this.autoCanvasSize();
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
    this.utilbasename.addEvent(download, 'click', () => {
      const compositeOperation = this.context.globalCompositeOperation
      this.context.globalCompositeOperation = 'destination-over'
      this.context.fillStyle = '#fff'
      this.context.fillRect(0, 0, canvas.width, canvas.height)
      var imageData = canvas.toDataURL('image/png')
      this.context.putImageData(context.getImageData(0, 0, canvas.width, canvas.height), 0, 0)
      this.context.globalCompositeOperation = compositeOperation
      let a = document.createElement('a')
      document.body.appendChild(a)
      a.href = imageData
      a.download = 'mypaint'
      a.target = '_blank'
      a.click()
    })
  }
  private canvassize() {
    let pageWidth: any = document.documentElement.clientWidth
    let pageHeight: any = document.documentElement.clientHeight
    this.canvas.width = pageWidth
    this.canvas.height = pageHeight
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
  public drawCricle(x1: number, y1: number, x2: number, y2: number) {
    this.context.beginPath()
    this.context.moveTo(x1, y1)
    this.context.lineWidth = this.lineWidth
    this.context.lineTo(x2, y2)
    this.context.stroke()
    this.context.closePath()
  }
  public drawLine(x: number, y: number, radius: number, newytwo: number) {
    this.context.beginPath()
    this.context.arc(x, y, radius, 0, Math.PI * 2)
    this.context.fill()
  }
  public listentoUser(config: GBoardApi): void {
    let using: boolean = false
    let lastPoint: any = {
      x: undefined,
      y: undefined
    }
    if (document.body.ontouchstart === undefined) {
      this.utilbasename.addEvent(this.canvas, 'mousedown', (a: any) => {
        const x: any = a.clientX
        const y: any = a.clientY
        const using: boolean = true
        if (this.eraserEnabled) {
          this.context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var lastPoint: any = {
            x: x,
            y: y
          }
        }
      })
      this.utilbasename.addEvent(this.canvas, 'mousemove', (a: any) => {
        const x: any = a.clientX
        const y: any = a.clientY
        let lineWidth = this.lineWidth
        if (!using) {
          return
        }
        if (this.eraserEnabled) {
          this.context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint: any = {
            x: x,
            y: y
          }
          this.drawCricle(x, y, lineWidth / 2, 0)
          this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      })
      this.utilbasename.addEvent(this.canvas, 'mouseup', () => {
        using = false
      })
    } else {
      this.utilbasename.addEvent(this.canvas, 'touchstart', (a: any) => {
        const x: any = a.touches[0].clientX
        const y: any = a.touches[0].clientY
        let using: boolean = true
        if (this.eraserEnabled) {
          this.context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var lastPoint: any = {
            x: x,
            y: y
          }
        }
      })
      this.utilbasename.addEvent(this.canvas, 'touchmove', (a: any) => {
        const x: any = a.touches[0].clientX
        const y: any = a.touches[0].clientY
        let lineWidth = this.lineWidth
        if (!using) {
          return
        }
        if (this.eraserEnabled) {
          this.context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint: any = {
            x: x,
            y: y
          }
          this.drawCricle(x, y, lineWidth / 2, 0)
          this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      })
      this.utilbasename.addEvent(this.canvas, 'mouseup', () => {
        using = false
      })
    }
  }
}
export default GBoard
