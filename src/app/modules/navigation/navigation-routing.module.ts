import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { ChatPageComponent } from "./pages/chat-page/chat-page.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ListeChatComponent } from "./pages/liste-chat/liste-chat.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "",
    children: [
      {
        path: "home",
        component: HomePageComponent,
      },
      {
        path: "profile",
        component: ProfilePageComponent,
      },
      {
        component: SearchPageComponent,
        path: "search",

      },
      {
        component: ChatPageComponent,
        path: "chat/:docId",
      },
      {
        component: ListeChatComponent,
        path: "liste-chat",
      },

    ]

  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationRoutingModule {}
