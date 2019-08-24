export type Method = {
  naturename: string
  elementname: any
}
export type downloadOptions = {
  downloadFormat: string
  PictureName: any
}
//用type关键字去定义为了接口引用类型
export interface GBoardApi {
  GBname: string
  lineWidth: number
  eraser: string
  eraserAttr: Method
  pen: string
  penAttr: Method
  clear: string
  download: string
  downloadType: downloadOptions
  undo: string
  undoAttr: Method
  redo: string
  redoAttr: Method
}
