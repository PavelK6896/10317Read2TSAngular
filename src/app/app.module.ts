import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./component/header/header.component";
import { SignupComponent } from "./view/auth/signup/signup.component";
import { LoginComponent } from "./view/auth/login/login.component";
import { HomeComponent } from "./view/home/home.component";
import { CreateSubReadComponent } from "./view/sub-read/create-sub-read/create-sub-read.component";
import { CreatePostComponent } from "./view/post/create-post/create-post.component";
import { ListSubReadComponent } from "./view/sub-read/list-sub-read/list-sub-read.component";
import { UserProfileComponent } from "./view/auth/user-profile/user-profile.component";
import { ViewPostComponent } from "./view/post/view-post/view-post.component";
import { ViewSubReadComponent } from "./view/sub-read/view-sub-read/view-sub-read.component";
import { TokenInterceptor } from "./security/token-interceptor";
import { PostTopComponent } from './component/post/post-top/post-top.component';
import { UserViewPostComponent } from './view/post/user-view-post/user-view-post.component';
import { VoteButtonComponent } from "./component/vote-button/vote-button.component";
import { SideBarComponent } from "./component/side-bar/side-bar.component";
import { SubReadSideBarComponent } from "./component/sub-read-side-bar/sub-read-side-bar.component";
import { PostTileComponent } from "./component/post/post-tile/post-tile.component";


import { ToastrModule } from "ngx-toastr";
import { quillModules } from "./config/quillConfig";
import { QuillModule } from "ngx-quill";
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { PaginationComponent } from './component/pagination/pagination.component';

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
    SubReadSideBarComponent,
    CreateSubReadComponent,
    CreatePostComponent,
    ListSubReadComponent,
    ViewPostComponent,
    UserProfileComponent,
    ViewSubReadComponent,
    PostTopComponent,
    UserViewPostComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    QuillModule.forRoot({modules: quillModules}),
    NgbModule,
    NgbPaginationModule
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
