import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  user:any;
  balance:any;
  description:any;
  belongingTeam:any;
  numberOfTeams:any;
  teamID = null;
  teamArray:number[] = [];
  amount:number = 0;
  individualID:any;
  receipt: any;
  transactionHash: any;
  message:any;
  constructor(private tokenStorageService: TokenStorageService, private router: Router, 
    private contractsService: ContractsService) {
  }

  async ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");
      this.message = "";
        this.belongingTeam = await this.contractsService.getBelongingTeam(this.individualID);
        this.numberOfTeams = await this.contractsService.getNumberOfTeams();
        for(let i = 1; i <= parseInt(this.numberOfTeams); i++) {
          if(i != parseInt(this.belongingTeam)) {
            this.teamArray.push(i);
          } 
        }
    }
    else {
      console.log("User must login first");
      this.router.navigate(['Login']);
    }

  }

  confirmTransfer() {
    if(this.teamID != null && this.teamID > 0 && this.amount > 0 && this.description.trim() != "") {
      if(window.confirm("Are you sure you want to transfer " + this.amount + " to Team ID: " + this.teamID + " ?")) {
        this.transfer();
      }
    }
    else {
      this.message = "Please fill in the blanks!";
    }
  }

  async transfer() {
    if(this.teamID != null && this.teamID > 0 && this.amount > 0 && this.description.trim() != "") {
      this.message = "Checking your ewallet balance! Please wait for the result!";
    // check if balance is more than or equal to transfer amount
    this.user = await this.contractsService.dashboard(this.individualID);
    this.balance = this.user.balance;
    if(parseInt(this.balance) >= this.amount) {
      this.message = "Payment ongoing! Please wait for your transaction hash!";
      this.receipt = await this.contractsService.transfer(this.individualID, this.teamID, this.description.trim(), this.amount);
      this.transactionHash = "https://mumbai.polygonscan.com/tx/" + this.receipt.transactionHash.toString();
    }
    else {
      this.message ="Your balance is insufficient! Please top up first!";
    }
  }
  else {
    this.message = "Please fill in the blanks!";
  }
  }
  
}
