import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { SubReadModel } from "../../../utill/classUtill";
import { SubReadService } from "../../../service/sub-read.service";
import { logUtil } from "../../../utill/logUtill";

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-sub-read.component.html',
  styleUrls: ['./list-sub-read.component.css']
})
export class ListSubReadComponent implements OnInit, OnDestroy {

  subreddits!: SubReadModel[];
  getAllSubredditsSubscription!: Subscription

  constructor(private subredditService: SubReadService) {
    logUtil("ListSubReadComponent!")
  }

  ngOnInit() {
    this.getAllSubredditsSubscription = this.subredditService.getPageSubRead()
      .subscribe({
        next: data => {
          logUtil("getAllSubreddits+ ", data)
          this.subreddits = data.content;
        }, error: error => {
          logUtil("getAllSubreddits- ", error)
        }
      })
  }

  ngOnDestroy(): void {
    if (this.getAllSubredditsSubscription) {
      this.getAllSubredditsSubscription.unsubscribe()
    }
  }
}
