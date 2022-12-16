import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { Chat } from 'src/app/models/chat.interface';
import { ChatService } from 'src/app/services/chat.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {
  public chat: Chat[] = [];

  public ref!: string | undefined;

  currentUser$!: Observable<AppUser | null>;

  constructor(private route: ActivatedRoute, private router: Router, private usersService: UsersService,private loaderService: LoaderService, private chatService: ChatService) {

  }

  ngOnInit(): void {
    this.currentUser$ = this.usersService.currentUserProfile;
    this.currentUser$.subscribe((user) => {
      // console.log(user?.id);
      this.ref = user?.id;
      console.log(this.ref);
      this.chatService.fetchChat("asc", this.ref).subscribe(data =>{
        console.log(data);

        this.chat = data;
      })
    })

  }


  public openChat(chat: Chat): void {
    this.router.navigateByUrl(`/chat/${chat.id}`);
    // this.router.navigate(['/chat/'], {queryParams: {docId: chat.id}});
  }

}
