import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { AppUser } from 'src/app/models/app.user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {
  userInfosForm!: FormGroup;
  user$!: Observable<AppUser>;
  currentUserId!: string;
  currentUserName!: string;
  currentUserUsername!: any;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.authService.user.pipe(
      tap((user) => {
        this.currentUserId = user?.uid!;
        this.currentUserName = user?.displayName!;
      }),
    ).subscribe();

    // TODO: Get the user by Id
    this.userService.getUserById(localStorage.getItem('userId')!).pipe(
      tap((user) => {
        // this.currentUserName = user?.fullname;
        // this.currentUserUsername = user?.username;
        console.log('user: ' + user);
      })
    ).subscribe();

    this.userInfosForm = this.formBuilder.group({
      fullname: [this.currentUserName, [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit(): void {
    console.log('On submit form');
  }

  getFullnameErrorMessage() {
    if (this.userInfosForm.controls['fullname'].hasError('required')) {
      return 'Veuillez saisir votre nom complet';
    } else if (this.userInfosForm.controls['fullname'].hasError('minlength')) {
      return 'Nom trop court';
    }

    return this.userInfosForm.controls['fullname'].hasError('minlength') ? 'Nom trop court' : '';
  }

  getUsernameErrorMessage() {
    if (this.userInfosForm.controls['username'].hasError('required')) {
      return 'Veuillez saisir votre nom d’utilisateur';
    } else if (this.userInfosForm.controls['username'].hasError('minlength')) {
      return 'Nom trop court';
    }

    return this.userInfosForm.controls['username'].hasError('minlength') ? 'Nom trop court' : '';
  }
}
