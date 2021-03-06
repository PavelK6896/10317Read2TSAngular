import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
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
  subInput = '';

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
      subReadName: new FormControl('', [Validators.required, this.checkSub()]),
      description: new FormControl(null, Validators.required),
    });

    this.getAllSubReadSub = this.subredditService.getPageSubRead(0)
      .subscribe({
        next: (data) => {
          this.subRead = data.content;
        }, error: error => {
          console.log(error)
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
          this.router.navigateByUrl('');
        }, error: error => {
          console.log(error)
        }
      })
  }

  discardPost() {
    this.router.navigateByUrl('');
  }

  timer!: ReturnType<typeof setTimeout>

  subChange(event: string) {
    this.timer && clearTimeout(this.timer);
    if (this.subRead) {
      let subReadCurrent = this.subRead.filter(f => f.name === event);
      if (subReadCurrent.length === 1) {
        return
      }
    }

    this.timer = setTimeout(() => {
      this.getAllSubReadSub = this.subredditService.getPageSubReadLikeStartsWith(event)
        .subscribe({
          next: (data) => {
            this.subRead = data.content;
          }, error: error => {
            console.log(error)
          }
        });
    }, 500);
  }

  private checkSub(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.subRead) {
        if (this.subRead.length === 0) {
          return {subReadError: 'Sub not choose. Please clear input.'};
        }
        const ok = this.subRead.filter(f => f.name === control.value).length === 1
        return ok ? null : {subReadError: 'Sub not found. Please clear input.'};
      } else {
        return {subReadError: 'Sub not found.'}
      }
    };
  }


}
