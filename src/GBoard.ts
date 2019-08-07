// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { utilbase } from './base/index'
import { GBoardApi } from './types'
export class GBoard {
  name: string
  lineWidth: number
  eraser: string
  eraserAttr: {
    classname: string
    naturename: string
  }
  constructor(name: string, config: GBoardApi) {
    this.name = name
    this.lineWidth = config.lineWidth
    this.eraser = config.eraser
    this.eraserAttr = config.eraserAttr
    this.eraserAttr.classname = config.eraserAttr.classname
    this.eraserAttr.naturename = config.eraserAttr.naturename
  }
  public utilbasename: any = new utilbase.Util()
  public canvas: any = this.utilbasename.typeof(this.name)
  public context: any = this.canvas.getContext('2d')
  public eraserEnabled: boolean = true
  private drawCricle(x1: number, y1: number, x2: number, y2: number) {
    this.context.beginPath()
    this.context.moveTo(x1, y1)
    this.context.lineWidth = this.lineWidth
    this.context.lineTo(x2, y2)
    this.context.stroke()
    this.context.closePath()
  }
  private drawLine(x: number, y: number, radius: number, newytwo: number) {
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
  public userEvent(config: GBoardApi): void {
    let eraser = this.utilbasename.typeof(this.eraser)
    let eraserAttr = this.eraserAttr
    this.utilbasename.addEvent(eraser, 'click', () => {
      let eAttrclassname = this.eraserAttr.classname
      let eAttrnaturename = this.eraserAttr.naturename
      this.eraserEnabled = true
      this.utilbasename.addAttr(eraser, eAttrnaturename, eAttrclassname)
    })
  }
}
export default GBoard
