import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
  selector: "[AutoFocusDirective]",
})
export class AutofocusDirective implements OnChanges {
  @Input() public isFocus: boolean = false;

  public constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes["isFocus"].currentValue) {
      this.el.nativeElement.blur();
    } else {
      setTimeout(() => {
        this.el.nativeElement.focus();
        this.el.nativeElement.select();
      }, 100);
    }
  }
}
