export namespace utilbase {
  export class Util {
    /**
     * typeof方法特性如下
     * @method typeof
     * @param element:string
     */
    public typeof(element: string) {
      return typeof element === 'string' ? document.querySelector(element) : element
    }
    /**
     * 通过Util基类中的addEvent方法兼容addEventListener和attachEvent并提供该接口
     * @method addEvent
     * @param element
     * @param type
     * @param function fn
     */
    public addEvent(element: any, type: string, fn: any) {
      if ((document as any).addEventListener) {
        element.addEventListener(type, fn, false)
        return element
      } else if ((document as any).attachEvent) {
        let bound: any = function() {
          return fn.apply(element, arguments) // 不能使用箭头函数表达式(特性)
        }
        element.attachEvent('on' + type, bound)
        return bound
      }
    }
    /**
     * 通过util类封装设置自定义属性方法
     * @method addAttr
     * @param element
     * @param nature
     * @param className
     */
    public addAttr(element: any, nature: string, className: string) {
      return element.setAttribute(nature, className)
    }
    /**
     * 通过util类封装删除自定义属性方法
     * @method removeAttr
     * @param element
     * @param nature
     * @param className
     */
    public removeAttr(element: any, nature: string, className: string) {
      return element.removeAttribute(nature, className)
    }
    /**
     * 通过util类封装添加样式的方法放在css函数里
     * @method css
     * @param element
     * @param obj
     */
    public css(element: any, obj: any) {
      for (let i in obj) {
        element.style[i] = obj[i]
      }
    }
    // 设置元素透明度,透明度值按IE规则计,即0~100
    public setopacity(ev: any, value: any) {
      ev.filters ? (ev.style.filter = `alpha(opacity=${value})`) : (ev.style.opacity = value / 100)
    }
  }
}
