import { NgModule } from "@angular/core";
import { UserLayoutComponent } from "./user-layout.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [UserLayoutComponent],
  imports: [SharedModule],
  exports: [UserLayoutComponent],
})
export class UserLayoutModule {}
