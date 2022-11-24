import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  userId!: string;
  username!: string;

  constructor(
    private userService: UsersService,
    private postService: PostsService
  ) { }

  ngOnInit(): void {
    this.getUsername('BBgZzekbRhWxlH4K0s1e');
    this.posts$ = this.postService.getAllPosts();
  }

  getUsername(userId: string): void {
    this.userId = userId;
    this.user$ = this.userService.fetchUserById(userId);

    this.user$.subscribe(
      value => this.username = value.fullname,
    );
  }

}
