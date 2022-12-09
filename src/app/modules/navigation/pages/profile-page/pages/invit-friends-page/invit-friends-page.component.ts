import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invit-friends-page',
  templateUrl: './invit-friends-page.component.html',
  styleUrls: ['./invit-friends-page.component.scss']
})
export class InvitFriendsPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack(): void {
    this.router.navigateByUrl('profile');
  }

}
