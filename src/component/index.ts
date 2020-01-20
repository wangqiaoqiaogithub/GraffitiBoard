import { utilbase } from '../baseMethod/index'
import { consleApi } from '../types/index'
export namespace Component {
  // addNotification 为通知组件（是类装饰器可传参）
  export function addNotification(params: any) {
    params.prototype.utilbasename = null
    params.prototype.noticeWrap = null
    params.prototype.noticeBtn = null
    params.prototype.noticeTitle = undefined
    params.prototype.noticecontent = undefined
    params.prototype.timer = undefined
    let div: any = document.createElement('div')
    params.prototype.vuinit = function(vutitle: any, vucontent: any, speed: any) {
      let div: any = document.createElement('div')
      let style: any = document.createElement('style')
      let head: any = document.getElementsByTagName('head')[0]
      let body: any = document.getElementsByTagName('body')[0]
      let onoff: Boolean = true
      this.utilbasename = new utilbase.Util()
      this.noticeTitle = vutitle
      this.noticecontent = vucontent
      speed = 4000
      let vuNotice: any = this.vuNotice(this.noticeTitle, this.noticecontent)
      let timer: any = setTimeout(() => {
        this.fadeOut(div) // 定时器删除自身
        console.log(div)
      }, speed)
      style.innerHTML = this.noticeStyle()
      div.innerHTML = vuNotice
      head.appendChild(style)
      body.appendChild(div)
      this.utilbasename.addEvent(window, 'load', () => {
        div.onmouseenter = () => {
          clearTimeout(timer)
          console.log(1)
        }
        div.onmouseleave = () => {
          timer = setTimeout(() => {
            this.fadeOut(div)
          }, 4000)
        }
      })
      if (div) {
        div.onmouseenter = () => {
          clearTimeout(timer)
          console.log(1)
        }
      }
      this.utilbasename.addEvent(div.getElementsByClassName('noticeBtn')[0], 'click', () => {
        // div.remove() // 删除自身
        this.fadeOut(div)
      })
    }
    params.prototype.vuNotice = (title: string, content: string) => {
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
    params.prototype.noticeStyle = () => {
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
    params.prototype.fadeOut = (elem: any) => {
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
  export function addconsole(params: any) {
    params.prototype.create = (parameter: consleApi) => {
      const param: any = {
        name: parameter.name,
        linktext: parameter.linktext,
        stylename: parameter.stylename,
        stylelinkt: parameter.stylelink
      }
      console.info('' + param.name + param.linktext + '', param.stylename, param.stylelinkt)
    }
    params.prototype.content = function(options: consleApi) {
      const param: any = {
        name: options.name,
        styletext: options.styletext
      }
      console.log('' + options.name + '', options.styletext)
    }
  }
  export function addAlert(params: any) {
    // 输出提示信息文本组件
    params.prototype.newcreate = function() {}
  }
  @addconsole
  @addNotification
  export class ViewUi {
    constructor() {
      return
    }
  }
}
