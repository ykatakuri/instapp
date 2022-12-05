import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { Post } from 'src/app/models/post.interface';
import { UsersService } from 'src/app/services/users.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  isLiked!: boolean;
  color!: string;

  tempUserId: string = localStorage.getItem('userId')!;

  userPhotoUrl!: string;

  user$!: Observable<AppUser>;

  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.color = '';
    this.isLiked = false;
    this.user$ = this.userService.getUserById(this.tempUserId);
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

  openCommentDialog(): void {
    this.dialog.open(CommentComponent, { data: this.post.id });
  }
}
