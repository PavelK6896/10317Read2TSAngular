import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./component/header/header.component";
import { SignupComponent } from "./page/auth/signup/signup.component";
import { LoginComponent } from "./page/auth/login/login.component";
import { HomeComponent } from "./page/home/home.component";
import { CreateSubredditComponent } from "./page/subreddit/create-subreddit/create-subreddit.component";
import { CreatePostComponent } from "./page/post/create-post/create-post.component";
import { ListSubredditsComponent } from "./page/subreddit/list-subreddits/list-subreddits.component";
import { UserProfileComponent } from "./page/auth/user-profile/user-profile.component";
import { ViewPostComponent } from "./page/post/view-post/view-post.component";
import { ViewSubredditComponent } from "./page/subreddit/view-subreddit/view-subreddit.component";
import { TokenInterceptor } from "./security/token-interceptor";
import { PostTopComponent } from './component/post/post-top/post-top.component';
import { UserViewPostComponent } from './page/post/user-view-post/user-view-post.component';
import { VoteButtonComponent } from "./component/vote-button/vote-button.component";
import { SideBarComponent } from "./component/side-bar/side-bar.component";
import { SubredditSideBarComponent } from "./component/subreddit-side-bar/subreddit-side-bar.component";
import { PostTileComponent } from "./component/post/post-tile/post-tile.component";


import { ToastrModule } from "ngx-toastr";
import { quillModules } from "./utill/quillConfig";
import { QuillModule } from "ngx-quill";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostTileComponent,
    VoteButtonComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditsComponent,
    ViewPostComponent,
    UserProfileComponent,
    ViewSubredditComponent,
    PostTopComponent,
    UserViewPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot({modules: quillModules}),
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
