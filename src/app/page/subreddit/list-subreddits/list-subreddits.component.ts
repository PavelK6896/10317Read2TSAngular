import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription, throwError } from "rxjs";
import { SubredditModel } from "../../../utill/class1";
import { SubredditService } from "../../../service/subreddit.service";
import { logUtil } from "../../../utill/log1";

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit, OnDestroy {

  subreddits!: SubredditModel[];
  getAllSubredditsSubscription!: Subscription

  constructor(private subredditService: SubredditService) {
    logUtil("ListSubredditsComponent!")
  }

  ngOnInit() {
    this.getAllSubredditsSubscription = this.subredditService.getAllSubreddits()
      .subscribe(data => {
        logUtil("getAllSubreddits+ ", data)
        this.subreddits = data;
      }, error => {
        logUtil("getAllSubreddits- ", error)
        throwError(error);
      })
  }

  ngOnDestroy(): void {
    if (this.getAllSubredditsSubscription) {
      this.getAllSubredditsSubscription.unsubscribe()
    }
  }
}
