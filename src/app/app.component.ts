import { Component, OnDestroy } from '@angular/core';
import { NgxScannerQrcodeService } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'instapp';

  ngOnDestroy(): void {
    localStorage.clear();
  }

  public onError(e: any): void {
    alert(e);
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, console.error);
  }

  constructor(private qrcode: NgxScannerQrcodeService) {  }
}
