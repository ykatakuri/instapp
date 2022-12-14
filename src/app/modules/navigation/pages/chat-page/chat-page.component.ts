import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, map, Observable, of, startWith, switchMap } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { Chat, Message } from 'src/app/models/chat.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  @ViewChild('endOfChat')
  endOfChat!: ElementRef;

  panelOpenState = false;
  currentUser$ = this.authService.user;
  currentUserChats$!: Observable<Chat[]>;
  users$!: Observable<AppUser[]>;
  selectedChat$!: Observable<Chat | undefined>;
  messages$: Observable<Message[]> | undefined;

  searchForm!: FormGroup;

  messageControl = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private chatsService: ChatsService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });

    this.users$ = combineLatest([
      this.usersService.getAllUsers(),
      this.currentUser$,
      this.searchForm.controls['search'].valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, user, searchString]) => users.filter(
        u => (u.username?.toLowerCase().includes(searchString) &&
          u.id !== user?.uid) || (u.username?.toUpperCase().includes(searchString) &&
            u.id !== user?.uid)
      ))
    );

    this.currentUserChats$ = this.chatsService.currentUserChats;
  }

  onCreateChat(otherUser: AppUser): void {
    this.chatsService
      .isExistingChat(otherUser.id)
      .pipe(
        switchMap((chatId) => {
          if (!chatId) {
            return this.chatsService.createChat(otherUser);
          } else {
            return of(chatId);
          }
        })
      )
      .subscribe();
  }

  onSendMessage(chatId: string): void {
    const message = this.messageControl.value;

    if (message && chatId) {
      this.chatsService.addChatMessage(chatId, message).subscribe();
      this.messageControl.setValue('');
    }
  }

  getMessages(chatId: string): void {
    this.panelOpenState = true;

    this.messages$ = this.chatsService.getChatMessages$(chatId);
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

}
