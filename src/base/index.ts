namespace utilbase {
  export class Util {
    public typeof(element: any) {
      return typeof element === 'string' ? document.querySelector(element) : element
    }
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
  }
}
