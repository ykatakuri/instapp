import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { AuthenticationPageComponent } from './pages/authentication-page/authentication-page.component';



@NgModule({
  declarations: [
    AuthenticatorComponent,
    AuthenticationPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  exports: [
    AuthenticationPageComponent,
  ],
})
export class AuthenticationModule { }
