import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authenticationService.signOut().then(
      () => {
        this.snackBar.open('Aurevoir 🙁!!!', 'Fermer');
        this.router.navigateByUrl('authenticate');
      }
    );

  }
}
