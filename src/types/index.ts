export type Method = {
  naturename: string
  elementname: any
}
export type downloadOptions = {
  downloadFormat: string
  PictureName: string
}
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
}
