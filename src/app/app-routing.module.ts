import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPageComponent } from './modules/authentication/pages/authentication-page/authentication-page.component';
import { ChatPageComponent } from './modules/navigation/pages/chat-page/chat-page.component';
import { HomePageComponent } from './modules/navigation/pages/home-page/home-page.component';
import { InvitFriendsPageComponent } from './modules/navigation/pages/profile-page/pages/invit-friends-page/invit-friends-page.component';
import { UserInfoPageComponent } from './modules/navigation/pages/profile-page/pages/user-info-page/user-info-page.component';
import { ProfilePageComponent } from './modules/navigation/pages/profile-page/profile-page.component';
import { SearchPageComponent } from './modules/navigation/pages/search-page/search-page.component';
import { SingleUserPageComponent } from './modules/navigation/pages/single-user-page/single-user-page.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(["authenticate"]);
const redirectLoggedInToAppNavigator = () => redirectLoggedInTo([""]);

const routes: Routes = [
  {
    component: InvitFriendsPageComponent,
    path: "invit-friends",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: UserInfoPageComponent,
    path: "user-infos",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: SingleUserPageComponent,
    path: "search/:id",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: ProfilePageComponent,
    path: "profile",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: ChatPageComponent,
    path: "chat",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: SearchPageComponent,
    path: "search",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: HomePageComponent,
    path: "home",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: AuthenticationPageComponent,
    path: "authenticate",
    loadChildren: () => import("./modules/authentication/authentication.module").then((module) => module.AuthenticationModule), ...canActivate(redirectLoggedInToAppNavigator),
  },
  {
    component: HomePageComponent,
    path: "",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
