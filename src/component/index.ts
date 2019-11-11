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
    params.prototype.vuinit = function(vutitle: any, vucontent: any, speed: any) {
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
      speed = 4000 // 默认弹框隐藏显示速度
      style.innerHTML = this.noticeStyle()
      div.innerHTML = vuNotice
      head.appendChild(style)
      body.appendChild(div)
      const timer: any = setInterval(() => {
        div.remove() // 定时器删除自身
        // console.log(1)
      }, speed)
      this.utilbasename.addEvent(window, 'load', () => {
        setInterval(timer)
      })
      this.utilbasename.addEvent(div.getElementsByClassName('noticeBtn')[0], 'click', () => {
        // div.remove() // 删除自身
        this.fadeOut(div)
      })
      this.utilbasename.addEvent(
        div.getElementsByClassName('notification')[0],
        'mouseenter',
        () => {
          clearInterval(timer) // 清除定时器
        }
      )
      this.utilbasename.addEvent(
        div.getElementsByClassName('notification')[0],
        'mouseleave',
        () => {
          // 移出鼠标后删除自身
          div.remove()
        }
      )
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
    params.prototype.fadeOut = function(elem: any) {
      // 淡出功能
      if (elem.style.opacity !== 0) {
        let speed: any = undefined || 20
        let num: number = 10
        let opacityst = setInterval(() => {
          num--
          elem.style.opacity = num / 10
          if (num <= 0) {
            clearInterval(opacityst)
            elem.remove() // 删除自身
          }
        }, speed)
      }
    }
  }
  @addExtend
  export class ViewUi {
    constructor() {
      return
    }
  }
}
