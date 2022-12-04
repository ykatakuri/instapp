import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  currentUserPosts$!: Observable<Post[]>;
  currentUserFullname: any;
  currentUserId: any;

  constructor(
    private authService: AuthenticationService,
    private postService: PostsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.user.pipe(
      tap((result) => {
        this.currentUserFullname = result?.displayName;
        this.currentUserId = result?.uid;
      }),
    ).subscribe();

    this.currentUserPosts$ = this.postService.getUserPosts(this.currentUserId);
  }

  onPersonalInformation(): void {
    this.router.navigateByUrl('user-infos');
  }
}
