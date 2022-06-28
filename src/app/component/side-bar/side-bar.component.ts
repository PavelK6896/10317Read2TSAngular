import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(private router: Router) {
  }

  goToCreatePost() {
    this.router.navigateByUrl('/create-post')
  }

  goToCreateSubRead() {
    this.router.navigateByUrl('/create-subreddit')
  }

}
