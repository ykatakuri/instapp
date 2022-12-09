import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { Post } from 'src/app/models/post.interface';
import { FriendsService } from 'src/app/services/friends.service';
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

  currentUser$!: Observable<AppUser | null>;

  tempUserId: string = localStorage.getItem('userId')!;

  friendsCount: number = 0;

  constructor(
    private postService: PostsService,
    private usersService: UsersService,
    private router: Router,
    private friendsService: FriendsService,
  ) { this.getFriendsCount(); }

  ngOnInit(): void {
    this.currentUser$ = this.usersService.currentUserProfile;

    this.currentUserPosts$ = this.postService.getUserPosts(this.tempUserId);
  }

  onPersonalInformation(): void {
    this.router.navigateByUrl('user-infos');
  }

  onInvitFriends(): void {
    this.router.navigateByUrl('invit-friends');
  }

  getFriendsCount(): void {
    Promise.resolve(this.friendsService.countFriends())
      .then(
        (snapshot) => {
          let count = snapshot.data().count;
          localStorage.setItem('friendsCount', count.toString());
        }
      );
    this.friendsCount = parseInt(localStorage.getItem('friendsCount')!);
  }
}
