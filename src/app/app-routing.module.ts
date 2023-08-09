import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClientsComponent } from './clients/clients.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'company-details/:clientID', component: CompanyDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
