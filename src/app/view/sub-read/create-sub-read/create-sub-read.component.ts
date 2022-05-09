import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SubReadModel } from "../../../utill/classUtill";
import { SubReadService } from "../../../service/sub-read.service";
import { logUtil } from "../../../utill/logUtill";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-sub-read.component.html',
  styleUrls: ['./create-sub-read.component.css']
})
export class CreateSubReadComponent {
  createSubredditForm: FormGroup;
  subredditModel: SubReadModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router,
              private subredditService: SubReadService,
              private toastrService: ToastrService
  ) {
    logUtil("CreateSubReadComponent!")
    this.createSubredditForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.subredditModel = {
      name: '',
      description: ''
    }
  }

  discard() {
    this.router.navigateByUrl('/').then(r => logUtil("r- ", r));
  }

  createSubreddit() {
    this.subredditModel.name = this.createSubredditForm.get('title')?.value
    this.subredditModel.description = this.createSubredditForm.get('description')?.value

    this.subredditService.createSubreddit(this.subredditModel)
      .subscribe({
        next: data => {
          logUtil("createSubreddit+ ", data)
          this.toastrService.success('Created', 'Info', {
            timeOut: 500,
          });
          this.router.navigateByUrl('/list-subreddits').then(r => logUtil("r+ ", r));
        }, error: error => {
          logUtil("createSubreddit- ", error)
          if (error.status == 400) {
            this.toastrService.error('Value too long', 'Info', {
              timeOut: 500,
            });
          }
        }
      })
  }
}
