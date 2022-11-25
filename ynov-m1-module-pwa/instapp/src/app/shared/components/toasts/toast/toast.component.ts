import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Toast } from "src/app/core/interfaces/toast.interface";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent implements OnInit {
  @Input() toast!: Toast;
  @Input() position!: "left" | "right";
  @Output() closeEvent: EventEmitter<Toast> = new EventEmitter<Toast>();

  public width: number = 100;
  public isFinished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    let duration = this.toast.duration;

    if (duration > 0) {
      const id = setInterval(() => {
        if (duration === 0) {
          this.isFinished = true;
          clearInterval(id);
        } else {
          duration -= 100;
          this.width = (duration * 100) / this.toast.duration;
        }
      }, 100);
    }
  }

  public close(): void {
    this.isFinished = true;
    setTimeout(() => {
      this.closeEvent.emit(this.toast);
    }, 600);
  }
}
