import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Firestore, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { combineLatest, forkJoin, map, Observable, switchMap } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { AppUser } from 'src/app/models/app.user.interface';
import { Post } from 'src/app/models/post.interface';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnChanges {

  posts$!: Observable<Post[]>;
  userPosts$!:Observable<{user: AppUser, posts : Post[]}[]>
  postCount!: number;
  currentUserId = window.localStorage.getItem('userId');
  postsTest!: Post[];

  private friendsCollection: CollectionReference<DocumentData>;
  private postsCollection: CollectionReference<DocumentData>;
  postsObv!: Observable<Post[]>;
  posts:Post[]=[];
  postSub!: Observable<Post>;

  constructor(
    private postService: PostsService,
    private readonly firestore: Firestore,
    private firestoreService: FirestoreService,
  ) {
    this.friendsCollection = collection(this.firestore, `${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}/friends`);
    this.postsCollection = collection(this.firestore, FIREBASE_COLLECTION_PATHS.POSTS);
}

  ngOnInit(): void {
    this.getPostsCount();
    this.getFriendsPosts();
    this.userPosts$.subscribe(res => {
      res.forEach(r => {console.log("rrr", r)})
    })
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

  getFriendsPosts(){
    this.userPosts$ = this.firestoreService.fetchAll<AppUser>(this.friendsCollection,"id","asc").pipe(
      map(users => users.map(user => this.getPostsForUser(user))),
      switchMap(userPosts$ => combineLatest(...userPosts$))
    );
  }

  private getPostsForUser(user: AppUser): Observable<{ user: AppUser, posts: Post[] }> {
    return this.postService.getUserPosts(user.id).pipe(
      map(posts => ({user, posts}))
    );
  }
}
