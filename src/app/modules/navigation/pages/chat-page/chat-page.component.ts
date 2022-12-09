import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Chat, Message } from 'src/app/models/chat.interface';
import {ActivatedRoute, Router} from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentReference, Timestamp } from 'firebase/firestore';
import { NotificationsService } from 'src/app/services/notifications.service';


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

  public notifications!: NotificationsService;


  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private chatService: ChatService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((data) => {
      console.log(data.get('docId'));

      this.idDoc = data.get('docId')!;

    })



    this.chatService.fetchConvById(this.idDoc).subscribe(data => {
      this.RefUser = data.messages[0].sender;

      // this.chatService.fetchUser(data.messages[0].sender).subscribe(user => {
      //   console.log(user.firstname);
      // })

      console.log(data);
      this.chat.push(data);
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
      this.notifications.generateNotification("test", "aze");
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
