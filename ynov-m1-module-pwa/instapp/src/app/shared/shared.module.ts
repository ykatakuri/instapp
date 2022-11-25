import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoadersComponent } from "./components/loaders/loaders.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ToastsComponent } from "./components/toasts/toasts.component";
import { ToastComponent } from "./components/toasts/toast/toast.component";
import { AutofocusDirective } from "./directives/auto-focus.directive";
import { IconsComponent } from "./components/toasts/icons/icons.component";

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, FontAwesomeModule];

const PIPES: any = [];

const COMPONENTS = [...PIPES, LoadersComponent, SpinnerComponent, ToastsComponent, ToastComponent, IconsComponent];

const DIRECTIVES = [AutofocusDirective];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES],
  providers: [...PIPES],
})
export class SharedModule {}
