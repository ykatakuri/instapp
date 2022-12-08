import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { Chat } from 'src/app/models/chat.interface';
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
  currentUser$ = this.authService.user;
  currentUserChats$!: Observable<Chat[]>;
  users$!: Observable<AppUser[]>;

  searchForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private router: Router,
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
    // this.router.navigate(['/search', otherUser.id]);
    this.chatsService.createChat(otherUser).subscribe();
  }

}
