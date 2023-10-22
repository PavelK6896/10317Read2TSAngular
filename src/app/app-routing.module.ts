import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./view/home/home.component";
import { ViewPostComponent } from "./view/post/view-post/view-post.component";
import { CreatePostComponent } from "./view/post/create-post/create-post.component";
import { ListSubReadComponent } from "./view/sub-read/list-sub-read/list-sub-read.component";
import { ViewSubReadComponent } from "./view/sub-read/view-sub-read/view-sub-read.component";
import { CreateSubReadComponent } from "./view/sub-read/create-sub-read/create-sub-read.component";
import { UserProfileComponent } from "./view/auth/user-profile/user-profile.component";
import { SignupComponent } from "./view/auth/signup/signup.component";
import { LoginComponent } from "./view/auth/login/login.component";
import { AuthGuard } from "./security/auth.guard";
import { UserViewPostComponent } from "./view/post/user-view-post/user-view-post.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},

  {path: 'list-subreddits', component: ListSubReadComponent},
  {path: 'view-subreddit/:id', component: ViewSubReadComponent},
  {path: 'create-subreddit', component: CreateSubReadComponent, canActivate: [AuthGuard]},

  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},

  {path: 'user/:name', component: UserViewPostComponent},
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
