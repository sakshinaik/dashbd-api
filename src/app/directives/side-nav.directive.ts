import {Directive, ElementRef, HostListener, Input, Renderer, Renderer2} from '@angular/core';

@Directive({
  selector: '[navHighlight]',
})
export class SideNavDirective {
    @Input('navHighlight') show1: number;
    constructor(private el: ElementRef,
    private r:Renderer2) {

     }
     private showHide(show: number){
         if(show == 1){
            this.r.addClass(this.el.nativeElement, 'visible');
         } else {
            this.r.removeClass(this.el.nativeElement, 'visible');
         }
      }

    @HostListener('mouseenter') onMouseEnter() {
      this.showHide(1)
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.showHide(0)
      }
}