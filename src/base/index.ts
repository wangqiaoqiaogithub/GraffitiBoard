namespace utilbase {
  export class util {
    public typeof(element: any) {
      return typeof element === 'string' ? document.querySelector(element) : element
    }
  }
}
