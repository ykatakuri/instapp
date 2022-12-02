import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges {
  posts$!: Observable<Post[]>;
  postCount!: number;

  constructor(
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
    this.getPostsCount();
    this.posts$ = this.postService.getAllPosts();
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

  updateLikeCount(newCount: number): void {
    // this.post.likeCount = newCount;
  }
}
