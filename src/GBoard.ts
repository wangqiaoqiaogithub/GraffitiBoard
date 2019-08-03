// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { utilbase } from './base/index'
import { GBoardapi } from './types'
export class GBoard {
  constructor(config: GBoardapi) {
    this.name = config.GBname
    this.lineWidth = config.lineWidth
  }
  public utilbasename: object = new utilbase.Util()
  public canvas: any = this.utilbasename.typeof(this.name)
  public context: any = this.canvas.getContext('2d')
  public eraserEnabled: boolean = true
  public lineWidth: number = 5

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
  public listentoUser(config: GBoardapi): void {
    var using: boolean = false
    var lastPoint: any = {
      x: undefined,
      y: undefined
    }
    if (document.body.ontouchstart === undefined) {
      this.utilbasename.addEvent(this.canvas, 'mousedown', (a: any) => {
        let x: any = a.clientX
        let y: any = a.clientY
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
      this.utilbasename.addEvent(this.canvas, 'mousemove', (a: any) => {
        let x: any = a.clientX
        let y: any = a.clientY
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
          this.drawCricle(x, y, this.lineWidth / 2, 0)
          this.drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      })
    }
  }
}
export default GBoard
