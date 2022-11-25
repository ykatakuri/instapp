import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat.interface';
import {ActivatedRoute, Router} from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service.service';

@Component({
  selector: 'app-liste-chat',
  templateUrl: './liste-chat.component.html',
  styleUrls: ['./liste-chat.component.scss']
})
export class ListeChatComponent implements OnInit {
  public chat: Chat[] = [];

  public ref: string= localStorage.getItem('userId')!;

  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private chatService: ChatService) {

  }

  ngOnInit(): void {

    this.chatService.fetchChat("asc", this.ref).subscribe(data =>{
      //console.log(data[0].messages[0].content);
      console.log(data);
      // data.forEach(d => {
      //   console.log(d.messages[0])
      // })

      this.chat = data;
    })

  }


  public openChat(chat: Chat): void {
    this.router.navigateByUrl(`/chat/${chat.id}`);
    // this.router.navigate(['/chat/'], {queryParams: {docId: chat.id}});
  }

}
