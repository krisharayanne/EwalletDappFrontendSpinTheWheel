import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LedgerApp';
  individualID:any;
  loggedIn:boolean = false;
  headerLinksDisplay:boolean = false;
  headerLinksDisplay2:boolean = false;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }

  }

  displayMenu() {
    this.headerLinksDisplay = !this.headerLinksDisplay;
  }

  displayMenu2() {
    this.headerLinksDisplay2 = !this.headerLinksDisplay2;
  }

  checkIfLoggedIn() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      this.loggedIn = true;
    }
    else {
      this.loggedIn = false;
    }


  }

 
}
