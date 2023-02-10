import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  individualID:any;
  user:any;
  name:any;
  balance:any;
  amountPayableToAdmin:any;

  constructor(private tokenStorageService: TokenStorageService, private router: Router,
    private contractsService: ContractsService) {
  }

  async ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");
      this.user = await this.contractsService.dashboard(parseInt(this.individualID));
      this.name = this.user.name;
      this.balance = this.user.balance;
      this.amountPayableToAdmin = this.user.amountPayableToAdmin;
    }
    else {
      console.log("User must login first");
      this.router.navigate(['Login']);
    }

  }


}
