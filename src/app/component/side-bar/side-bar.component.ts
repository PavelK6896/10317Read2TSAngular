import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { logUtil } from "../../utill/log1";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) {
    logUtil("SideBarComponent!")
  }

  ngOnInit() {
  }

  goToCreatePost() {
    this.router.navigateByUrl('/create-post');
  }

  goToCreateSubRead() {
    this.router.navigateByUrl('/create-subreddit');
  }

}
