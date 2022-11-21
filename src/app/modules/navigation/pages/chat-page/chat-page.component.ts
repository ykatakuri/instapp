import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat.interface';
import {ActivatedRoute, Router} from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service.service';
import { DocumentReference } from '@angular/fire/firestore';
// import * as $ from 'jquery';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  public chat: Chat[] = [];

  public idDoc: string= "";

  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private chatService: ChatService) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.idDoc = params['chat'];
    });

    this.chatService.fetchConv(this.idDoc).subscribe(data => {
      console.log(data);
      this.chat = data;

    })
}
}
