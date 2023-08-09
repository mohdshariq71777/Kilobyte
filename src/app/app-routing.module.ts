import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clients', component: ClientsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
