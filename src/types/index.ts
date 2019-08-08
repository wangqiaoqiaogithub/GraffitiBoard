export type Method = {
  naturename: string
  elementname: any
}
export interface GBoardApi {
  lineWidth: number
  eraser: string
  eraserAttr: Method
  pen: string
  penAttr: Method
  clear: string
  download: string
}
