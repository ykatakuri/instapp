import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
@Component({
  selector: "app-native-camera",
  templateUrl: "./native-camera.component.html",
  styleUrls: ["./native-camera.component.scss"],
})
export class NativeCameraComponent implements AfterViewInit {
  @ViewChild("cameraInput") cameraInput!: ElementRef;
  public photo: SafeUrl = "";
  constructor(private sanitizer: DomSanitizer) { }
  ngAfterViewInit(): void {
    this.cameraInput.nativeElement.click();
  }
  public getPhoto(event: Event): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    if (target && target.files && target.files.length > 0) {
      const objectURL = URL.createObjectURL(target.files[0]);
      this.photo = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    }
  }
}