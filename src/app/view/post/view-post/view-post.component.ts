import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommentPayload } from "../../../utill/classUtill";
import { PostService } from "../../../service/post.service";
import { CommentService } from "../../../service/comment.service";
import { logUtil } from "../../../utill/logUtill";
import { PostResponseDto } from "../../../utill/interfaceUtill";
import { AuthService } from "../../../service/auth.service";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewPostComponent implements OnInit {

  loadingPost: boolean = false;
  loadingComment: boolean = false;
  postId: number;
  post!: PostResponseDto;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments!: CommentPayload[];

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private commentService: CommentService,
              private authService: AuthService) {
    logUtil("ViewPostComponent!")
    this.postId = this.activatedRoute.snapshot.params['id'];
    this.commentForm = new FormGroup({
      text: new FormControl('',
        [Validators.required, Validators.minLength(1), Validators.maxLength(250)])
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {

    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login').then(r => logUtil("r- ", r))
      return;
    }

    this.commentPayload.text = this.commentForm.get('text')?.value
    if (this.commentPayload.text == null || this.commentPayload.text.trim().length == 0) {
      return
    }
    this.commentService.postComment(this.commentPayload)
      .subscribe({
        next: data => {
          logUtil("postComment+ ", data)
          this.commentForm.get('text')?.setValue(null);
          this.getCommentsForPost();
        }, error: error => {
          logUtil("postComment- ", error)
        }
      })
  }

  private getPostById() {
    this.loadingPost = false;
    this.postService.getPostById(this.postId)
      .subscribe({
        next: data => {
          logUtil("getPostById+ ", data)
          this.post = data;
          this.loadingPost = true;
        }, error: error => {
          logUtil("getPostById- ", error)
        }
      });
  }

  private getCommentsForPost() {
    this.loadingComment = false
    this.commentService.getAllCommentsForPost(this.postId)
      .subscribe({
        next: data => {
          logUtil("getAllCommentsForPost+ ", data)
          this.comments = data;
          this.loadingComment = true
        }, error: error => {
          logUtil("getAllCommentsForPost- ", error)
        }
      });
  }

  getDateFormat(createdDate: string | undefined): string {
    if (createdDate !== undefined) {
      return new Date(createdDate).toLocaleString();
    }
    return ''
  }
}
