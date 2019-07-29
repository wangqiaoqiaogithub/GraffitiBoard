namespace utilbase {
  export class Util {
    /**
     *
     */
    public typeof(element: any) {
      return typeof element === 'string' ? document.querySelector(element) : element
    }
    /**
     *
     */
    public indexOf() {}
    /**
     *
     */
    public addEvent(element: string, type: string, fn: any) {
      if (document.addEventListener || Window.addEventListener) {
        element.addEventListener(type, fn, false)
        return element
      } else if (document.attachEvent || Window.attachEvent) {
        var bound: any = function() {
          return fn.apply(element, arguments)
        }
        element.attachEvent('on' + type, bound)
        return bound
      }
    }
    /**
     *通过util类封装设置自定义属性
     */
    public addAttr(element: any, nature: string, className: string) {
      return element.setAttribute(nature, className)
    }
    /**
     *通过util类删除自定义属性
     */
    public removeAttr(element, nature: string, className: string) {
      return element.removeAttribute(nature, className)
    }
  }
}
