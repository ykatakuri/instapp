import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Chat, Message } from 'src/app/models/chat.interface';
import {ActivatedRoute, Router} from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentReference, Timestamp } from 'firebase/firestore';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  public chat: Chat | undefined ;

  public idDoc: string = "";

  public message:string = "";

  public RefUser!: DocumentReference;


  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private chatService: ChatService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((data) => {

      this.idDoc = data.get('docId')!;

    })



    this.chatService.fetchConvById(this.idDoc).subscribe(data => {
      this.RefUser = data.messages[0].sender;

      // this.chatService.fetchUser(data.messages[0].sender).subscribe(user => {
      //   console.log(user.firstname);
      // })

      console.log(data);
      this.chat=data;

    })
  }

  sendMessage(): void {

    if (this.chat) {
      const message: Message = {
        content: this.message,
        sender: this.RefUser,
        sentAt: Timestamp.fromDate(new Date()),
      }

      this.chat.lastModification = Timestamp.fromDate(new Date());
      this.chat.messages.push(message);
      this.chatService.updateConv(this.chat);

    }

  }

  deleteMessage(sentAt: Timestamp): void {
    if (this.chat) {

      this.chat.messages.splice(this.chat.messages.findIndex(m => {
        m.sentAt.toMillis()===sentAt.toMillis();
      }), 1)

      this.chat.lastModification = Timestamp.fromDate(new Date());
      this.chatService.updateConv(this.chat);
    }
  }

  updateMessage(): void {

  }
}
