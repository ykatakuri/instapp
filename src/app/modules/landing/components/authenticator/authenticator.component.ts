import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {
  state = AuthenticationState.LOGIN;

  ngOnInit(): void {
  }

  constructor(private authenticationService: AuthenticationService) { }

  onLogin(loginEmail: HTMLInputElement, loginPassword: HTMLInputElement): void {
    let email = loginEmail.value;
    let password = loginPassword.value;

    if (this.isNotEmpty(email.trim()) && this.isNotEmpty(password.trim())) {
      this.authenticationService.signIn(
        email,
        password,
      );
    }
  }

  onSignup(signupEmail: HTMLInputElement, signupPassword: HTMLInputElement, signupFullname: HTMLInputElement): void {
    let email = signupEmail.value;
    let password = signupPassword.value;
    let fullname = signupFullname.value;

    if (this.isNotEmpty(email.trim()) && this.isNotEmpty(password.trim())) {
      this.authenticationService.signUp(
        email,
        password,
        fullname,
      );
    }
  }

  onLoginClick(): void {
    this.state = AuthenticationState.LOGIN;
  }

  onForgotPasswordClick(): void {
    this.state = AuthenticationState.FORGOT_PASSWORD;
  }

  onCreateAccountClick(): void {
    this.state = AuthenticationState.SIGNUP;
  }

  isLoginState(): boolean {
    return this.state == AuthenticationState.LOGIN;
  }

  isSignupState(): boolean {
    return this.state == AuthenticationState.SIGNUP;
  }

  isForgotPasswordState(): boolean {
    return this.state == AuthenticationState.FORGOT_PASSWORD;
  }

  getButtonText(): string {
    switch (this.state) {
      case AuthenticationState.FORGOT_PASSWORD:
        return 'Réinitialiser'
        break;
      case AuthenticationState.SIGNUP:
        return 'S’inscrire'
        break;

      default:
        return 'Se connecter'
        break;
    }
  }

  isNotEmpty(text: string): boolean {
    return text != null && text.length > 0;
  }

}

export enum AuthenticationState {
  LOGIN,
  SIGNUP,
  FORGOT_PASSWORD,
}
