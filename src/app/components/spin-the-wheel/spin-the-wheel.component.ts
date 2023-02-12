import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxWheelComponent, TextAlignment, TextOrientation } from 'ngx-wheel';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ContractsService } from 'src/app/services/contracts.service';

@Component({
  selector: 'app-spin-the-wheel',
  templateUrl: './spin-the-wheel.component.html',
  styleUrls: ['./spin-the-wheel.component.css']
})
export class SpinTheWheelComponent implements OnInit {
  @ViewChild(NgxWheelComponent, { static: false }) wheel:any;

  message:any;
  user:any;
  balance:any;
  belongingTeam:any;
  displaySpinTheWheelButton:boolean = true;
  prizeWon: any;
  benefitingTeam = 6;
  entryTicketPrice = 5;
  individualID:any;
  cost:any;
  status:any;
  transferReceipt:any;
  lossReceipt:any;
  profitReceipt:any;
  cashPrizeReceipt:any;
  miniPoolProfitTracker:any;
  wheelWidth = 500;
  wheelHeight = 500;
  seed = [...Array(12).keys()]
  idToLandOn: any;
  items: any;
  textOrientation: TextOrientation = TextOrientation.HORIZONTAL
  textAlignment: TextAlignment = TextAlignment.OUTER

  constructor(private tokenStorageService: TokenStorageService, private router: Router, 
    private contractsService: ContractsService) {
  }

  async ngOnInit(){
    this.individualID = this.tokenStorageService.getUser();
    if(parseInt(this.individualID) > 0) {
      console.log("User is logged in");

    // start initialization of basic spin the wheel values
    // this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];
    const colors = ['#EB287D', '#334477']
    const text = [
                  'RM10','Free Mystery Item', 'Free Mystery Massage',
                  'RM15','Free Mystery Item', 'Free Mystery Massage',
                  'RM20','Free Mystery Item', 'Free Mystery Massage',
                  'RM25','Free Mystery Item', 'Free Mystery Massage',
                  ]
    this.items = this.seed.map((value) => ({
      fillStyle: colors[value % 2],
      text: text[value % 12],
      id: value,
      textFillStyle: 'white',
      textFontSize: '16'
    }))
    // end initialization of basic spin the wheel values
  }
  else {
    console.log("User must login first");
    this.router.navigate(['Login']);
  }
  }

  reset() {
    this.wheel.reset()
  }

  async before() {
    console.log("before function");
    this.message = "Your wheel is about to spin!";
   
  }

