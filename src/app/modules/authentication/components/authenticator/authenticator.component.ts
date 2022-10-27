import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})

// TODO: Show snackbar on authentication  
export class AuthenticatorComponent implements OnInit {
  state = AuthenticationState.LOGIN;

  loginForm!: FormGroup;
  signupForm!: FormGroup;
  resetForm!: FormGroup;

  // loginEmail = new FormControl('', [Validators.required, Validators.email]);
  // loginPassword = new FormControl('', [Validators.required,]);
  // signupEmail = new FormControl('', [Validators.required, Validators.email]);
  // signupFullname = new FormControl('', [Validators.required,]);
  // signupUsername = new FormControl('', [Validators.required,]);
  // signupPassword = new FormControl('', [Validators.required,]);
  // resetEmail = new FormControl('', [Validators.required, Validators.email]);

  // getLoginEmailErrorMessage() {
  //   if (this.loginEmail.hasError('required')) {
  //     return 'Veuillez entrer votre email';
  //   }
  //   return this.loginEmail.hasError('email') ? 'Email incorrect' : '';
  // }

  // getSignupEmailErrorMessage() {
  //   if (this.loginEmail.hasError('required')) {
  //     return 'Veuillez entrer votre email';
  //   }
  //   return this.loginEmail.hasError('email') ? 'Email incorrect' : '';
  // }

  // getLoginPasswordErrorMessage() {
  //   if (this.signupPassword.hasError('required')) {
  //     return 'Veuillez entrer votre mot de passe';
  //   }
  //   if (this.signupPassword.value!.length < 8) {
  //     return 'Mot de passe trop court';
  //   }

  //   return null;
  // }

  // getSignupFullnameErrorMessage() {
  //   if (this.signupFullname.hasError('required')) {
  //     return 'Veuillez entrer votre nom complet';
  //   }
  //   if (this.signupFullname.value!.length < 4) {
  //     return 'Trop court';
  //   }

  //   return null;
  // }

  // getSignupUsernameErrorMessage() {
  //   if (this.signupUsername.hasError('required')) {
  //     return 'Veuillez entrer votre nom d’utilisateur';
  //   }
  //   if (this.signupUsername.value!.length < 3) {
  //     return 'trop court';
  //   }

  //   return null;
  // }

  // getSignupPasswordErrorMessage() {
  //   if (this.signupPassword.hasError('required')) {
  //     return 'Veuillez entrer votre mot de passe';
  //   }
  //   if (this.signupPassword.value!.length < 8) {
  //     return 'Mot de passe trop court';
  //   }

  //   return null;
  // }

  // getResetEmailErrorMessage() {
  //   if (this.loginEmail.hasError('required')) {
  //     return 'Veuillez entrer votre email';
  //   }
  //   return this.loginEmail.hasError('email') ? 'Email incorrect' : '';
  // }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginEmail: [null, [Validators.required, Validators.email]],
      loginPassword: [null, [Validators.required,]],
    });

    this.signupForm = this.formBuilder.group({
      signupEmail: [null, [Validators.required, Validators.email]],
      signupFullname: [null, [Validators.required,]],
      signupUsername: [null, [Validators.required,]],
      signupPassword: [null, [Validators.required,]],
    });

    this.resetForm = this.formBuilder.group({
      resetEmail: [null, [Validators.required, Validators.email]],
    });
  }

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  onLogin(): void {
    console.log(this.loginForm.value);
    this.authenticationService.signIn(this.loginForm.value);
    this.router.navigateByUrl('/home');
  }

  onSignup(): void {
    console.log(this.signupForm.value);

    this.authenticationService.signUp(this.signupForm.value);
  }

  onReset(): void {
    console.log(this.resetForm.value);
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
