import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  users: string[] = ['Virat Kholi', 'Steve Smith', 'Mitchel Johnson', 'James Anderson', 'Michael Clarke'];

  constructor() { }

  ngOnInit(): void {
  }

}
