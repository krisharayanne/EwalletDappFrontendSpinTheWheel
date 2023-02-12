import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxWheelModule } from 'ngx-wheel';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { TopUpComponent } from './components/top-up/top-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { IndividualTransactionsComponent } from './components/individual-transactions/individual-transactions.component';
import { TeamTransactionsComponent } from './components/team-transactions/team-transactions.component';
import { HomeComponent } from './components/home/home.component';
import { SpinTheWheelComponent } from './components/spin-the-wheel/spin-the-wheel.component';
import { PrizesWonComponent } from './components/prizes-won/prizes-won.component';
import { PrizesToGiveComponent } from './components/prizes-to-give/prizes-to-give.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    TopUpComponent,
    DashboardComponent,
    LogOutComponent,
    TransferComponent,
    TeamDetailsComponent,
    IndividualTransactionsComponent,
    TeamTransactionsComponent,
    HomeComponent,
    SpinTheWheelComponent,
    PrizesWonComponent,
    PrizesToGiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxWheelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
