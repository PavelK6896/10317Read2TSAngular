import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { PostService } from "../../service/post.service";
import { logUtil } from "../../utill/logUtill";
import { PagePostResponseDto, PostResponseDto } from "../../utill/interfaceUtill";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // host: {'class': 'container'}
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: PostResponseDto[] = [];
  page!: PagePostResponseDto;
  getAllPostsSubscription!: Subscription
  loadingPost: boolean = false

  constructor(private postService: PostService) {
    logUtil("HomeComponent!")
  }

  ngOnInit(): void {
    this.loadingPost = false
    this.getAllPostsSubscription = this.getPagePost(0);
  }

  public getPagePost(number: number) {
    return this.postService.getPagePosts(number)
      .subscribe({
        next: data => {
          logUtil("getAllPosts+ ", data)
          this.posts = data.content;
          this.page = data;
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

  updatePageData($event: number) {
    this.getPagePost($event);
  }
}
