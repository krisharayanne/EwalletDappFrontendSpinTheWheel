import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';
import { individualTransactionStruct } from 'individualTransaction';

@Component({
  selector: 'app-team-transactions',
  templateUrl: './team-transactions.component.html',
  styleUrls: ['./team-transactions.component.css']
})
export class TeamTransactionsComponent implements OnInit {
  individualID:any;
  transaction:any;
  transactionArray:individualTransactionStruct[] = [];
  transactionArraySize:any;
  user:any;
  team:any;
  teamID:any;

  constructor(private tokenStorageService: TokenStorageService, private router: Router, 
    private contractsService: ContractsService) {
  }

  async ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");
      this.teamID = await this.contractsService.getBelongingTeam(this.individualID);
      this.transactionArraySize = await this.contractsService.getTeamTransactionArraySize(this.teamID);
      for(let i = 0; i < parseInt(this.transactionArraySize); i++) {
        this.transaction = await this.contractsService.getTeamTransactions(this.teamID, i);
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
