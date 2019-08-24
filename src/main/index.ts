import { utilbase } from './base/index'
import { GBoardApi } from './types'
export namespace Mainpoint {
  export class mianMethods {
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
      this.undo = this.utilbasename.typeof(config.undo)
      this.redo = this.utilbasename.typeof(config.redo)
      this.undoAttr.naturename = config.undoAttr.naturename
      this.undoAttr.elementname = config.undoAttr.elementname
      this.redoAttr.naturename = config.redoAttr.naturename
      this.redoAttr.elementname = config.redoAttr.elementname
    }
    public canvasHistory = []
    public step = -1
    public utilbasename: any = new utilbase.Util()
    public cancel() {
      //实现画板撤销方法
      let undo = this.undo
      let redo = this.redo
      let undonaturename = this.undoAttr.naturename
      let undoelementname = this.undoAttr.elementname
      let redonaturename = this.redoAttr.naturename
      let redoelementname = this.redoAttr.elementname
      let stepnumber = this.step
      let canvasPic = new Image()
      this.utilbasename.addEvent(undo, 'click', () => {
        if (stepnumber > 0) {
          step--
          let canvasPic = new Image()
          canvasPic.src = canvasHistory[step]
          canvasPic.onload = () => {
            this.context.drawImage(canvasPic, 0, 0)
          }
          this.utilbasename.addAttr(undo, undonaturename, undoelementname)
          this.utilbasename.addAttr(redo, redonaturename, redoelementname)
        } else {
          this.utilbasename.removeAttr(undo, undonaturename, undoelementname)
          console.log('不能在撤销了')
        }
      })
    }
    public canvasRedo() {
      //实现画板重做部分方法
      if (step < canvasHistory.length - 1) {
        step++
        let canvasPic = new Image()
        canvasPic.src = canvasHistory[step]
        canvasPic.onload = () => {
          this.context.drawImage(canvasPic, 0, 0)
        }
      } else {
        this.utilbasename.removeAttr(redo, redonaturename, redoelementname)
        consoel.log('已经是最新记录了')
      }
    }
  }
}
