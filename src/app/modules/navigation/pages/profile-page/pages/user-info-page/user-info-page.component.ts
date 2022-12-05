import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { FIREBASE_COLLECTION_PATHS } from 'src/app/constants/firestore-collection-paths.constant';
import { AppUser } from 'src/app/models/app.user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';

// TODO: Get the current user infos
// TODO: Init avatar with an image link 
@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.scss']
})
export class UserInfoPageComponent implements OnInit {
  userInfosForm!: FormGroup;
  public currentUserId!: string;
  public currentUserName!: string;
  public currentUserUsername!: string;
  public currentUserEmail!: string;

  currentUser!: AppUser;

  selectedImage!: File;

  userAvatar: string = 'https://toppng.com/uploads/preview/user-account-management-logo-user-icon-11562867145a56rus2zwu.png';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private authService: AuthenticationService,
    private storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    let previewImage = <HTMLImageElement>document.getElementById('avatar');
    previewImage.src = this.userAvatar;

    this.authService.user.pipe(
      tap((user) => {
        this.currentUserId = user?.uid!;
        this.currentUserName = user?.displayName!;
        this.currentUserUsername = this.currentUserName.split(' ').join('_').toLowerCase();
        this.currentUserEmail = user?.email!;
      }),
    ).subscribe();

    this.currentUser = {
      id: this.currentUserId,
      fullname: this.currentUserName,
      username: this.currentUserUsername,
      email: this.currentUserEmail,
    };

    this.userInfosForm = this.formBuilder.group({
      fullname: [this.currentUserName, [Validators.required, Validators.minLength(2)]],
      username: [this.currentUserUsername, [Validators.required, Validators.minLength(2)]],
    });

  }

  onUpdateUserInfos(): void {
    this.currentUser.fullname = this.userInfosForm.controls['fullname'].value;
    this.currentUser.username = this.userInfosForm.controls['username'].value;
    const imagePath = `${FIREBASE_COLLECTION_PATHS.USERS}/${this.currentUserId}`;
    this.storageService.uploadFile(this.selectedImage, imagePath).then(
      () => {
        let downloadUrl = this.storageService.getFileDownloadUrl(imagePath);
        return downloadUrl;
      }).then(
        (photoUrl) => {
          this.currentUser.avatar = photoUrl;
          this.userService.updateUser(this.currentUser).then(
            () => {
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
    console.log('Modify avatar');
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
