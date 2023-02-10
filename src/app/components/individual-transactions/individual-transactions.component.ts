import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';
import { individualTransactionStruct } from 'individualTransaction';

@Component({
  selector: 'app-individual-transactions',
  templateUrl: './individual-transactions.component.html',
  styleUrls: ['./individual-transactions.component.css']
})
export class IndividualTransactionsComponent implements OnInit {
  individualID:any;
  transaction:any;
  transactionArray:individualTransactionStruct[] = [];
  transactionArraySize:any;
  user:any;
  team:any;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, 
    private contractsService: ContractsService) {
  }

  async ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");
      this.transactionArraySize = await this.contractsService.getIndividualTransactionArraySize(this.individualID);
      for(let i = 0; i < parseInt(this.transactionArraySize); i++) {
        this.transaction = await this.contractsService.getIndividualTransactions(this.individualID, i);
        this.user = await this.contractsService.dashboard(this.transaction.fromIndividualID);
        this.team = await this.contractsService.getTeamDetails(this.transaction.toTeamID);
        let individualTransactionItem: individualTransactionStruct = { 
          fromIndividualID: this.user.name,
          toTeamID: this.team.name,
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
