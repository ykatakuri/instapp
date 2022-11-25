import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
