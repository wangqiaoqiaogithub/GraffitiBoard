/**
 * GraffitiBoard.js v0.1.0
 * (c) 2019 by wangqiaoqiao
 * Released under the MIT License.
 */
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
    public addEvent(element: any, type: string, fn: any) {
      if ((document as any).addEventListener || (window as any).addEventListener) {
        element.addEventListener(type, fn, false)
        return element
      } else if ((document as any).attachEvent || (window as any).attachEvent) {
        var bound: any = () => {
          return fn.apply(element, this) //arguments
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
