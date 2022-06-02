import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { CommentPayload } from "../../../utill/classUtill";
import { PostService } from "../../../service/post.service";
import { CommentService } from "../../../service/comment.service";
import { logUtil } from "../../../utill/logUtill";
import { Page, PostResponseDto } from "../../../utill/interfaceUtill";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  name!: string;
  loadingPost: boolean = false
  loadingComment: boolean = false
  posts!: PostResponseDto[];
  postLength!: number;
  pagePost!: Page;

  comments!: CommentPayload[];
  commentLength!: number;

  postsSub!: Subscription
  commentsSub!: Subscription


  constructor(private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private commentService: CommentService) {
    logUtil("UserProfileComponent!")
  }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params["name"];
    this.loadingPost = false
    this.postsSub = this.getPagePost(0);
    this.loadingComment = false
    this.commentsSub = this.commentService.getSliceCommentsByUser(this.name)
      .subscribe({
        next: data => {
          logUtil("getAllCommentsByUser+ ", data)
          this.comments = data.content;
          this.commentLength = data.content.length;
          this.loadingComment = true
        }, error: error => {
          logUtil("getAllCommentsByUser- ", error)

        }
      });
  }

  public getPagePost(number: number) {
    return this.postService.getPagePostByUsername(this.name, number)
      .subscribe({
        next: data => {
          logUtil("getAllPostsByUser+ ", data)
          this.posts = data.content;
          this.postLength = data.totalElements;
          this.pagePost = data
          this.loadingPost = true
        },
        error: error => {
          logUtil("getAllPostsByUser- ", error)
        }
      });
  }

  updatePageData($event: number) {
    this.getPagePost($event);
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe()
    }
    if (this.commentsSub) {
      this.commentsSub.unsubscribe()
    }
  }

  getDateFormat(createdDate: string | undefined): string {
    if (createdDate !== undefined) {
      return new Date(createdDate).toLocaleString();
    }
    return ''
  }
}
