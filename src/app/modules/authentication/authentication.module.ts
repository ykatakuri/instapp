import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';



@NgModule({
  declarations: [
    AuthenticatorComponent,
    AuthenticationPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    AuthenticationPageComponent,
  ],
})
export class AuthenticationModule { }
