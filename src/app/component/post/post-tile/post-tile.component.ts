import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { logUtil } from "../../../utill/logUtill";
import { PostResponseDto } from "../../../utill/interfaceUtill";

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent {

  @Input() post!: PostResponseDto;

  constructor(private router: Router) {
    logUtil("PostTileComponent!")
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id).then(r => logUtil("r- ", r));
  }
}
