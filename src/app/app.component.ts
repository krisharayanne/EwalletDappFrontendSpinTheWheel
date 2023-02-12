import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { ContractsService } from './services/contracts.service';

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
  belongingTeam:any;
  displaySpinTheWheelLink:boolean = true;

  constructor(private tokenStorageService: TokenStorageService, private contractsService: ContractsService) {
  }

  async ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      this.loggedIn = true;
       // members belonging to Team 6 are not allowed to participate
     this.belongingTeam = await this.contractsService.getBelongingTeam(this.individualID);
     console.log("belongingTeam: " + this.belongingTeam);
      if(parseInt(this.belongingTeam) == 6) {
        this.displaySpinTheWheelLink = false;
      }
      else {
        this.displaySpinTheWheelLink = true;
      }
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

  async checkIfTeam6() {
   
  }

  async checkIfLoggedIn() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      this.loggedIn = true;
       // members belonging to Team 6 are not allowed to participate
    this.belongingTeam = await this.contractsService.getBelongingTeam(this.individualID);
    console.log("belongingTeam: " + this.belongingTeam);
      if(parseInt(this.belongingTeam) == 6) {
        this.displaySpinTheWheelLink = false;
      }
      else {
        this.displaySpinTheWheelLink = true;
      }
    }
    else {
      this.loggedIn = false;
    }


  }

 
}
