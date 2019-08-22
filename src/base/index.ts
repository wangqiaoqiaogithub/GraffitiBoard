export namespace utilbase {
  export class Util {
    /**
     *typeof方法特性如下
     */
    public typeof(element: string) {
      return typeof element === 'string' ? document.querySelector(element) : element
    }
    /**
     *通过Util基类中的addEvent方法兼容addEventListener和attachEvent并提供该接口
     */
    public addEvent(element: any, type: string, fn: any) {
      if ((document as any).addEventListener) {
        element.addEventListener(type, fn, false)
        return element
      } else if ((document as any).attachEvent) {
        var bound: any = function() {
          return fn.apply(element, arguments) //不能使用箭头函数表达式(特性)
        }
        element.attachEvent('on' + type, bound)
        return bound
      }
    }
    /**
     *通过util类封装设置自定义属性方法
     */
    public addAttr(element: any, nature: string, className: string) {
      return element.setAttribute(nature, className)
    }
    /**
     *通过util类封装删除自定义属性方法
     */
    public removeAttr(element: any, nature: string, className: string) {
      return element.removeAttribute(nature, className)
    }
  }
}
