// How to create? ng g d directive name here

import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dish-basic-directive]',
})

// Bad practice:

// export class DishDirective implements OnInit {
//   constructor(private elmRef: ElementRef) {}

//   ngOnInit() {
//     this.elmRef.nativeElement.style.backgroundColor = 'white';
//   }
// }

// Better practice:
export class DishDirective implements OnInit {
  constructor(private elmRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elmRef.nativeElement,
      'background-color',
      'white'
    );
  }
}
