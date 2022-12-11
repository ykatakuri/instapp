import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Friend } from 'src/app/models/friend.interface';
import { Post } from 'src/app/models/post.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FriendsService } from 'src/app/services/friends.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges {
  posts$!: Observable<Post[]>;
  postCount!: number;
  friends$!: Observable<Friend[]>;
  currentUser$ = this.authService.user;
  currentUserId = window.localStorage.getItem('userId');
  friends!: Observable<Friend[]>;
  postsTest!: Post[];

  constructor(
    private postService: PostsService,
    private friendsService: FriendsService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getPostsCount();

    this.getFriendsPosts();

    this.posts$ = this.postService.getUserPosts(this.currentUserId!);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('postCount');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.getPostsCount();
    }
  }

  getPostsCount(): void {
    Promise.resolve(this.postService.countPosts())
      .then(
        (snapshot) => {
          let count = snapshot.data().count;
          localStorage.setItem('postCount', count.toString());
        }
      );
    this.postCount = parseInt(localStorage.getItem('postCount')!);
  }

  getFriendsPosts(): void {
    this.friendsService.getAllFriends().subscribe((friends) => {
      for (const friend of friends) {
        console.log('User Friend: ', friend.fullname);
        this.postService.getUserPosts(friend.id).pipe(
          take(1),
          map((posts) => {
            console.log('Friends Posts: ', posts);
            this.postsTest = posts;
            console.log('Friends Posts: ', this.postsTest);
            return posts;
          })
        ).subscribe();
      }
    });
  }
}
