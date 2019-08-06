/**
 * GraffitiBoard.js v0.1.0
 * (c) 2019 by wangqiaoqiao
 * Released under the MIT License.
 */
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
      if ((document as any).addEventListener || (window as any).addEventListener) {
        element.addEventListener(type, fn, false)
        return element
      } else if ((document as any).attachEvent || (window as any).attachEvent) {
        var bound: any = function() {
          return fn.apply(element, arguments) //不能使用箭头函数表达式(特性)
          /**以下为箭头函数表达式带来的以下主要特性
           * 1.箭头函数表达式的语法比函数表达式更短
           * 2.并且没有自己的这，arguments，super或new.target
           * 3.这些函数表达式更适用于那些本来需要匿名函数的地方，并且它们不能用作构造函数。
           */
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
