import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { logUtil } from "../../utill/logUtill";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private router: Router) {
    logUtil("SideBarComponent!")
  }

  goToCreatePost() {
    this.router.navigateByUrl('/create-post').then(r => logUtil("r- ", r));
  }

  goToCreateSubRead() {
    this.router.navigateByUrl('/create-subreddit').then(r => logUtil("r- ", r));
  }

}
