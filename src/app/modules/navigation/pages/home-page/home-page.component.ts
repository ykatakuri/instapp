import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, CollectionReference, Timestamp } from "firebase/firestore";
import { first, Observable } from 'rxjs';
import { HomePageService } from 'src/app/services/home-page.service';
import { AppPost } from 'src/app/models/app-post.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  posts : AppPost[] = []

  constructor(private homePageService : HomePageService) {
  }

  ngOnInit(): void {
    // let posts = this.fetchPosts();
    // console.log(posts);

    this.homePageService.fetchPosts().subscribe(data => {

      this.posts = data;
      console.log(data)
      console.log("posts" + this.posts)
    })
  }


  // async getAllPosts(){
  //   const querySnapshot = await getDocs(collection(db, "post"));
  //   querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  //   });
  // }

  public fetchPosts(): Observable<AppPost[]> {
    return this.homePageService.fetchPosts();
  }

}
