import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {
  currentUser$ = this.authService.user;
  users$!: Observable<AppUser[]>;

  searchForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [null],
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
  }

  onStartDiscussion(otherUser: AppUser): void {
    console.log('Other User Id: ' + otherUser.id);
    // this.router.navigate(['/search', otherUser.id]);
  }

}
