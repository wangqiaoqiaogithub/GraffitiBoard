import { utilbase } from '../../baseMethod'
export namespace Shape {
  const utilbasename: any = new utilbase.Util()
  export function shapesquare(this: any, context: any) {
    let option: any = this.getOpation()
    let x: any = this.option.x
    let y: any = this.option.y
    let text: any = option.text
    context.save() // 保存上下文信息
    // 设置属性
    this.setAttributes(context)
    // 绘制图形
    text.array.forEach((val: any, key: any) => {
      context.fillText(val, x, y + option.size * key)
    })
    context.restore() // 回复上下文
  }
  export function squareText() {
    return
  }
}
