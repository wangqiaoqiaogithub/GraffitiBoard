import { utilbase } from '../../baseMethod'
export namespace TextShape {
  const utilbasename: any = new utilbase.Util()
  export const Shapesquare = function(this: any, context: any) {
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
    let sText = `<div class="sauare_text"></div>`
    let sw = document.createElement(sText)
    let body = document.getElementsByTagName('body')[0]
    body.appendChild(sw)
    return sText
  }
}
