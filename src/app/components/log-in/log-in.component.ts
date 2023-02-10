import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractsService } from 'src/app/services/contracts.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  name: string;
  username: string;
  password: string;
 individualID:number;
 user:any;
 message:any;

  constructor(private router: Router, private contractsService:ContractsService, private tokenStorageService: TokenStorageService) {
    this.name = "";
    this.username = "";
    this.password = "";
    this.individualID = -1;
  }

  async getIDByIndividualCredentials() {
    if(this.username.trim() != "" && this.password.trim() != ""){
      this.message = "Verifying Username and Password!"
  this.individualID = await this.contractsService.login(this.username.trim(), this.password.trim());   
  if(this.individualID > 0) {
    this.message = "Logging into Dashboard!"
    console.log("Valid User");
    this.tokenStorageService.saveUser(this.individualID);
    this.router.navigate(['Dashboard']);
  } 
  else {
    this.message = "Incorrect Credentials! Please try again!";
    console.log("Invalid User");
  }
}
else {
  this.message = "Please fill in the blanks!"

}
  }

}
