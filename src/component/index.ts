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
            viewui.prototype.init= function(){
                let div:any = doucment.createElement('div')
                let body:any = document.getElementsByTagName('body')[0]
                this.notcieWrap = div.getElementsByClassName('notification')[0]
                this.noticeBtn = div.getElementsByClassName('noticeBtn')[0]
                let vuNotice:any = this.vuNotice(this.title,this.any)
                div.innerHTML = vuNotice
                body.appendChild(div)
                utilbasename.addEvent(this.noticeBtn,'click',()=>{
                    this.vNhide();
                })
            }
            viewui.prototype.vuNotice=function(title:any,content: any){
                let title = title
                let content = content
                let tpl  =  
                `<div class="notification" style="positon: absolute; top: 0;z-index: 1000;padding: 14px 26px 14px 13px">'+
                    '<h2 class="notice_title" style="font-size: 16px; color: #303133;">'+
                        ${title}
                    '</h2>'+
                    '<div class="notice" style="font-size: 14px;line-height: 21px;margin: 6px 0 0;color: #606266;">'+
                        '<p class="margin: 0;">'+
                            ${content}
                        '</p>'+
                        '<div class="noticeBtn" style="position: absolute;top: 18px;right: 15px;cursor: pointer;color: #909399;">'+
                        '</div>'+
                    '</div>'+
                '</div>`
                return tpl
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