import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SearchPageComponent,
    ChatPageComponent,
    NotificationsPageComponent,
    ProfilePageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [

  ],
})
export class NavigationModule { }
