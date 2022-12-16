import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DocumentReference, Firestore, Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat, Message } from 'src/app/models/chat.interface';
import { ChatService } from 'src/app/services/chat.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationsService } from 'src/app/services/notifications.service';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  public chat: Chat | undefined ;

  public idDoc: string = "";

  public message:string = "";

  public RefUser!: DocumentReference;

  // public notifications!: NotificationsService = "";





  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private chatService: ChatService, private readonly notif: NotificationsService) {
    this.RefUser = this.chatService.getUserRef(localStorage.getItem('userId')!);
  }

  ngOnInit(): void {


    this.route.paramMap.subscribe((data) => {
      console.log(data.get('docId'));

      this.idDoc = data.get('docId')!;

    })



    this.chatService.fetchConvById(this.idDoc).subscribe(data => {

      console.log(data);
      this.chat = data;
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
      this.chatService.sendMessage(this.chat);

      this.sendNotification();


    }

  }

  private sendNotification(): void {
    this.notif.generateNotification("test", "aze");
  }

  deleteMessage(sentAt: Timestamp): void {
    if (this.chat) {

      // this.chat.messages.splice(this.chat.messages.findIndex(m => {
      //   m.sentAt.toDate().getTime()===sentAt.toDate().getTime();
      // }), 1)

      this.chat.lastModification = Timestamp.fromDate(new Date());
      this.chatService.deleteMessage(this.chat, sentAt);
    }
  }

  updateMessage(sentAt: Timestamp): void {
    if (this.chat) {
      this.chatService.updateMessage(this.chat, this.message, sentAt);
    }

  }
}
