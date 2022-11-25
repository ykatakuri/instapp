import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { AuthenticationService } from 'src/app/core/services/authenticationService';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService : AuthenticationService) {}

  ngOnInit(): void {}


}
