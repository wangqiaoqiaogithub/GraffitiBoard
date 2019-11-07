import { utilbase } from '../baseMethod/index'
// import { GBoardApi } from '../types/index'
export namespace Component {
  // 类装饰器可传参
  export function addExtend(params: any) {
    params.prototype.utilbasename = null
    params.prototype.noticeWrap = null
    params.prototype.noticeBtn = null
    params.prototype.noticeTitle = undefined
    params.prototype.noticecontent = undefined
    params.prototype.vuinit = function(vutitle: any, vucontent: any) {
      let div: any = document.createElement('div')
      let style: any = document.createElement('style')
      let head: any = document.getElementsByTagName('head')[0]
      let body: any = document.getElementsByTagName('body')[0]
      this.utilbasename = new utilbase.Util()
      this.noticeWrap = div.getElementsByClassName('notification')[0]
      this.noticeBtn = div.getElementsByClassName('noticeBtn')[0]
      this.noticeTitle = vutitle
      this.noticecontent = vucontent
      let vuNotice: any = this.vuNotice(this.noticeTitle, this.noticecontent)
      style.innerHTML = this.noticeStyle()
      div.innerHTML = vuNotice
      head.appendChild(style)
      body.appendChild(div)
      this.utilbasename.addEvent(div.getElementsByClassName('noticeBtn')[0], 'click', () => {
        div.getElementsByClassName('notification')[0].style = 'display: none'
      })
    }
    params.prototype.vuNotice = function(title: string, content: string) {
      let vunTitle: any = title
      let vunContent: any = content
      let tpl: any = `<div class="notification" style="position: absolute; top: 10px;z-index: 1000;">
                <div class="noticegrounp">
                    <h2 class="notice_title">
                        ${vunTitle}
                    </h2>
                    <div class="noticecontent">
                        <p>
                            ${vunContent}
                        </p>
                    </div>
                    <div class="noticeBtn">
                    </div>
                </div>
            </div>`
      return tpl
    }
    params.prototype.noticeStyle = function() {
      let nstyle = `
            .notification {
            display: flex;
            width: 330px;
            padding: 14px 26px 14px 13px;
            border-radius: 8px;
            box-sizing: border-box;
            border: 1px solid #ebeef5;
            position: fixed;
            right: 20px;
            background-color: #fff;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
            overflow: hidden;
            }
            .noticegrounp{
            margin-left: 13px;
            margin-right: 8px;
            }
            .notice_title{
            font-weight: 700;
            font-size: 16px;
            color: #303133;
            margin: 0;
            }
            .notciecontent{
            font-size: 14px;
            line-height: 21px;
            margin: 6px 0 0;
            color: #606266;
            text-align: justify;
            }
            .noticecontent p{
            margin: 0;
            }
            .noticeBtn{
            position: absolute;
            top: 18px;
            right: 15px;
            width: 10px;
            height: 10px;
            cursor: pointer;
            background: #000;
            color: #909399;
            font-size: 16px;
            }
            `
      return nstyle
    }
    params.prototype.vhide = function() {
      // utilbasename.css(this.noticeWrap,{
      //     display: 'none'
      // })
      this.fadeOut(document.getElementsByClassName('notification')[0], 200, 10)
    }
    params.prototype.fadeOut = function(elem: any, speed: any, opacity: any) {
      speed = speed || 20
      opacity = opacity || opacity
      /**
       * 参数说明
       * elem==>需要淡入的元素
       * speed==>淡入速度,正整数(可选)
       * opacity==>淡入到指定的透明度,0~100(可选)
       */
      let val = 100
      ;(function(this: any) {
        this.utilbasename.opacity(elem, val)
        val -= 5
        if (val >= opacity) {
          // tslint:disable-next-line:no-arg
          setTimeout(arguments.callee, speed)
        } else {
          elem.style = 'display:none'
        }
      })()
    }
  }
  @addExtend
  export class ViewUi {
    constructor() {
      return
    }
  }
}
