import { Component, OnInit } from '@angular/core';
import { SubReadModel } from "../../utill/classUtill";
import { SubReadService } from "../../service/sub-read.service";
import { logUtil } from "../../utill/logUtill";


@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './sub-read-side-bar.component.html',
  styleUrls: ['./sub-read-side-bar.component.css']
})
export class SubReadSideBarComponent implements OnInit {

  subreddits: Array<SubReadModel> = [];
  displayViewAll: boolean | undefined;

  constructor(private subredditService: SubReadService) {
    logUtil("SubReadSideBarComponent!")
  }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe({
      next: data => {
        logUtil("getAllSubreddits+ ", data)
        if (data.length > 3) {
          this.subreddits = data.splice(0, 3);
          this.displayViewAll = true;
        } else {
          this.subreddits = data;
        }
      }, error: error => {
        logUtil("getAllSubreddits- ", error)
      }
    });
  }
}
