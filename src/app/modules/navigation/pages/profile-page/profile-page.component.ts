import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { Post } from 'src/app/models/post.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  currentUserPosts$!: Observable<Post[]>;
  currentUserFullname: any;
  currentUserId: any;

  currentUser$!: Observable<AppUser>;

  tempUserId: string = localStorage.getItem('userId')!;

  constructor(
    private authService: AuthenticationService,
    private postService: PostsService,
    private userService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.user.pipe(
      tap((result) => {
        this.currentUserFullname = result?.displayName;
        this.currentUserId = result?.uid;
      }),
    ).subscribe();

    this.currentUser$ = this.userService.getUserById(this.tempUserId);

    this.currentUserPosts$ = this.postService.getUserPosts(this.currentUserId);
  }

  onPersonalInformation(): void {
    this.router.navigateByUrl('user-infos');
  }
}
