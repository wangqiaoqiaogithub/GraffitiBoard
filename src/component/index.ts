import { utilbase } from '../base/index'
import { GBoardApi } from '../types/index'
namespace Commponent {
    // 类装饰器可传参
    export function extend(name: string,title: any,name: any){
        let utilbasename: any = new utilbase.Util()
        this.title = title
        this.name  = name
        return function(viewui: any){
            viewui.prototype.init= function(){
                let vuNotice = this.vuNotice(this.title,this.any)
                document.innerHTML = vuNotice;
            }
            viewui.prototype.vuNotice=function(title:any,content: any){
            let title = title
            let content = content
            let tpl  =  
            '<div class="notification" style="positon: absolute; top: 0;z-index: 1000;padding: 14px 26px 14px 13px">'+
                '<h2 class="notice_title" style="font-size: 16px; color: #303133;">'+
                    +title+
                '</h2>'+
                '<div class="notice" style="">'+
                    '<p class="font-size: 14px;line-height: 21px;margin: 6px 0 0;color: #606266;">'+
                        +content+
                    '</p>'+
                    '<div class="position: absolute;top: 18px;right: 15px;cursor: pointer;color: #909399;">'+
                    '</div>'+
                '</div>'+
            '</div>'+
                return tpl
            }
        }
    }
    @extend
    export class ViewUi{
        constructor()
    }
}