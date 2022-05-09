import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SubredditModel } from "../../../utill/class1";
import { SubredditService } from "../../../service/subreddit.service";
import { logUtil } from "../../../utill/log1";

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent {
  createSubredditForm: FormGroup;
  subredditModel: SubredditModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router,
              private subredditService: SubredditService,
              private toastrService: ToastrService
  ) {
    logUtil("CreateSubredditComponent!")
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
