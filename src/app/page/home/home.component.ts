import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { PostService } from "../../service/post.service";
import { logUtil } from "../../utill/log1";
import { PostResponseDto } from "../../utill/interface1";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: PostResponseDto[] = [];
  getAllPostsSubscription!: Subscription
  loadingPost: boolean = false

  constructor(private postService: PostService) {
    logUtil("HomeComponent!")
  }

  ngOnInit(): void {
    this.loadingPost = false
    this.getAllPostsSubscription = this.postService.getAllPosts()
      .subscribe({
        next: data => {
          logUtil("getAllPosts+ ", data)
          this.posts = data;
          this.loadingPost = true
        }, error: error => {
          logUtil("getAllPosts- ", error)
        }
      });
  }

  ngOnDestroy(): void {
    if (this.getAllPostsSubscription) {
      this.getAllPostsSubscription.unsubscribe()
    }
  }

}
