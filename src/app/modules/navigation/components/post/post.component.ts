import { Component, Input, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.interface';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  user$!: Observable<AppUser>;

  buildPost(post: Post): Post { return post };

  constructor(
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
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
}
