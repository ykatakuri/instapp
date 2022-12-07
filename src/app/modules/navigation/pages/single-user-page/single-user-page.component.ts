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
  id!: string;
  paramSub!: any;

  constructor(
    private postService: PostsService,
    private userService: UsersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      this.user$ = this.userService.getUserById(this.id);
    });

    this.userPosts$ = this.postService.getUserPosts(this.id);
  }

  ngOnDestroy() {
    if (this.paramSub) this.paramSub.unsubscribe();
  }
}
