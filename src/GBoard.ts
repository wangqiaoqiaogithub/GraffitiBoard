// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { utilbase } from './base'
import { GBoardapi } from './types'
export class GBoard extends GBoardapi {
  constructor(name: any) {
    this.name = GBoardapi.GBname
  }
  public utilbasename = new utilbase.Util()
  public canvas = utilbasename.typeof(this.name)
  public context = canvas.getContext('2d')
  private listentoUser(config: GBoardapi): void {
    var using: boolean = false
    var lastPoint: any = {
      x: undefined,
      y: undefined
    }
    if (document.body.ontouchstart === undefined) {
      utilbasename.addEvent(canvas, 'mousedown', a => {
        var x = a.clientX
        var y = a.clientY
        if (!using) {
          return
        }
      })
    }
  }
}
export default GBoard
