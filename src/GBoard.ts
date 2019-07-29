// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { utilbase } from './base'
import { GBoardapi } from './types'
// function GBoard(config: GBoardapi): any {
//   var utilbasename = new utilbase.util()
//   config.GBname = utilbasename.typeof(config.GBname)
// }
export class GBoard extends GBoardapi {
  constructor(name: any) {
    this.name = GBoardapi.GBname
  }
  public utilbasename = new utilbase.util()
  public canvas = utilbasename.typeof(this.name)
  listentoUser(config: GBoardapi): any {
    let using: boolean = false
    var lastPoint: any = {
      x: undefined,
      y: undefined
    }
  }
}
export default GBoard
