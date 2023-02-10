import { Component, OnInit } from '@angular/core';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  name: string;
  username: string;
  password: string;
  promise:any;
  receipt:any;
  transactionHash:any;
  message:any;
  teamID = null;
  teamArray:number[] = [];
  numberOfTeams:any;

  constructor(private contractsService:ContractsService) {
    this.name = "";
    this.username = "";
    this.password = "";
  }

  async ngOnInit() {
    this.numberOfTeams = await this.contractsService.getNumberOfTeams();
    for(let i = 1; i <= parseInt(this.numberOfTeams); i++) { 
        this.teamArray.push(i);
    }
  }

  async addIndividual() {
    if(this.name.trim() != "" && this.username.trim() != "" && this.password.trim() != "" && this.teamID != null && this.teamID > 0) {
      this.message = "Adding your profile to the blockchain! Please wait for transaction hash!"
  this.receipt = await this.contractsService.signUp(this.name.trim(), this.username.trim(), this.password.trim(), this.teamID);    
  this.transactionHash = "https://mumbai.polygonscan.com/tx/" + this.receipt.transactionHash.toString();
    }
    else {
      this.message = "Please fill in the blanks!"
    }
  }
}
