import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.interface';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  user$!: Observable<AppUser>;
  isLiked!: boolean;
  color!: string;

  post$!: Observable<Post>;


  constructor(
    private postService: PostsService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.color = '';
    this.isLiked = false;
    this.user$ = this.userService.getUserById(this.post.userId!);
    this.post$ = this.postService.getPostById(this.post.id);
  }

  // onLike(postId: string): void {
  //   this.isLiked = !this.isLiked;

  //   console.log('is liked: ' + this.isLiked);

  //   if (this.isLiked) {
  //     this.post$ = this.postService.likePostById(postId, this.isLiked).pipe(
  //       tap(() => this.color = 'warn')
  //     );

  //   } else {
  //     this.post$ = this.postService.likePostById(postId, this.isLiked).pipe(
  //       tap(() => this.color = '')
  //     );
  //   }
  // }

  onLike(postId: string): void {
    this.isLiked = !this.isLiked;

    console.log('is liked: ' + this.isLiked);

    if (this.isLiked) {
      this.post.likeCount! = this.post.likeCount! + 1;
      this.color = 'warn';

    } else {
      this.post.likeCount! = this.post.likeCount! - 1;
      this.color = '';
    }
  }
}
