export namespace utilbase {
  export class Util {
    /**
     *
     */
    public typeof(element: string) {
      return typeof element === 'string' ? document.querySelector(element) : element
    }
    /**
     *
     */
    public addEvent(element: string, type: string, fn: any) {
      if ((document.addEventListener as any) || (window.addEventListener as any)) {
        element.addEventListener(type, fn, false)
        return element
      } else if ((document.attachEvent as any) || (window.attachEvent as any)) {
        var bound: any = () => {
          return fn.apply(element, arguments as any)
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
