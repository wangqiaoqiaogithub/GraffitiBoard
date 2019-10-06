export type Method = {
  naturename: string
  elementname: any
}
export type downloadOptions = {
  downloadFormat: string
  PictureName: any
}
/*以上是主模块的interface声明*/
export type aModePattern = [string, string]
//用type关键字去定义为了接口引用类型
//这是主模块的interface
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
  penrang: string
}
//以上是主模块的interface
//这是内置设色器模块的interface
export interface cpickerApi {
  elem: any
}
//以上是内置设色器的interface
