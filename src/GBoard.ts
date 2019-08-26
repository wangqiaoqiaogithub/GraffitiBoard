// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { utilbase } from './base/index'
import { GBoardApi } from './types'
import { Mainpoint } from './main'
export class GBoard extends Mainpoint.mianMethods {
  constructor(config: GBoardApi) {
    super(config) //调用父类构造函数(属性和方法)
  }
}
export default GBoard
