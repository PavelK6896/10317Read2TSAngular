import { Component, OnInit } from '@angular/core';
import { Page, PostResponseDto } from "../../../utill/interfaceUtill";
import { Subscription } from "rxjs";
import { logUtil } from "../../../utill/logUtill";
import { PostService } from "../../../service/post.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-user-view-post',
  templateUrl: './user-view-post.component.html',
  styleUrls: ['./user-view-post.component.css']
})
export class UserViewPostComponent implements OnInit {

  posts: PostResponseDto[] = [];
  postsSubscription!: Subscription
  loadingPost: boolean = false
  name!: string
  postLength!: number
  pagePost!: Page;

  constructor(private postService: PostService,
              private activatedRoute: ActivatedRoute) {
    logUtil("UserViewPostComponent!")
  }

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params["name"];
    this.loadingPost = false
    this.postsSubscription = this.getPagePost(0)
  }


  public getPagePost(number: number) {
    return this.postService.getPagePostByUsername(this.name, number)
      .subscribe({
        next: data => {
          logUtil("getAllPostsBySub+ ", data)
          this.posts = data.content;
          this.postLength = data.totalElements;
          this.loadingPost = true
          this.pagePost = data
        }, error: error => {
          logUtil("getAllPostsBySub- ", error)
        }
      });
  }

  updatePageData($event: number) {
    this.getPagePost($event);
  }

}
