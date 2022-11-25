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
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { AppBarComponent } from './pages/home-page/components/app-bar/app-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotificationsPageComponent } from './pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NbThemeModule,NbChatModule } from '@nebular/theme';
import { CreatePostCameraComponent } from './components/create-post-camera/create-post-camera.component';
import { CreatePostFileComponent } from './components/create-post-file/create-post-file.component';
import { PostComponent } from './components/post/post.component';
import { ListeChatComponent } from './pages/liste-chat/liste-chat.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchPageComponent,
    ChatPageComponent,
    NotificationsPageComponent,
    ProfilePageComponent,
    HomePageComponent,
    AppBarComponent,
    CreatePostCameraComponent,
    PostComponent,
    CreatePostFileComponent,
    ListeChatComponent
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
    NbChatModule,
  ],
  exports: [

  ],
})
export class NavigationModule { }
