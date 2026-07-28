import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight: string = 'yellow';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.appHighlight);

    this.renderer.setStyle(this.element.nativeElement, 'transition', 'background-color 0.3s ease');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(this.element.nativeElement, 'backgroundColor');
  }
}
