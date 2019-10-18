import { utilbase } from '../base/index'
import { GBoardApi } from '../types/index'
namespace Commponent {
    // 类装饰器可传参
    export function extend(noticetitle: any,name: any){
        let utilbasename: any = new utilbase.Util()
        this.noticetitle = noticetitle
        this.noticeWrap = null
        this.noticeBtn =null
        return function(viewui: any){
            viewui.prototype.vuinit= function(){
                let div:any = doucment.createElement('div')
                let style:any = document.createElement('style')
                let head:any = document.getElementsByTagName('head')[0]
                let body:any = document.getElementsByTagName('body')[0]
                this.notcieWrap = div.getElementsByClassName('notification')[0]
                this.noticeBtn = div.getElementsByClassName('noticeBtn')[0]
                let vuNotice:any = this.vuNotice(this.title,this.any)
                style.innerHTML = noticeStyle()
                div.innerHTML = vuNotice
                head.appendChild(style)
                body.appendChild(div)
                utilbasename.addEvent(this.noticeBtn,'click',()=>{
                    this.vNhide();
                })
            }
            viewui.prototype.vuNotice=function(title:any,content: any){
                let title:any = title
                let content:any = content
                let tpl:any  =  
                `<div class="notification" style="positon: absolute; top: 0;z-index: 1000;">'
                    '<div class="noticegrounp">'
                        '<h2 class="notice_title">'
                            ${title}
                        '</h2>'
                        '<div class="noticecontent">'
                            '<p>'
                                ${content}
                            '</p>'
                        '</div>'
                        '<div class="noticeBtn">'
                        '</div>'
                    '</div>'
                '</div>`
                return tpl
            }
            viewui.prototype.noticeStyle = function() {
                let nstyle = `
                    .notiffication {
                        display: flex;
                        width: 330px;
                        padding: 14px 26px 14px 13px;
                        border-radius: 8px;
                        box-sizing: border-box;
                        border: 1px solid #ebeef5;
                        position: fixed;
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
                        cursor: pointer;
                        color: #909399;
                        font-size: 16px;
                    }
                `
                return nstyle
            }
            viewui.prototype.vNhide=function(){
                utilbasename.css(this.noticeWrap,{
                    display: 'none'
                })
            }
        }
    }
    @extend
    export class ViewUi{
        constructor()
    }
}