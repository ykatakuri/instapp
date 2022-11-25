import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.interface';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<Post[]>;
  user$!: Observable<AppUser>;

  username!: string;
  postsCount!: any;

  buildPost(post: Post): Post { return post };

  private destroy$!: Subject<boolean>;

  constructor(
    private userService: UsersService,
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.getUsername(localStorage.getItem('userId')!);
    this.posts$ = this.postService.getUserPosts(localStorage.getItem('userId')!).pipe(takeUntil(this.destroy$));
    this.postService.countPosts().then(
      (count) => this.postsCount = count.data.toString()
    );
    console.log('Post count: ' + this.postsCount);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  async onLike(postId: string, postLikeCount: number): Promise<void> {
    console.log('Like is clicked!');
    console.log(postId);
    this.postService.getPostById(postId).pipe(take(1)).subscribe(
      (post) => {
        const newCount = post.likeCount! + 1;
        this.postService.updatePost(this.buildPost(
          {
            createAt: post.createAt,
            id: post.id,
            imageUrl: post.imageUrl,
            likeCount: newCount,
            title: post.title,
            userId: post.userId,
          }
        ));
        console.log(newCount);
      }
    );


  }

  getUsername(userId: string): void {
    this.user$ = this.userService.getUserById(userId);

    this.user$.pipe(take(1)).subscribe(
      value => this.username = value.fullname,
    );
  }


}
