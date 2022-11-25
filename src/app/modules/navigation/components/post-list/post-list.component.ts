import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AppUser } from 'src/app/models/app-user.interface';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts$!: Observable<Post[]>;
  user$!: Observable<AppUser>;

  private destroy$!: Subject<boolean>;

  constructor(
    private postService: PostsService,
  ) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.posts$ = this.postService.getAllPosts().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
