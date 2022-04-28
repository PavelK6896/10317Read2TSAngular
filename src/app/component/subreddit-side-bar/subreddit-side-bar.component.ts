import { Component, OnInit } from '@angular/core';

import { throwError } from "rxjs";
import { SubredditModel } from "../../utill/class1";
import { SubredditService } from "../../service/subreddit.service";
import { logUtil } from "../../utill/log1";


@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean | undefined;

  constructor(private subredditService: SubredditService) {
    logUtil("SubredditSideBarComponent!")
  }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      logUtil("getAllSubreddits+ ", data)
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    }, error => {
      logUtil("getAllSubreddits- ", error)
      throwError(error);
    });
  }
}
