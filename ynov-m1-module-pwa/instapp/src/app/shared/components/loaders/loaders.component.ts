// Angular
import { Component } from "@angular/core";

// Models
import { Loader } from "src/app/core/interfaces/loader.interface";

// Services
import { LoaderService } from "src/app/core/services/loader.service";

@Component({
  selector: "app-loaders",
  templateUrl: "./loaders.component.html",
  styleUrls: ["./loaders.component.scss"],
})
export class LoadersComponent {
  public loaders: Loader[] = [];
  public isRefreshButtonDisplayed: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.getLoaders().subscribe((loaders) => {
      this.loaders = loaders;
    });

    this.loaderService.refreshButton$.subscribe((state) => {
      this.isRefreshButtonDisplayed = state;
    });
  }

  public refreshApplication(): void {
    window.location.reload();
  }
}
