namespace utilbase {
  export default class util {
    constructor() {}
    typeof(element: string) {
      return typeof element === 'string' ? document.querySelector(element) : element
    }
  }
}
