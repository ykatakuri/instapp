import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPageComponent } from './modules/authentication/pages/authentication-page/authentication-page.component';
import { ChatPageComponent } from './modules/navigation/pages/chat-page/chat-page.component';
import { HomePageComponent } from './modules/navigation/pages/home-page/home-page.component';
import { ListeChatComponent } from './modules/navigation/pages/liste-chat/liste-chat.component';
import { NotificationsPageComponent } from './modules/navigation/pages/notifications-page/notifications-page.component';
import { ProfilePageComponent } from './modules/navigation/pages/profile-page/profile-page.component';
import { SearchPageComponent } from './modules/navigation/pages/search-page/search-page.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(["authenticate"]);
const redirectLoggedInToAppNavigator = () => redirectLoggedInTo([""]);

const routes: Routes = [

  {
    component: ProfilePageComponent,
    path: "profile",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: NotificationsPageComponent,
    path: "notifications",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: ChatPageComponent,
    path: "chat/:docId",
    loadChildren: () => import("./modules/navigation/navigation.module").then((module) => module.NavigationModule), ...canActivate(redirectUnauthorizedToAuth),
  },
  {
    component: ListeChatComponent,
    path: "liste-chat",
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
