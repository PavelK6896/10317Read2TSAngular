import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SubReadModel } from "../../../utill/classUtill";
import { PostService } from "../../../service/post.service";
import { SubReadService } from "../../../service/sub-read.service";
import { logUtil } from "../../../utill/logUtill";
import { Page, PostResponseDto } from "../../../utill/interfaceUtill";


@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-sub-read.component.html',
  styleUrls: ['./view-sub-read.component.css']
})
export class ViewSubReadComponent implements OnInit, OnDestroy {

  posts!: PostResponseDto[]
  sub!: SubReadModel
  postLength!: number;
  subId!: number;
  postsSubscription!: Subscription
  subSubscription!: Subscription
  pagePost!: Page;

  loadingPost: boolean = false
  loadingSub: boolean = false

  constructor(private postService: PostService,
              private subredditService: SubReadService,
              private activatedRoute: ActivatedRoute) {
    logUtil("ViewSubReadComponent!")
  }

  ngOnInit(): void {
    this.subId = this.activatedRoute.snapshot.params['id'];
    this.postsSubscription = this.getPagePost(0)

    this.subSubscription = this.subredditService.getSubReadById(this.subId)
      .subscribe({
        next: data => {
          logUtil("getSubredditsId+ ", data)
          this.sub = data
          this.loadingSub = true
        }, error: error => {
          logUtil("getSubredditsId- ", error)
        }
      })
  }

  public getPagePost(number: number) {
    return this.postService.getPagePostBySubReadId(this.subId, number)
      .subscribe({
        next: data => {
          logUtil("getAllPostsBySub+ ", data)
          this.posts = data.content;
          this.postLength = data.totalElements;
          this.loadingPost = true
          this.pagePost = data
        }, error: error => {
          logUtil("getAllPostsBySub- ", error)
        }
      });
  }

  updatePageData($event: number) {
    this.getPagePost($event);
  }

  ngOnDestroy(): void {
    if (this.subSubscription) {
      this.subSubscription.unsubscribe()
    }
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe()
    }
  }

}
