import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';



@NgModule({
  declarations: [
    AuthenticatorComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LandingPageComponent,
  ],
})
export class LandingModule { }
