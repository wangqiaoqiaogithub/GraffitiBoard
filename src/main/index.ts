import { utilbase } from './base/index'
import { GBoardApi } from './types'
export namespace Mainpoint {
  export class mianMethods {
    undo: string
    constructor(config: GBoardApi) {
      this.undo = this.utilbasename.typeof(config.undo)
      this.undo.naturename = config.undo.naturename
      this.undo.elementname = config.undo.elementname
    }
    public canvasHistory = []
    public step = -1
    public utilbasename: any = new utilbase.Util()
    public cancel() {
      //实现画板撤销方法
      let undo = this.undo
      let stepnumber = this.step
      this.utilbasename.addEvent(undo, 'click', () => {
        if (stepnumber > 0) {
        } else {
        }
      })
    }
    public canvasRedo() {
      //实现画板重做部分方法
    }
  }
}