  async spinTheWheel() {

    // check if user has sufficient balance to purchase a 'Basic Spin The Wheel Entry Ticket'
    this.user = await this.contractsService.dashboard(this.individualID);
    this.balance = this.user.balance;
    if(parseInt(this.balance) >= this.entryTicketPrice) {

      this.message = "Deducting RM5 from your ewallet balance ! Please wait!";
      // start spin the wheel process
    this.wheel.reset()
    console.log("spinTheWheel function!");
     this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];

      // identify each quadrant cost
    if(this.idToLandOn == 0) {
      this.cost = 10;
    }
    else if(this.idToLandOn == 3) {
      this.cost = 15;
    }
    else if(this.idToLandOn == 6) {
      this.cost = 20;
    }
    else if(this.idToLandOn == 9) {
      this.cost = 25;
    }
    else if(this.idToLandOn == 1 || this.idToLandOn == 4 || this.idToLandOn == 7 || this.idToLandOn == 10) {
      this.cost = 3;
    }
    else if(this.idToLandOn == 2 || this.idToLandOn == 5 || this.idToLandOn == 8 || this.idToLandOn == 11) {
      this.cost = 0;
    }

    // retrieve miniPoolProfitTracker 
    this.miniPoolProfitTracker = await this.contractsService.getMiniPoolProfitTracker();

    console.log("idToLandOn: " + this.idToLandOn);
    console.log("cost: " + this.cost);
    console.log("miniPoolProfitTracker: " + this.miniPoolProfitTracker);

    for(let i = 0; i >= 0; i++) {

       // if cost is less than (mini pool profits/2), spin the wheel
    if(this.cost <= (this.miniPoolProfitTracker/2)) {
        // safe to spin

        // transfer RM5 to Team 6 for 'Basic Spin The Wheel Entry Ticket Purchase'
      this.transferReceipt = await this.contractsService.transfer(this.individualID, this.benefitingTeam, "Basic Spin The Wheel Entry Ticket Purchase", this.entryTicketPrice);
      console.log("transferReceipt: " + this.transferReceipt);

        if(this.idToLandOn == 0 || this.idToLandOn == 3 || this.idToLandOn == 6 || this.idToLandOn == 9) {
          this.status = "loss";
          this.lossReceipt = await this.contractsService.subtractFromMiniPoolProfit(this.cost);
          console.log("lossReceipt: " + this.lossReceipt);
          if(this.cost == 0) {
            this.prizeWon = "RM10!";
          }
          else if(this.cost == 3) {
            this.prizeWon = "RM15!";
          }
          else if(this.cost == 6) {
            this.prizeWon = "RM20!";
          }
          else if(this.cost == 9) {
            this.prizeWon = "RM25!";
          }
          this.cashPrizeReceipt = await this.contractsService.prizeTransfer(this.individualID, this.benefitingTeam, "Basic Spin The Wheel Cash Prize Transfer", this.cost);
          console.log("cashPrizeReceipt: " + this.cashPrizeReceipt);
        }
        else {
          this.status = "profit";
          this.profitReceipt = await this.contractsService.addToMiniPoolProfit(this.entryTicketPrice - this.cost);
          console.log("profitReceipt: " + this.profitReceipt);
          if(this.cost == 3) {
            this.prizeWon = "Free Mystery Item!";
          }
          else if(this.cost == 0) {
            this.prizeWon = "Free Mystery Massage!";
          }
          this.cashPrizeReceipt = await this.contractsService.prizeTransfer(this.individualID, this.benefitingTeam, this.prizeWon, 0);
          console.log("cashPrizeReceipt: " + this.cashPrizeReceipt);
        }
        break;
    }

    // else change the idToLandOn 
    else {
      this.idToLandOn = this.seed[Math.floor(Math.random() * this.seed.length)];

      // identify each quadrant cost
    if(this.idToLandOn == 0) {
      this.cost = 10;
    }
    else if(this.idToLandOn == 3) {
      this.cost = 15;
    }
    else if(this.idToLandOn == 6) {
      this.cost = 20;
    }
    else if(this.idToLandOn == 9) {
      this.cost = 25;
    }
    else if(this.idToLandOn == 1 || this.idToLandOn == 4 || this.idToLandOn == 7 || this.idToLandOn == 10) {
      this.cost = 3;
    }
    else if(this.idToLandOn == 2 || this.idToLandOn == 5 || this.idToLandOn == 8 || this.idToLandOn == 11) {
      this.cost = 0;
    }

    // retrieve miniPoolProfitTracker 
    this.miniPoolProfitTracker = await this.contractsService.getMiniPoolProfitTracker();

    console.log("idToLandOn: " + this.idToLandOn);
    console.log("cost: " + this.cost);
    console.log("miniPoolProfitTracker: " + this.miniPoolProfitTracker);
    }
    }
   
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
    // end spin the wheel process
  }
  else {
    this.message ="Your balance is insufficient! Please top up first!";
  }
    
  }

  async spin(prize:any) {
    this.idToLandOn = prize
    await new Promise(resolve => setTimeout(resolve, 0));
    this.wheel.spin()
  }

  async after() {
    console.log("after function");
    if(this.status == "profit") {
    this.message = "Congratulations! You just won a " + this.prizeWon;
    }
    else if(this.status == "loss") {
      this.message = "Congratulations! You just won " + this.prizeWon;
      }
    // if profit, add profit to miniPoolProfitTracker
    // if loss, transfer cash prize to winner
  }

}
