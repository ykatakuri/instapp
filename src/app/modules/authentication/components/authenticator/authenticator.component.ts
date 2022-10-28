import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  getLoginEmailErrorMessage() {
    if (this.loginForm.controls['loginEmail'].hasError('required')) {
      return 'Veuillez entrer votre email';
    }
    return this.loginForm.controls['loginEmail'].hasError('email') ? 'Email incorrect' : '';
  }

  getSignupEmailErrorMessage() {
    if (this.signupForm.controls['signupEmail'].hasError('required')) {
      return 'Veuillez entrer votre email';
    }
    return this.signupForm.controls['signupEmail'].hasError('email') ? 'Email incorrect' : '';
  }

  getLoginPasswordErrorMessage() {
    if (this.loginForm.controls['loginPassword'].hasError('required')) {
      return 'Veuillez saisir un mot de passe';
    } else if (this.loginForm.controls['loginPassword'].hasError('minlength')) {
      return 'Mot de passe trop court';
    }

    return this.loginForm.controls['loginPassword'].hasError('minlength') ? 'Mot de passe trop court' : '';
  }

  getSignupFullnameErrorMessage() {
    if (this.signupForm.controls['signupFullname'].hasError('required')) {
      return 'Veuillez saisir votre nom complet';
    } else if (this.signupForm.controls['signupFullname'].hasError('minlength')) {
      return 'Nom trop court';
    }

    return this.signupForm.controls['signupFullname'].hasError('minlength') ? 'Nom trop court' : '';
  }

  getSignupUsernameErrorMessage() {
    if (this.signupForm.controls['signupUsername'].hasError('required')) {
      return 'Veuillez saisir votre nom d’utilisateur';
    } else if (this.signupForm.controls['signupUsername'].hasError('minlength')) {
      return 'Nom trop court';
    }

    return this.signupForm.controls['signupUsername'].hasError('minlength') ? 'Nom trop court' : '';
  }

  getSignupPasswordErrorMessage() {
    if (this.signupForm.controls['signupPassword'].hasError('required')) {
      return 'Veuillez saisir un mot de passe';
    } else if (this.signupForm.controls['signupPassword'].hasError('minlength')) {
      return 'Mot de passe trop court';
    }

    return this.signupForm.controls['signupPassword'].hasError('minlength') ? 'Mot de passe trop court' : '';
  }

  getResetEmailErrorMessage() {
    if (this.resetForm.controls['resetEmail'].hasError('required')) {
      return 'Veuillez entrer votre email';
    }
    return this.resetForm.controls['resetEmail'].hasError('email') ? 'Email incorrect' : '';
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginEmail: [null, [Validators.required, Validators.email]],
      loginPassword: [null, [Validators.required, Validators.minLength(8)]],
    });

    this.signupForm = this.formBuilder.group({
      signupEmail: [null, [Validators.required, Validators.email]],
      signupFullname: [null, [Validators.required, Validators.minLength(4)]],
      signupUsername: [null, [Validators.required, Validators.minLength(2)]],
      signupPassword: [null, [Validators.required, Validators.minLength(8)]],
    });

    this.resetForm = this.formBuilder.group({
      resetEmail: [null, [Validators.required, Validators.email]],
    });
  }

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }

  onLogin(): void {
    this.authenticationService.signIn(this.loginForm.controls['loginEmail'].value, this.loginForm.controls['loginPassword'].value);
    this.router.navigateByUrl('home');
    this.snackBar.open(`Bonjour ${this.loginForm.controls['loginEmail']}, Content de vous revoir :)`, 'Fermer');
  }

  onSignup(): void {
    this.authenticationService.signUp(this.signupForm.controls['signupEmail'].value, this.signupForm.controls['signupPassword'].value, this.signupForm.controls['signupFullname'].value);
    this.state = AuthenticationState.LOGIN;
    this.snackBar.open(`Inscription terminée!`, 'Fermer');
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
