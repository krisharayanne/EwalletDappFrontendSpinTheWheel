import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  individualID:any;
  team:any;
  teamID:any;
  teamName:any;
  teamMembers:number[] = [];
  teamBalance:any;    
  teamSize:any;
  teamMemberID:any;
  user:any;


  constructor(private tokenStorageService: TokenStorageService, private router: Router, 
    private contractsService: ContractsService) {
  }

  async ngOnInit() {
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");
      this.teamID = await this.contractsService.getBelongingTeam(this.individualID);
      this.team = await this.contractsService.getTeamDetails(this.teamID);
      this.teamName = this.team.name;
      this.teamBalance = this.team.balance;
      this.teamSize = await this.contractsService.getTeamSize(this.teamID);
      for(let i = 0; i < parseInt(this.teamSize); i++) {
        this.teamMemberID = await this.contractsService.getTeamMembersByTeamID(this.teamID, i);
        this.user = await this.contractsService.dashboard(this.teamMemberID);
        this.teamMembers.push(this.user.name);
      }
     
    }
    else {
      console.log("User must login first");
      this.router.navigate(['Login']);
    }

  }

}
