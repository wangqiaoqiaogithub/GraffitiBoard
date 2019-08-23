import { utilbase } from './base/index'
import { GBoardApi } from './types'
export namespace Mainpoint {
  export class mianMethods {
    name: string
    lineWidth: number
    constructor(config: GBoardApi) {
      this.name = this.utilbasename.typeof()
      this.lineWidth = this.config.lineWidth
    }
    public utilbasename: any = new utilbase.Util()
    public brushscope(name: string, lineWidth: number) {
      this.utilbasename.addEvent(name, 'mouseup', () => {})
    }
    public cancel() {
      this.utilbasename(name, 'click', () => {})
    }
  }
}
