// Angular
import { Component } from "@angular/core";

// Services
import { ToastService } from "src/app/core/services/toast.service";

// Models
import { Toast } from "src/app/core/interfaces/toast.interface";

@Component({
  selector: "app-toasts",
  templateUrl: "./toasts.component.html",
  styleUrls: ["./toasts.component.scss"],
})
export class ToastsComponent {
  public toasts: Toast[] = [];
  public position: "left" | "right" = "right";

  constructor(private toastService: ToastService) {
    this.position = this.toastService.position;
    this.toastService.getToasts().subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  public close(toast: Toast): void {
    this.toastService.deleteToastById(toast.id!);
  }
}
