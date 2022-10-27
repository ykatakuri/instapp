import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPageComponent } from './modules/authentication/pages/authentication-page/authentication-page.component';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo([""]);
const redirectLoggedInToHome = () => redirectLoggedInTo(["home"]);

const routes: Routes = [{
  component: AuthenticationPageComponent,
  path: "",
  loadChildren: () => import("./modules/authentication/authentication.module").then((module) => module.AuthenticationModule), ...canActivate(redirectLoggedInToHome),
},
{
  component: HomePageComponent,
  path: "home",
  loadChildren: () => import("./modules/home/home.module").then((module) => module.HomeModule), ...canActivate(redirectUnauthorizedToAuth),
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
