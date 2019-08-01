// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { utilbase } from './base'
import { GBoardapi } from './types'
export class GBoard extends GBoardapi {
  constructor(name: any, lineWidth: number) {
    this.name = GBoardapi.GBname
    this.lineWidth = GBoardapi.lineWidth
  }
  public utilbasename: object = new utilbase.Util()
  public canvas: any = utilbasename.typeof(this.name)
  public context: any = canvas.getContext('2d')
  public eraserEnabled: boolean = true
  public lineWidth: number = 5
  public drawCricle(x1: number, y1: number, x2: number, y2: number) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineWidth = lineWidth
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
  }
  public drawLine(x: number, y: number, radius: number) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2)
    context.fill()
  }
  private listentoUser(config: GBoardapi): void {
    var using: boolean = false
    var lastPoint: object = {
      x: undefined,
      y: undefined
    }
    if (document.body.ontouchstart === undefined) {
      utilbasename.addEvent(canvas, 'mousedown', a => {
        let x: any = a.clientX
        let y: any = a.clientY
        let using: boolean = true
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var lastPoint: object = {
            x: x,
            y: y
          }
        }
      })
      utilbasename.addEvent(canvas, 'mousemove', a => {
        let x: any = a.clientX
        let y: any = a.clientY
        if (!using) {
          return
        }
        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint: object = {
            x: x,
            y: y
          }
          drawCricle(x, y, lineWidth / 2)
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      })
    }
  }
}
export default GBoard
