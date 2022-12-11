import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { WebcamModule } from 'ngx-webcam';
import { CommentComponent } from './components/comment/comment.component';
import { CreatePostCameraComponent } from './components/create-post-camera/create-post-camera.component';
import { CreatePostFileComponent } from './components/create-post-file/create-post-file.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';
import { AppBarComponent } from './pages/home-page/components/app-bar/app-bar.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { InvitFriendsPageComponent } from './pages/profile-page/pages/invit-friends-page/invit-friends-page.component';
import { UserInfoPageComponent } from './pages/profile-page/pages/user-info-page/user-info-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SingleUserPageComponent } from './pages/single-user-page/single-user-page.component';
import { SinglePostPageComponent } from './pages/single-post-page/single-post-page.component';
import { DeleteDialogComponent } from './pages/single-post-page/delete-dialog/delete-dialog.component';
import { ConversationPageComponent } from './pages/conversation-page/conversation-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { GetUserPipe } from './pipes/get-user.pipe';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchPageComponent,
    ChatPageComponent,
    ProfilePageComponent,
    HomePageComponent,
    AppBarComponent,
    CreatePostComponent,
    CreatePostCameraComponent,
    CreatePostFileComponent,
    ConversationPageComponent,
    GetUserPipe,
    CreatePostFileComponent,
    PostComponent,
    PostListComponent,
    CommentComponent,
    UserInfoPageComponent,
    InvitFriendsPageComponent,
    SingleUserPageComponent,
    SinglePostPageComponent,
    DeleteDialogComponent,
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
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDividerModule,
    QRCodeModule,
    MatAutocompleteModule,
    MatExpansionModule,
    NgxScannerQrcodeModule
  ],
  exports: [

  ],
})
export class NavigationModule { }
