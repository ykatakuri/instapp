import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-user-page',
  templateUrl: './single-user-page.component.html',
  styleUrls: ['./single-user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleUserPageComponent implements OnInit {

  userPosts$!: Observable<Post[]>;

  user$!: Observable<AppUser>;

  constructor(
    private postService: PostsService,
    private userService: UsersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const userId = +this.route.snapshot.params['id'];
    this.user$ = this.userService.getUserById(userId.toString());

    this.userPosts$ = this.postService.getUserPosts(userId.toString());
  }

}
