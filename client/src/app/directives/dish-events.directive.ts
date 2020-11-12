import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[dish-events-directive]',
})
export class DishEventsDirective implements OnInit {
  // @HostListener('mouseenter') mouseover(eventData: Event) {
  //   this.renderer.setStyle(
  //     this.elmRef.nativeElement,
  //     'filter',
  //     'saturate(1.2)'
  //   );
  // }

  // @HostListener('mouseleave') mouseleave(eventData: Event) {
  //   this.renderer.setStyle(this.elmRef.nativeElement, 'filter', 'saturate(1)');
  // }

  // There is an alternative for not using Renderer2, which is ok for usage but it is good to know diffrent approaches:

  @Input() backgroundColor: string = '#ffffffb2';
  // Now developers can set backgroundColor from outside on element like this:
  // <element dish-events-directive backgroundColor="something else than #ffffffb2" ></element>

  // Adding @HostBinding for binding to properties(order button background-color):
  @HostBinding('style.backgroundColor') orderBtnBG: string;

  constructor() {}

  ngOnInit() {
    this.orderBtnBG = this.backgroundColor;
  }

  // Order button events:

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.orderBtnBG = 'black';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.orderBtnBG = this.backgroundColor;
  }
}
