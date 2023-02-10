import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.css']
})
export class TopUpComponent implements OnInit {
  amount:number = 0;
  individualID:any;
  receipt: any;
  transactionHash: any;
  message: any;
  constructor(private tokenStorageService: TokenStorageService, private router: Router, 
    private contractsService: ContractsService) {
  }

  ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");
    }
    else {
      console.log("User must login first");
      this.router.navigate(['Login']);
    }

  }

  confirmTopUp() {
    if(this.amount > 0) {
    if(window.confirm("Are you sure you want to top up " + this.amount + " ?")) {
      this.topUp();
    }
  }
  else {
    this.message = "Please enter an amount!";
  }
  }

  async topUp() {
    if(this.amount > 0) {
      this.message = "Topping up your ewallet balance! Please wait for transaction hash!";
      this.receipt = await this.contractsService.topUp(this.individualID, this.amount);
      this.transactionHash = "https://mumbai.polygonscan.com/tx/" + this.receipt.transactionHash.toString();
    }
    else {
      this.message = "Please enter an amount!";
    }
  }
}
