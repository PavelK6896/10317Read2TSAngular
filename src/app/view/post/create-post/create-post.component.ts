import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { CreatePostPayload, SubReadModel } from "../../../utill/classUtill";
import { PostService } from "../../../service/post.service";
import { SubReadService } from "../../../service/sub-read.service";
import { logUtil } from "../../../utill/logUtill";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  createPostForm!: FormGroup;
  postPayload!: CreatePostPayload;
  subRead!: Array<SubReadModel>;
  getAllSubReadSub!: Subscription
  createPostSub!: Subscription

  constructor(private router: Router,
              private postService: PostService,
              private subredditService: SubReadService) {
    logUtil("CreatePostComponent!")
  }

  ngOnInit() {
    this.postPayload = {
      postName: '',
      description: '',
      subReadName: ''
    }

    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subReadName: new FormControl('', Validators.required),
      description: new FormControl(null, Validators.required),
    });

    this.getAllSubReadSub = this.subredditService.getAllSubreddits()
      .subscribe({
        next: (data) => {
          logUtil("getAllSubreddits+ ", data)
          this.subRead = data;
        }, error: error => {
          logUtil("getAllSubreddits- ", error)
        }
      });

  }

  ngOnDestroy(): void {
    if (this.getAllSubReadSub) {
      this.getAllSubReadSub.unsubscribe()
    }
    if (this.createPostSub) {
      this.createPostSub.unsubscribe()
    }
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.subReadName = this.createPostForm.get('subReadName')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.createPostSub = this.postService.createPost(this.postPayload)
      .subscribe({
        next: (data) => {
          logUtil("createPost+ ", data)
          this.router.navigateByUrl('').then(r => logUtil("r+ ", r));

        }, error: error => {
          logUtil("createPost- ", error)
        }
      })
  }

  discardPost() {
    this.router.navigateByUrl('').then(r => logUtil("r- ", r));
  }


}
