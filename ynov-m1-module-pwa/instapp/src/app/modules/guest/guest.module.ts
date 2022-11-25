import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuestRoutingModule } from './guest-routing.module';


@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
