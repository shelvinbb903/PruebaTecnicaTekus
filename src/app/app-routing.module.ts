import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ListSubscribersComponent } from './pages/list-subscribers/list-subscribers.component';
import { SessionGuard } from './guards/session.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "listSubscribers", component: ListSubscribersComponent, canActivate: [SessionGuard] },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
