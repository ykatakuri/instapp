import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { WebcamModule } from 'ngx-webcam';
import { HomePageService } from 'src/app/services/home-page.service';
import { FormBottomSheetComponent } from './components/form-bottom-sheet/form-bottom-sheet.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectPhotoBottomSheetComponent } from './components/select-photo-bottom-sheet/select-photo-bottom-sheet.component';
import { NavigationRoutingModule } from './navigation-routing.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { AppBarComponent } from './pages/home-page/components/app-bar/app-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    SearchPageComponent,
    ChatPageComponent,
    NotificationsPageComponent,
    ProfilePageComponent,
    HomePageComponent,
    AppBarComponent,
    SelectPhotoBottomSheetComponent,
    FormBottomSheetComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    ScrollingModule,
    FlexLayoutModule,
    MatInputModule,
    MatBottomSheetModule,
    WebcamModule,
    ReactiveFormsModule,
    NavigationRoutingModule,
    FormsModule
  ],
  providers: [
    HomePageService
  ]
})
export class NavigationModule { }
