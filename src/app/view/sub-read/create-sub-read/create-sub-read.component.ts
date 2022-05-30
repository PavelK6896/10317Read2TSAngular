import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SubReadService } from "../../../service/sub-read.service";
import { logUtil } from "../../../utill/logUtill";

import { ToastrService } from "ngx-toastr";
import { SubReadDto } from "../../../utill/interfaceUtill";

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-sub-read.component.html',
  styleUrls: ['./create-sub-read.component.css']
})
export class CreateSubReadComponent {
  createSubredditForm: FormGroup;
  subredditModel: SubReadDto;
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
      id: 0,
      numberOfPosts: 0,
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

    this.subredditService.createSubRead(this.subredditModel)
      .subscribe({
        next: data => {
          logUtil("createSubreddit+ ", data)
          this.toastrService.success('Created', 'Succeed', {
            timeOut: 500,
          });
          this.router.navigateByUrl('/list-subreddits').then(r => logUtil("r+ ", r));
        }, error: error => {
          logUtil("createSubreddit- ", error)
          this.toastrService.error(error.message, 'Error', {
            timeOut: 2500,
          });
        }
      })
  }
}
