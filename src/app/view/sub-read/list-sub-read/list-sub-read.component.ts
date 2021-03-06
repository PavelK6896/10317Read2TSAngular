import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { SubReadModel } from "../../../utill/classUtill";
import { SubReadService } from "../../../service/sub-read.service";
import { Page } from "../../../utill/interfaceUtill";

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-sub-read.component.html',
  styleUrls: ['./list-sub-read.component.css']
})
export class ListSubReadComponent implements OnInit, OnDestroy {

  subreddits!: SubReadModel[];
  getAllSubredditsSubscription!: Subscription
  page!: Page;

  constructor(private subredditService: SubReadService) {
  }


  ngOnInit() {
    this.getAllSubredditsSubscription = this.getPagePost(0);
  }

  public getPagePost(number: number) {
    return this.subredditService.getPageSubRead(number)
      .subscribe({
        next: data => {
          this.subreddits = data.content;
          this.page = data
        }, error: error => {
          console.error(error)
        }
      })
  }

  updatePageData($event: number) {
    this.getPagePost($event);
  }

  ngOnDestroy(): void {
    if (this.getAllSubredditsSubscription) {
      this.getAllSubredditsSubscription.unsubscribe()
    }
  }
}
