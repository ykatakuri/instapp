import { Component, OnInit } from '@angular/core';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { AuthenticationService } from 'src/app/core/services/authenticationService';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email : string = "";
  password: string = "";

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {}

  login(){

  }
}
