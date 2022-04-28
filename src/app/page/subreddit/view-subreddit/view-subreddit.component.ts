import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, throwError } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SubredditModel } from "../../../utill/class1";
import { PostService } from "../../../service/post.service";
import { SubredditService } from "../../../service/subreddit.service";
import { logUtil } from "../../../utill/log1";
import { PostResponseDto } from "../../../utill/interface1";


@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit, OnDestroy {

  posts!: PostResponseDto[]
  sub!: SubredditModel
  postLength!: number;
  subId!: number;
  postsSubscription!: Subscription
  subSubscription!: Subscription

  loadingPost: boolean = false
  loadingSub: boolean = false

  constructor(private postService: PostService,
              private subredditService: SubredditService,
              private activatedRoute: ActivatedRoute) {
    logUtil("ViewSubredditComponent!")
  }

  ngOnInit(): void {
    this.subId = this.activatedRoute.snapshot.params['id'];
    this.postsSubscription = this.postService.getAllPostsBySub(this.subId)
      .subscribe(data => {
        logUtil("getAllPostsBySub+ ", data)
        this.posts = data;
        this.postLength = data.length;
        this.loadingPost = true
      }, error => {
        logUtil("getAllPostsBySub- ", error)
        throwError(error);
      });

    this.subSubscription = this.subredditService.getSubredditsId(this.subId)
      .subscribe(data => {
        logUtil("getSubredditsId+ ", data)
        this.sub = data
        this.loadingSub = true
      }, error => {
        logUtil("getSubredditsId- ", error)
        throwError(error);
      })
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
