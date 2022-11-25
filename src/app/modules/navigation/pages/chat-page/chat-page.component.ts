import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Chat } from 'src/app/models/chat.interface';
import {ActivatedRoute, Router} from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import * as $ from 'jquery';


@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit {
  public chat: Chat[] = [];

  public idDoc: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private chatService: ChatService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((data) => {
      console.log(data.get('docId'));

      this.idDoc = data.get('docId')!;

    })



    this.chatService.fetchConvById(this.idDoc).subscribe(data => {

      this.chatService.fetchUser(data.messages[0].sender).subscribe(user => {
        // console.log(user.firstname);
      })

      console.log(data);
      this.chat.push(data);
    })
  }

  sendMessage(): void {

  }
}
