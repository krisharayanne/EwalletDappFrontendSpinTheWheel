import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { TopUpComponent } from './components/top-up/top-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { IndividualTransactionsComponent } from './components/individual-transactions/individual-transactions.component';
import { TeamTransactionsComponent } from './components/team-transactions/team-transactions.component';
import { SpinTheWheelComponent } from './components/spin-the-wheel/spin-the-wheel.component';
import { PrizesWonComponent } from './components/prizes-won/prizes-won.component';
import { PrizesToGiveComponent } from './components/prizes-to-give/prizes-to-give.component'

// all components other than sign up and login, must check if the user individual ID is stored in session storage
// To indicate that the user has logged in before accessing the route
// ngOnInit check
const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent},
  { path: 'SignUp', component: SignUpComponent},
  { path: 'Login', component: LogInComponent},
  { path: 'LogOut', component: LogOutComponent},
  { path: 'TopUp', component: TopUpComponent},
  { path: 'Dashboard', component: DashboardComponent},
  { path: 'Transfer', component: TransferComponent},
  { path: 'TeamDetails', component: TeamDetailsComponent},
  { path: 'IndividualTransactions', component: IndividualTransactionsComponent},
  { path: 'TeamTransactions', component: TeamTransactionsComponent},
  { path: 'SpinTheWheel', component: SpinTheWheelComponent},
  { path: 'PrizesWon', component: PrizesWonComponent},
  { path: 'PrizesToGive', component: PrizesToGiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
