import { ElementRef } from "@angular/core";
import { AutofocusDirective } from "./auto-focus.directive";

describe("AutoFocusDirective", () => {
  it("should create an instance", () => {
    const el: ElementRef = new ElementRef("input");
    const directive = new AutofocusDirective(el);
    expect(directive).toBeTruthy();
  });
});
