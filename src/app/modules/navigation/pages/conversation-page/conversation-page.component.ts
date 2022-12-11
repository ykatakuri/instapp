import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.interface';
import { ChatService } from 'src/app/services/chat.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {
  public chat: Chat[] = [];

  public ref: string= localStorage.getItem('userId')!;

  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private chatService: ChatService) {

  }

  ngOnInit(): void {
    console.log(localStorage.getItem('userId'));

    this.chatService.fetchChat("asc", this.ref).subscribe(data =>{
      //console.log(data[0].messages[0].content);
      console.log(data);


      this.chat = data;
    })

  }


  public openChat(chat: Chat): void {
    this.router.navigateByUrl(`/chat/${chat.id}`);
    // this.router.navigate(['/chat/'], {queryParams: {docId: chat.id}});
  }

}
