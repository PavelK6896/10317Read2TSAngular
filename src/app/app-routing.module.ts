import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./page/home/home.component";
import { ViewPostComponent } from "./page/post/view-post/view-post.component";
import { CreatePostComponent } from "./page/post/create-post/create-post.component";
import { ListSubredditsComponent } from "./page/subreddit/list-subreddits/list-subreddits.component";
import { ViewSubredditComponent } from "./page/subreddit/view-subreddit/view-subreddit.component";
import { CreateSubredditComponent } from "./page/subreddit/create-subreddit/create-subreddit.component";
import { UserProfileComponent } from "./page/auth/user-profile/user-profile.component";
import { SignupComponent } from "./page/auth/signup/signup.component";
import { LoginComponent } from "./page/auth/login/login.component";
import { AuthGuard } from "./security/auth.guard";
import { UserViewPostComponent } from "./page/post/user-view-post/user-view-post.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},

  {path: 'list-subreddits', component: ListSubredditsComponent},
  {path: 'view-subreddit/:id', component: ViewSubredditComponent},
  {path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard]},

  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},

  {path: 'user/:name', component: UserViewPostComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
