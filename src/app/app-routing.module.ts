import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { LandingPageComponent } from './modules/landing/pages/landing-page/landing-page.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["landing"]);
const redirectLoggedInToUsers = () => redirectLoggedInTo(["home"]);

const routes: Routes = [{
  component: LandingPageComponent,
  path: "",
  loadChildren: () => import("./modules/landing/landing.module").then((module) => module.LandingModule), ...canActivate(redirectLoggedInToUsers),
}, {
  component: HomePageComponent,
  path: "home",
  loadChildren: () => import("./modules/home/home.module").then((module) => module.HomeModule), ...canActivate(redirectUnauthorizedToLogin),
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
