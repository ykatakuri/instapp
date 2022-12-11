import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Firestore, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
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

  private friendsCollection: CollectionReference<DocumentData>;
  private postsCollection: CollectionReference<DocumentData>;

  friends: AppUser[]=[];
  postsObv!: Observable<Post[]>;
  posts:Post[]=[];
  currentUserId: string = localStorage.getItem('userId')!;
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
    console.log("this.posts$ in postList",this.posts)
    this.getFriendsPosts();
    this.userPosts$.subscribe(res => {
      res.forEach(r => {console.log("rrr", r)})
      console.log("res truck truck", res)
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
    // const posts: Post[]= [];
    // this.firestoreService.fetchAll<AppUser>(this.friendsCollection,"id","asc").pipe(
    //   for(var i = 0; i < user.length; i++){
    //   map((user) => {

    //       this.posts$.psipe(
    //         map((post) => {})
    //       )
    //       this.firestoreService.fetchByProperty<Post>(this.postsCollection,"creatorId", user[i].id).pipe(
    //         map((post) => {

    //           this.posts.push(...post)
    //           console.log("Post in Map", post)
    //           console.log("this.posts", this.posts)
    //         })
    //       ).subscribe()
    //     }
    //     //

    //   })
    // ).subscribe()
    // this.firestoreService.fetchAll<AppUser>(this.friendsCollection,"id","asc").subscribe(friends => {

    // })

    // this.posts$ = this.firestoreService.fetchAll<AppUser>(this.friendsCollection,"id","asc").pipe(
    //   map(users => users.map(user => this.postService.getUserPosts(user.id))),
    //   switchMap(this.posts$ => forkJoin(...this.posts$))
    //   )

      this.userPosts$ = this.firestoreService.fetchAll<AppUser>(this.friendsCollection,"id","asc").pipe(
        map(users => users.map(user => this.getPostsForUser(user))),
        switchMap(userPosts$ => forkJoin(...userPosts$))
      );
      console.log("this.userPosts$", this.userPosts$)

      console.log("ET BEN ?")
  }

  private getPostsForUser(user: AppUser): Observable<{ user: AppUser, posts: Post[] }> {
    return this.postService.getUserPosts(user.id).pipe(
      map(posts => ({user, posts}))
    );
  }

  // friendToPost(): Observable<Post[]>{
  //   return this.firestoreService.fetchAll<AppUser>(this.friendsCollection,"id","asc").pipe(
  //     map((user: AppUser) => this.getUserPosts(user.id))
  //   )
  // }

  // async getUserPosts(id: string): Post[]{
  //   let result : Post[]
  //   this.postService.getUserPosts(id).subscribe(res => {result = res})
  //   console.log("result getuserPosts", result)
  //   return result;
  // }



  // this.usersWithOrders$ = this.userService.getUsers().pipe(
  //   map(users => users.map(this.getOrdersForUser)),
  //   switchMap(userWithOrders$ => forkJoin(...userWithOrders$))
  // );
}
