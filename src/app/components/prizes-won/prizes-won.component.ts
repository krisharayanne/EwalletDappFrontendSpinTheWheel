import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';
import { miniPoolIndividualTransactionStruct } from 'miniPoolIndividualTransaction';

@Component({
  selector: 'app-prizes-won',
  templateUrl: './prizes-won.component.html',
  styleUrls: ['./prizes-won.component.css']
})
export class PrizesWonComponent implements OnInit {
  individualID:any;
  transactionArray:miniPoolIndividualTransactionStruct[] = [];
  transactionArraySize:any;
  transaction:any;
  user:any;
  team:any;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, 
    private contractsService: ContractsService) {
  }

  async ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");
      this.transactionArraySize = await this.contractsService.getMiniPoolIndividualTransactionArraySize(this.individualID);
      for(let i = 0; i < parseInt(this.transactionArraySize); i++) {
        this.transaction = await this.contractsService.getMiniPoolIndividualTransactions(this.individualID, i);
        this.user = await this.contractsService.dashboard(this.transaction.toIndividualID);
        this.team = await this.contractsService.getTeamDetails(this.transaction.fromTeamID);
        let individualTransactionItem: miniPoolIndividualTransactionStruct = { 
          toIndividualID: this.user.name,
          fromTeamID: this.team.name,
          amount: this.transaction.amount,
          description: this.transaction.description,
        };
        this.transactionArray.push(individualTransactionItem);
      }
    }
    else {
      console.log("User must login first");
      this.router.navigate(['Login']);
    }

  }

}
