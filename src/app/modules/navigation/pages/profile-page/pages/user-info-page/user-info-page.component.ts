import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { AppUser } from 'src/app/models/app.user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';
// @UntilDestroy()
@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {
  userInfosForm!: FormGroup;

  currentUser$!: Observable<AppUser | null>;
  updatedUser!: AppUser;

  selectedImage!: File;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private authService: AuthenticationService,
    private storageService: StorageService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.usersService.currentUserProfile;

    this.userInfosForm = this.formBuilder.group({
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.usersService.currentUserProfile
      // .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.userInfosForm.patchValue({ ...(user as object) });
      });
  }

  onUpdateUserInfos(userId: string): void {
    const imagePath = `${FIREBASE_COLLECTION_PATHS.USERS}/${userId}/${userId}`;

    this.storageService.uploadFile(this.selectedImage, imagePath).then(
      () => {
        let downloadUrl = this.storageService.getFileDownloadUrl(imagePath);
        return downloadUrl;
      }).then(
        (photoUrl) => {
          this.updatedUser = {
            id: userId,
            fullname: this.userInfosForm.controls['fullname'].value,
            username: this.userInfosForm.controls['username'].value,
            photoURL: `${photoUrl}.jpeg`,
          };
          this.userService.updateUser(this.updatedUser).then(
            () => {
              this.authService.updateProfile(this.updatedUser);
              setTimeout(() => {
                this.router.navigateByUrl('profile');
                this.snackBar.open('Informations sauvegardées', 'Fermer');
              }, 1000);
            }
          ).catch(error => console.log(error));
        }
      ).catch(error => console.log(error));
  }

  onBack(): void {
    this.router.navigateByUrl('profile');
  }

  onAvatarClick(): void {
    <HTMLInputElement>document.getElementById('myfile')?.click()!;
  }

  onImageSelected(fileSelector: any): void {
    this.selectedImage = fileSelector.files[0];
    if (!this.selectedImage) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImage);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result!.toString();
        let previewImage = <HTMLImageElement>document.getElementById('avatar');
        previewImage.src = readableString;
      }
    );
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

