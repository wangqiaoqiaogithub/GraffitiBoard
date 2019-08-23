import { utilbase } from './base/index'
import { GBoardApi } from './types'
export namespace Mainpoint {
  export class mianMethods {
    undoname: string
    constructor(config: GBoardApi) {
      this.name = this.utilbasename.typeof()
      this.lineWidth = this.config.lineWidth
    }
    public canvasHistory = []
    public step = -1
    public utilbasename: any = new utilbase.Util()
    public cancel() {
      let stepnumber = this.step
      if (stepnumber > 0) {
      } else {
      }
    }
  }
}
